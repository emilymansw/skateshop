package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.response.order.CheckoutItemDto;
import com.skateshop.backend.dto.response.order.OrderRecordDTO;
import com.skateshop.backend.dto.response.order.OrderRecordDetailDTO;
import com.skateshop.backend.exception.InsufficientStockException;
import com.skateshop.backend.model.*;
import com.skateshop.backend.model.enumeration.DeliveryStatus;
import com.skateshop.backend.model.enumeration.OrderStatus;
import com.skateshop.backend.model.enumeration.PaymentStatus;
import com.skateshop.backend.model.reporting.DailyRevenueStatistics;
import com.skateshop.backend.model.reporting.HourlyRevenueStatistics;
import com.skateshop.backend.model.reporting.MonthlyRevenueStatistics;
import com.skateshop.backend.model.reporting.TodayOrderHighlight;
import com.skateshop.backend.repository.OrderRecordRepository;
import com.skateshop.backend.repository.ShippingAddressRepository;
import com.skateshop.backend.service.OrderService;
import com.skateshop.backend.service.VariantService;
import com.skateshop.backend.util.CurrentUserUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    VariantService variantService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    OrderRecordRepository orderRecordRepository;
    @Autowired
    ShippingAddressRepository shippingAddressRepository;
    @Autowired
    Environment env;

    @Override
    public OrderRecord getOrder(Long id){
        return orderRecordRepository.getById(id);
    }

    @Override
    public List<MonthlyRevenueStatistics> getMonthlyRevenue(){
        return orderRecordRepository.findMonthlyRevenue();
    }

    @Override
    public List<HourlyRevenueStatistics> getHourlyRevenue(){
        return orderRecordRepository.findHourlyRevenue();
    }

    @Override
    public List<DailyRevenueStatistics> getDailyRevenue(){
        return orderRecordRepository.findDailyRevenue();
    }

    @Override
    public OrderRecord getCustomerOrder(Long id, Customer customer){
        OrderRecord orderRecord = orderRecordRepository.findByIdAndCustomer(id, customer);
        return orderRecord;
    }

    @Override
    public TodayOrderHighlight getTodayHighlight(){
        TodayOrderHighlight todayOrderHighlight = new TodayOrderHighlight();
        todayOrderHighlight.setNumberOfOrder(orderRecordRepository.findTodayOrderQty());
        todayOrderHighlight.setRevenue(orderRecordRepository.findTodayRevenue());
        todayOrderHighlight.setNumberOfOrderChange(orderRecordRepository.findTodayOrderQtyPercentChange());
        todayOrderHighlight.setRevenueChange(orderRecordRepository.findTodayRevenuePercentChange());
        todayOrderHighlight.setNumberOfUnfulfilledOrder(orderRecordRepository.findCountOfUnfulfilledOrder());
        return todayOrderHighlight;
    }

    @Override
    public OrderRecordDetailDTO getOrderDetail(Long id){
       return modelMapper.map(orderRecordRepository.getById(id), OrderRecordDetailDTO.class);
    }

    @Override
    public OrderRecordDetailDTO editOrder(OrderRecordDetailDTO updateOrderInfo, long id){
        Optional<OrderRecord> optionalOrderRecord = orderRecordRepository.findById(id);
        if(optionalOrderRecord.isEmpty()){
            return null;
        }
        OrderRecord orderToUpdate = optionalOrderRecord.get();
        if(updateOrderInfo.getShippingAddress() != null){
            ShippingAddress shippingAddressToUpdate = shippingAddressRepository.findById(updateOrderInfo.getShippingAddress().getId())
                    .orElse(new ShippingAddress());
            shippingAddressToUpdate.setDistrict(updateOrderInfo.getShippingAddress().getDistrict());
            shippingAddressToUpdate.setLine(updateOrderInfo.getShippingAddress().getLine());
            shippingAddressToUpdate.setArea(updateOrderInfo.getShippingAddress().getArea());
            orderToUpdate.setShippingAddress(shippingAddressToUpdate);
        }
        orderToUpdate.setOrderStatus(updateOrderInfo.getOrderStatus());
        orderToUpdate.setDeliveryStatus(updateOrderInfo.getDeliveryStatus());
        orderToUpdate.setPaymentStatus(updateOrderInfo.getPaymentStatus());
        return  modelMapper.map(orderRecordRepository.save(orderToUpdate), OrderRecordDetailDTO.class);
    }

    @Override
    public Page<OrderRecordDTO> getAllOrders(Pageable pageable){
        return orderRecordRepository.findAll(pageable).map(orderRecord -> modelMapper.map(orderRecord, OrderRecordDTO.class));
    }

    private SessionCreateParams.LineItem.PriceData createPriceData(CheckoutItemDto checkoutItemDto) {
        return SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("hkd")
                .setUnitAmount( ((long) checkoutItemDto.getPrice()) * 100)
                .setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(checkoutItemDto.getProductName())
                                .addImage(checkoutItemDto.getProductImage())
                                .setDescription(checkoutItemDto.getVariantOptionValues())
                                .build())
                .build();
    }

    private SessionCreateParams.LineItem createSessionLineItem(CheckoutItemDto checkoutItemDto) {
        return SessionCreateParams.LineItem.builder()
                .setPriceData(createPriceData(checkoutItemDto))
                .setQuantity(Long.parseLong(String.valueOf(checkoutItemDto.getQuantity())))
                .build();
    }

    @Override
    public Session createStripeSession(List<CheckoutItemDto> checkoutItemDtoList, String orderId) throws StripeException {

        String successURL = env.getProperty("FRONTEND_URL") + "/account/order/";
        String failedURL = env.getProperty("FRONTEND_URL") + "/account/order/";

        Stripe.apiKey = env.getProperty("STRIPE_SECRET_KEY");

        List<SessionCreateParams.LineItem> sessionItemsList = new ArrayList<>();
        for (CheckoutItemDto checkoutItemDto : checkoutItemDtoList) {
            sessionItemsList.add(createSessionLineItem(checkoutItemDto));
        }
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setShippingAddressCollection(
                        SessionCreateParams.ShippingAddressCollection.builder()
                                .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.HK)
                                .build())
                .setCancelUrl(failedURL + orderId)
                .addAllLineItem(sessionItemsList)
                .setSuccessUrl(successURL + orderId)
                .setClientReferenceId(orderId)
                .build();

        return Session.create(params);
    }

    @Override
    public List<CheckoutItemDto> checkStock (List<CheckoutItemDto> checkoutItemDtoList) throws InsufficientStockException {
        boolean outOfStock = false;
        List<String> outOfStockMessage = new ArrayList<>();
        for (CheckoutItemDto checkoutItemDto : checkoutItemDtoList) {
            Variant variant = variantService.getVariant(checkoutItemDto.getVariantId());
            if(variant.getStock() < checkoutItemDto.getQuantity()){
                outOfStock = true;
                if(checkoutItemDto.getVariantOptionValues().equals("default")){
                    outOfStockMessage.add(checkoutItemDto.getProductName());
                } else {
                    outOfStockMessage.add(checkoutItemDto.getProductName() + " " + checkoutItemDto.getVariantOptionValues());
                }
            }
        }
        if(outOfStock){
            throw new InsufficientStockException("insufficient stock for " + outOfStockMessage);
        }
        return checkoutItemDtoList;
    }

    @Override
    @Transactional
    public Session createOrder(List<CheckoutItemDto> checkoutItemDtoList, Principal
            principal) throws InsufficientStockException, StripeException {

        checkStock(checkoutItemDtoList);
        OrderRecord order = new OrderRecord();
        order.setOrderStatus(OrderStatus.ACTIVE);
        order.setCreateDateTime(LocalDateTime.now());
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setDeliveryStatus(DeliveryStatus.ONHOLD);
        order.setCustomer((Customer) CurrentUserUtil.getUser(principal));
        List<OrderItem> orderItems = new ArrayList<>();
        float totalAmount = 0;
        for (CheckoutItemDto checkoutItemDto : checkoutItemDtoList) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderRecord(order);
            Variant variant = variantService.getVariant(checkoutItemDto.getVariantId());
            variant.setStock(variant.getStock() - checkoutItemDto.getQuantity());
            variantService.save(variant);
            orderItem.setVariant(variant);
            orderItem.setPrice(variant.getPrice());
            totalAmount += variant.getPrice();
            orderItem.setQuantity(checkoutItemDto.getQuantity());
            orderItems.add(orderItem);
        }
        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);
        OrderRecord orderCreated = orderRecordRepository.save(order);
        return createStripeSession(checkoutItemDtoList, Long.toString(orderCreated.getId()));
    }

    @Override
    public void onCheckOutComplete(String stripePayload, String stripeSigHeader){
        String payload = stripePayload;
        String sigHeader = stripeSigHeader;
        Event event = null;
        try {
            event = Webhook.constructEvent(payload, sigHeader, "whsec_IUP5HwgRYjfXriah64Y0JzYkl91uCtmj");
            // Handle the checkout.session.completed event
            if ("checkout.session.completed".equals(event.getType())) {
                Optional<StripeObject> optionalSession =  event.getDataObjectDeserializer().getObject();
                Session session = (Session) optionalSession.get();
                OrderRecord orderToUpdate = getOrder(Long.parseLong(session.getClientReferenceId()));
                orderToUpdate.setPaymentStatus(PaymentStatus.RECEIVED);
                orderToUpdate.setDeliveryStatus(DeliveryStatus.PREPARING);
                ShippingAddress shippingAddress = new ShippingAddress();
                shippingAddress.setLine(session.getShipping().getAddress().getLine1() + " "
                        + session.getShipping().getAddress().getLine2());
                shippingAddress.setArea(session.getShipping().getAddress().getCity());
                shippingAddress.setDistrict(session.getShipping().getAddress().getState());
                orderToUpdate.setShippingAddress(shippingAddress);
                orderRecordRepository.save(orderToUpdate);
            }
        } catch (Exception e){
            System.out.println(e);
        }
    }


}

package com.skateshop.backend.service;

import com.skateshop.backend.dto.response.order.CheckoutItemDto;
import com.skateshop.backend.dto.response.order.OrderRecordDTO;
import com.skateshop.backend.dto.response.order.OrderRecordDetailDTO;
import com.skateshop.backend.exception.InsufficientStockException;
import com.skateshop.backend.model.*;
import com.skateshop.backend.model.reporting.DailyRevenueStatistics;
import com.skateshop.backend.model.reporting.HourlyRevenueStatistics;
import com.skateshop.backend.model.reporting.MonthlyRevenueStatistics;
import com.skateshop.backend.model.reporting.TodayOrderHighlight;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.security.Principal;
import java.util.List;

public interface OrderService {
    OrderRecord getOrder(Long id);
    List<MonthlyRevenueStatistics> getMonthlyRevenue();
    List<HourlyRevenueStatistics> getHourlyRevenue();
    List<DailyRevenueStatistics> getDailyRevenue();
    OrderRecord getCustomerOrder(Long id, Customer customer);
    TodayOrderHighlight getTodayHighlight();
    OrderRecordDetailDTO getOrderDetail(Long id);
    OrderRecordDetailDTO editOrder(OrderRecordDetailDTO updateOrderInfo, long id);
    Page<OrderRecordDTO> getAllOrders(Pageable pageable);
    Session createStripeSession(List<CheckoutItemDto> checkoutItemDtoList, String orderId) throws StripeException;
    List<CheckoutItemDto> checkStock (List<CheckoutItemDto> checkoutItemDtoList) throws InsufficientStockException, StripeException;
    Session createOrder(List<CheckoutItemDto> checkoutItemDtoList, Principal principal) throws InsufficientStockException, StripeException;
    void onCheckOutComplete(String stripePayload, String stripeSigHeader);

}

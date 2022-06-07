package com.skateshop.backend.controller;

import com.skateshop.backend.config.GlobalExceptionHandler;
import com.skateshop.backend.dto.response.order.CheckoutItemDto;
import com.skateshop.backend.dto.response.order.OrderRecordDetailDTO;
import com.skateshop.backend.exception.InsufficientStockException;
import com.skateshop.backend.service.OrderService;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    private final int SIZE = 8;

    @Autowired
    OrderService orderService;

    @Autowired
    GlobalExceptionHandler globalExceptionHandler;

    @PostMapping("/checkout")
    public ResponseEntity<Object> checkoutList(@RequestBody List<CheckoutItemDto> checkoutItemDtoList, Principal principal)  {
        try {
            Session session = orderService.createOrder(checkoutItemDtoList, principal);
            return new ResponseEntity<>(Map.of("sessionId",session.getId()), HttpStatus.OK);
        }
        catch (Exception e) {
            if(e instanceof InsufficientStockException){
                return globalExceptionHandler.handleBadRequestException(new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage()));
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "");
        }
    }

    @PostMapping("/stripeWebhook")
    public String getPaidOrder(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        orderService.onCheckOutComplete(payload, sigHeader);
        return "";
    }

    @GetMapping("/order/{id}")
    public OrderRecordDetailDTO getOrderDetail(@PathVariable long id) {
        OrderRecordDetailDTO orderRecordDetailDTO = orderService.getOrderDetail(id);
        if(orderRecordDetailDTO != null){
            return orderService.getOrderDetail(id);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }


}

package com.skateshop.backend.dto.response.order;
import com.skateshop.backend.model.enumeration.DeliveryStatus;
import com.skateshop.backend.model.enumeration.OrderStatus;
import com.skateshop.backend.model.enumeration.PaymentStatus;
import lombok.Data;


@Data
public class OrderRecordDTO {
    private long id;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private DeliveryStatus deliveryStatus;
    private float totalAmount;

}

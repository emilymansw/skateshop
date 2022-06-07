package com.skateshop.backend.model;


import com.skateshop.backend.model.enumeration.DeliveryStatus;
import com.skateshop.backend.model.enumeration.OrderStatus;
import com.skateshop.backend.model.enumeration.PaymentStatus;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class OrderRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderRecord")
    private List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shippingAddress_id")
    private ShippingAddress shippingAddress;
    private float totalAmount;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private DeliveryStatus deliveryStatus;

    @CreationTimestamp
    @Column(name = "create_date_time")
    private LocalDateTime createDateTime;

}

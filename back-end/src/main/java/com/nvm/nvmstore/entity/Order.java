package com.nvm.nvmstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    private Long customer_point;

    private BigDecimal grand_total;

    private BigDecimal ship_price;

    private String description;

    @ManyToOne
    @JoinColumn(name = "status_order_id",referencedColumnName = "id")
    private Status_Order status_order_id;

    @ManyToOne
    @JoinColumn(name = "type_order_id",referencedColumnName = "id")
    private Type_Order type_order_id;

    @ManyToOne
    @JoinColumn(name = "type_payment_id",referencedColumnName = "id")
    private Type_Payment type_payment_id;

    @ManyToOne
    @JoinColumn(name = "payment_option_id",referencedColumnName = "id")
    private PaymentOption payment_option_id;

    @ManyToOne
    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    private Customer customer_id;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "staff_id",referencedColumnName = "id")
    private Staff staff_id;

    @ManyToOne
    @JoinColumn(name = "voucher_id",referencedColumnName = "id")
    private Voucher voucher_id;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

}

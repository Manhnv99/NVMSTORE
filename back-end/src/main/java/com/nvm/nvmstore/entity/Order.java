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

    private String address_city;

    private String address_province;

    private String address_ward;

    private String address_detail;

    private String description;

    private String transfer_code;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Status_Order status_order_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private HTTT httt_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Type_Order type_order_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Type_Payment type_payment_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Customer customer_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Staff staff_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Voucher voucher_id;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;
}

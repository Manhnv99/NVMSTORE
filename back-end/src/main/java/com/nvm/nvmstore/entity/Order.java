package com.nvm.nvmstore.entity;

import com.nvm.nvmstore.infrastructure.constant.Order_Payment_Option;
import com.nvm.nvmstore.infrastructure.constant.Order_Payment_Type;
import com.nvm.nvmstore.infrastructure.constant.Order_Status;
import com.nvm.nvmstore.infrastructure.constant.Order_Type;
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

    @Enumerated(EnumType.STRING)
    private Order_Status order_status;

    @Enumerated(EnumType.STRING)
    private Order_Type order_type;

    @Enumerated(EnumType.STRING)
    private Order_Payment_Type order_payment_type;

    @Enumerated(EnumType.STRING)
    private Order_Payment_Option order_payment_option;

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

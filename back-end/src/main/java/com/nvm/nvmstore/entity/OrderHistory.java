package com.nvm.nvmstore.entity;

import com.nvm.nvmstore.infrastructure.constant.Order_Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Order order_id;

    private Order_Status order_status;

    @ManyToOne
    @JoinColumn(name = "staff_id",referencedColumnName = "id")
    private Staff staff_id;

    private String description;
}

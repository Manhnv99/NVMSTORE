package com.nvm.nvmstore.entity;

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
    @JoinColumn(referencedColumnName = "id")
    private Order order_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Status_Order status_order_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Staff staff_id;

    private String description;
}

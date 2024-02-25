package com.nvm.nvmstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    private String name;

    private Boolean gender;

    private LocalDate birthday;

    @Column(length = 10)
    private String phone;

    private String email;

    @Column(length = 12)
    private String cccd;

    @ManyToOne
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role_id;

    private Boolean status;

    private String password;

    @Column(length = 2000)
    private String image_id;

    @Column(length = 2000)
    private String image_url;

    private String address_province;

    private String address_district;

    private String address_ward;

    private String address_detail;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;
}

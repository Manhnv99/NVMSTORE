package com.nvm.nvmstore.request.customer.customeraddress;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PutCustomerAddressRequest{

    private Long id;

    private Long customer_id;

    @NotBlank(message = "Bạn Chưa Điền Tên Người Nhận!")
    @Length(min = 5,message = "Độ Dài Tên Tối Thiểu Là 5!")
    private String name;

    @NotBlank(message = "Bạn Chưa Điền Số Điện Thoại Người Nhận!")
    @Pattern(regexp = "^0\\d{9}$", message = "Sai Định Dạng Số Điện Thoại!")
    private String phone;

    @NotBlank(message = "Bạn Chưa Chọn Tỉnh Thành Phố!")
    private String address_province_code;

    @NotBlank(message = "Bạn Chưa Chọn Quận Huyện!")
    private String address_district_code;

    @NotBlank(message = "Bạn Chưa Chọn Xã Phường!")
    private String address_ward_code;

    @NotBlank(message = "Bạn Chưa Điền Số nhà/Ngõ/Đường!")
    private String address_detail;
}

package com.nvm.nvmstore.core.customer.model.request;


import com.nvm.nvmstore.infrastructure.constant.Customer_Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class PostCustomerRequest {

    @NotEmpty(message = "Bạn Chưa Điền Họ Và Tên!")
    @Length(min = 5 , message = "Độ Dài Tên Tối Thiểu Là 5!")
    private String name;

    @NotBlank(message = "Bạn Chưa Điền Số Điện Thoại!!")
    @Pattern(regexp = "^0\\d{9}$", message = "Sai Định Dạng Số Điện Thoại!")
    private String phone;

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email Không Đúng Định Dạng!")
    @NotEmpty(message = "Bạn Chưa Điền Email!")
    private String email;

    @NotNull(message = "Bạn Chưa Chọn Trạng Thái!")
    private Customer_Status status;
}

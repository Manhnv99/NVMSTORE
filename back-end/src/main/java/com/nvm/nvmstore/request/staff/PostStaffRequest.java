package com.nvm.nvmstore.request.staff;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostStaffRequest {

    @NotEmpty(message = "Bạn Chưa Điền Tên Nhân Viên!")
    private String name;

    @NotEmpty(message = "Bạn Chưa Chọn Giới Tính!")
    private String gender;

    @NotNull(message = "Bạn Chưa Chọn Ngày Sinh!")
    private LocalDate birthday;

    @NotBlank(message = "Bạn Chưa Điền Số Điện Thoại!!")
    @Pattern(regexp = "^0\\d{9}$", message = "Sai Định Dạng Số Điện Thoại!")
    private String phone;

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email Không Đúng Định Dạng!")
    @NotEmpty(message = "Bạn Chưa Điền Email!")
    private String email;

    @NotBlank(message = "Bạn Chưa Điền CCCD!")
    @Pattern(regexp = "^0\\d{11}$", message = "Sai Định Dạng Căn Cước Công Dân!")
    private String cccd;

    @NotEmpty(message = "Bạn Chưa Chọn Trạng Thái!")
    private String status;

    @NotBlank(message = "Bạn Chưa Chọn Tỉnh Thành Phố!")
    private String address_province;

    @NotBlank(message = "Bạn Chưa Chọn Quận Huyện!")
    private String address_district;

    @NotBlank(message = "Bạn Chưa Chọn Xã Phường!")
    private String address_ward;

    @NotBlank(message = "Bạn Chưa Điền Số nhà/Ngõ/Đường!")
    private String address_detail;

    private MultipartFile image;
}

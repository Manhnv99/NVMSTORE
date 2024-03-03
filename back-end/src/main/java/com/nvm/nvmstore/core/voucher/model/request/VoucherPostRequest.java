package com.nvm.nvmstore.core.voucher.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherPostRequest {

    @NotBlank(message = "Bạn Chưa Điền Tên Phiếu Giảm Giá!")
    private String name;

    @NotNull(message = "Bạn Chưa Điền Giá Trị Giảm!")
    @Min(value = 1000,message = "Giá Trị Phải Lớn Hơn 1,000!")
    private BigDecimal value;

    @NotNull(message = "Bạn Chưa Điền Đơn Tối Thiểu!")
    @Min(value = 1000,message = "Đơn Tối Thiểu Phải Lớn Hơn 1,000!")
    private BigDecimal minimum_order;

    @NotNull(message = "Bạn Chưa Điền Số Lượng!")
    @Min(value = 1,message = "Số Lượng Phải Lớn Hơn 1!")
    private Integer quantity;

    @NotNull(message = "Bạn Chưa Chọn Ngày Bắt Đầu!")
    private LocalDate date_start;

    @NotNull(message = "Bạn Chưa Chọn Ngày Kết Thúc!!")
    private LocalDate date_end;
}

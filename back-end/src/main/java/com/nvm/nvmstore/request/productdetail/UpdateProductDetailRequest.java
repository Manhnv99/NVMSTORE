package com.nvm.nvmstore.request.productdetail;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UpdateProductDetailRequest {

    private Long product_detail_id;

    @NotEmpty(message = "Bạn Chưa Điền Mô Tả!")
    @Size(min = 10 , max = 100 , message = "Độ Dài Phải Nằm Trong Khoảng 10 -> 100 Ký Tự!")
    private String description;

    @NotNull(message = "Bạn Chưa Điền Số Lượng!")
    @Min(value = 1 ,message = "Số Lượng Tối Thiểu Là 1!")
    @Max(value = 10000000, message = "Số Lượng Tối Đa Là 10,000,000!")
    private Integer quantity;

    @NotNull(message = "Bạn Chưa Điền Giá Bán!")
    @Min(value = 1 ,message = "Giá Bán Tối Thiểu Là 1!")
    @Max(value = 1000000000, message = "Giá Bán Tối Đa Là 1,000,000,000!")
    private BigDecimal sell_price;

    @NotNull(message = "Bạn Chưa Chọn Thương Hiệu!")
    private Long brand_id;

    @NotNull(message = "Bạn Chưa Chọn Chất Liệu!")
    private Long material_id;

    @NotNull(message = "Bạn Chưa Chọn Giới Tính!")
    private Long gender_id;

    @NotNull(message = "Bạn Chưa Chọn Màu Sắc!")
    private Long color_id;

    @NotNull(message = "Bạn Chưa Chọn Trạng Thái!")
    private Long status_id;

    @NotNull(message = "Bạn Chưa Chọn Đế Giày!")
    private Long sole_id;

    @NotNull(message = "Bạn Chưa Chọn Thể Loại!")
    private Long category_id;

    @NotNull(message = "Bạn Chưa Chọn Kích Cỡ!")
    private Long size_id;

}

package com.nvm.nvmstore.core.product.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PostProductRequest {
    //sẽ lấy hết tất cả các trường nhưng chỉ để validate, và một số trương trong bảng product là dùng để thêm.
    @NotEmpty(message = "Bạn Chưa Điền Tên Sản Phẩm!")
    @Length(min = 5,message = "Độ Dài Tên Sản Phẩm Tối Thiểu Là 5!")
    private String name;

    @NotEmpty(message = "Bạn Chưa Điền Mô Tả!")
    @Length(min = 5,message = "Độ Dài Mô Tả Tối Thiểu Là 5!")
    private String description;

    @NotNull(message = "Bạn Chưa Chọn Thương Hiệu!")
    private Long brand_id;

    @NotNull(message = "Bạn Chưa Chọn Chất Liệu!")
    private Long material_id;

    @NotNull(message = "Bạn Chưa Chọn Giới Tính!")
    private Long gender_id;

    @NotNull(message = "Bạn Chưa Chọn Trạng Thái!")
    private Long status_id;

    @NotNull(message = "Bạn Chưa Chọn Đế Giày!")
    private Long sole_id;

    @NotNull(message = "Bạn Chưa Chọn Thể Loại!")
    private Long category_id;
}

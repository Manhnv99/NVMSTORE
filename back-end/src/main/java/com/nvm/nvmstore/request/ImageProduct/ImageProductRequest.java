package com.nvm.nvmstore.request.ImageProduct;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ImageProductRequest {
    private Long product_detail_id;
    private MultipartFile image;
}

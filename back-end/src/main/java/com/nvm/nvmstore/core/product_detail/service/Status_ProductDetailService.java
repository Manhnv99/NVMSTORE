package com.nvm.nvmstore.core.product_detail.service;


import com.nvm.nvmstore.core.product_detail.model.request.Status_ProductDetailRequest;
import com.nvm.nvmstore.core.product_detail.model.response.Status_ProductDetailResponse;

import java.util.List;

public interface Status_ProductDetailService {

    List<Status_ProductDetailResponse> getALl();

    void addStatus_ProductDetail(Status_ProductDetailRequest statusProductDetailRequest);
}

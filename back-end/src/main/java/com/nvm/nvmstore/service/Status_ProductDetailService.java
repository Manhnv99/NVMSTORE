package com.nvm.nvmstore.service;


import com.nvm.nvmstore.request.status_productdetail.Status_ProductDetailRequest;
import com.nvm.nvmstore.response.status_productdetail.Status_ProductDetailResponse;

import java.util.List;

public interface Status_ProductDetailService {

    List<Status_ProductDetailResponse> getALl();

    void addStatus_ProductDetail(Status_ProductDetailRequest statusProductDetailRequest);
}

package com.nvm.nvmstore.core.location.service;


import com.nvm.nvmstore.core.location.model.response.DistrictsResponse;

import java.util.List;

public interface DistrictsService {
    List<DistrictsResponse> getAllByProvincesCode(String province_code);
}

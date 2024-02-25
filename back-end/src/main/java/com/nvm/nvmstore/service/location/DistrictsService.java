package com.nvm.nvmstore.service.location;


import com.nvm.nvmstore.response.location.DistrictsResponse;

import java.util.List;

public interface DistrictsService {
    List<DistrictsResponse> getAllByProvincesCode(String province_code);
}

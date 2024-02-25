package com.nvm.nvmstore.service.location;

import com.nvm.nvmstore.response.location.WardsResponse;

import java.util.List;

public interface WardsService {

    List<WardsResponse> getAllByDistrictsCode(String district_code);
}

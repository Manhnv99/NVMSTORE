package com.nvm.nvmstore.core.location.service;

import com.nvm.nvmstore.core.location.model.response.WardsResponse;

import java.util.List;

public interface WardsService {

    List<WardsResponse> getAllByDistrictsCode(String district_code);
}

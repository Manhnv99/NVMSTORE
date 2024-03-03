package com.nvm.nvmstore.core.size.service;

import com.nvm.nvmstore.core.size.model.request.SizeRequest;
import com.nvm.nvmstore.core.size.model.response.SizeResponse;

import java.util.List;

public interface SizeService {
    List<SizeResponse> getALl();

    void addSize(SizeRequest sizeRequest);
}

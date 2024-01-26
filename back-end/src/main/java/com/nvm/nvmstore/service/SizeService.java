package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.color.ColorRequest;
import com.nvm.nvmstore.request.size.SizeRequest;
import com.nvm.nvmstore.response.color.ColorResponse;
import com.nvm.nvmstore.response.size.SizeResponse;

import java.util.List;

public interface SizeService {
    List<SizeResponse> getALl();

    void addSize(SizeRequest sizeRequest);
}

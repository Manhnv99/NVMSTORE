package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.color.ColorRequest;
import com.nvm.nvmstore.response.color.ColorResponse;

import java.util.List;

public interface ColorService {
    List<ColorResponse> getALl();

    void addColor(ColorRequest colorRequest);
}

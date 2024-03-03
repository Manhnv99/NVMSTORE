package com.nvm.nvmstore.core.color.service;

import com.nvm.nvmstore.core.color.model.request.ColorRequest;
import com.nvm.nvmstore.core.color.model.response.ColorResponse;

import java.util.List;

public interface ColorService {
    List<ColorResponse> getALl();

    void addColor(ColorRequest colorRequest);
}

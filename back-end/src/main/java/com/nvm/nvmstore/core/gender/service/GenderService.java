package com.nvm.nvmstore.core.gender.service;

import com.nvm.nvmstore.core.gender.model.request.GenderRequest;
import com.nvm.nvmstore.core.gender.model.response.GenderResponse;

import java.util.List;

public interface GenderService {

    List<GenderResponse> getALl();

    void addGender(GenderRequest genderRequest);

}

package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.gender.GenderRequest;
import com.nvm.nvmstore.response.gender.GenderResponse;

import java.util.List;

public interface GenderService {

    List<GenderResponse> getALl();

    void addGender(GenderRequest genderRequest);

}

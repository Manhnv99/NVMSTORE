package com.nvm.nvmstore.core.location.service.serviceImpl;

import com.nvm.nvmstore.core.location.repository.DBProvincesRepository;
import com.nvm.nvmstore.repository.location.ProvincesRepository;
import com.nvm.nvmstore.core.location.model.response.ProvicesResponse;
import com.nvm.nvmstore.core.location.service.ProvincesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvicesServiceImpl implements ProvincesService {

    @Autowired
    private DBProvincesRepository provincesRepository;


    @Override
    public List<ProvicesResponse> getAllProvinces() {
        return provincesRepository.getAllProvinces();
    }

}

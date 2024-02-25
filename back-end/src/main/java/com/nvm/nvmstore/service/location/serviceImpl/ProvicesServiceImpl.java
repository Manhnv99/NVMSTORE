package com.nvm.nvmstore.service.location.serviceImpl;

import com.nvm.nvmstore.repository.location.ProvincesRepository;
import com.nvm.nvmstore.response.location.ProvicesResponse;
import com.nvm.nvmstore.service.location.ProvincesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvicesServiceImpl implements ProvincesService {

    @Autowired
    private ProvincesRepository provincesRepository;


    @Override
    public List<ProvicesResponse> getAllProvinces() {
        return provincesRepository.getAllProvinces();
    }

}

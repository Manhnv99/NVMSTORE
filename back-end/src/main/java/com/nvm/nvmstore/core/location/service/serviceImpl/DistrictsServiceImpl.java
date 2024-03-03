package com.nvm.nvmstore.core.location.service.serviceImpl;

import com.nvm.nvmstore.core.location.repository.DBDistrictsRepository;
import com.nvm.nvmstore.repository.location.DistrictsRepository;
import com.nvm.nvmstore.core.location.model.response.DistrictsResponse;
import com.nvm.nvmstore.core.location.service.DistrictsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictsServiceImpl implements DistrictsService {

    @Autowired
    private DBDistrictsRepository districtsRepository;

    @Override
    public List<DistrictsResponse> getAllByProvincesCode(String province_code) {
        return districtsRepository.getAllByProvincesCode(province_code);
    }
}

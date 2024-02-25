package com.nvm.nvmstore.service.location.serviceImpl;

import com.nvm.nvmstore.repository.location.DistrictsRepository;
import com.nvm.nvmstore.response.location.DistrictsResponse;
import com.nvm.nvmstore.service.location.DistrictsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictsServiceImpl implements DistrictsService {

    @Autowired
    private DistrictsRepository districtsRepository;

    @Override
    public List<DistrictsResponse> getAllByProvincesCode(String province_code) {
        return districtsRepository.getAllByProvincesCode(province_code);
    }
}

package com.nvm.nvmstore.service.location.serviceImpl;

import com.nvm.nvmstore.repository.location.WardsRepository;
import com.nvm.nvmstore.response.location.WardsResponse;
import com.nvm.nvmstore.service.location.WardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardsServiceImpl implements WardsService {

    @Autowired
    private WardsRepository wardsRepository;

    @Override
    public List<WardsResponse> getAllByDistrictsCode(String district_code) {
        return wardsRepository.getAllByDistrictsCode(district_code);
    }
}

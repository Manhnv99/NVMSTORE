package com.nvm.nvmstore.core.location.service.serviceImpl;

import com.nvm.nvmstore.core.location.repository.DBWardsRepository;
import com.nvm.nvmstore.repository.location.WardsRepository;
import com.nvm.nvmstore.core.location.model.response.WardsResponse;
import com.nvm.nvmstore.core.location.service.WardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardsServiceImpl implements WardsService {

    @Autowired
    private DBWardsRepository wardsRepository;

    @Override
    public List<WardsResponse> getAllByDistrictsCode(String district_code) {
        return wardsRepository.getAllByDistrictsCode(district_code);
    }
}

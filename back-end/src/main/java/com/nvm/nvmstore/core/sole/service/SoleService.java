package com.nvm.nvmstore.core.sole.service;


import com.nvm.nvmstore.entity.Sole;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.sole.model.request.SoleRequest;
import com.nvm.nvmstore.core.sole.model.response.SoleResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SoleService {

    List<SoleResponse> getAllPaging(Pageable pageable);

    List<SoleResponse> getAll();

    List<SoleResponse> searchSole(String input, Entity_Status status, Pageable pageable);

    Double getTotalPageSearch(String input, Entity_Status status);

    Double getAllTotalPage();

    String addSole(SoleRequest soleRequest);

    void updateSole(Long id,SoleRequest soleRequest);

    Sole getById(Long id);
}

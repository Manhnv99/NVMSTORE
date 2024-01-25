package com.nvm.nvmstore.service;


import com.nvm.nvmstore.entity.Sole;
import com.nvm.nvmstore.request.sole.SoleRequest;
import com.nvm.nvmstore.response.sole.SoleResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SoleService {

    List<SoleResponse> getAllPaging(Pageable pageable);

    List<SoleResponse> getAll();

    List<SoleResponse> searchSole(String input,Boolean status, Pageable pageable);

    Double getTotalPageSearch(String input,Boolean status);

    Double getAllTotalPage();

    String addSole(SoleRequest soleRequest);

    void updateSole(Long id,SoleRequest soleRequest);

    Sole getById(Long id);
}

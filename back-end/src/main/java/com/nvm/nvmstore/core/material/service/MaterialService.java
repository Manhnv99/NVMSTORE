package com.nvm.nvmstore.core.material.service;

import com.nvm.nvmstore.entity.Material;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.material.model.request.MaterialRequest;
import com.nvm.nvmstore.core.material.model.response.MaterialResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MaterialService {
    List<MaterialResponse> getAllPaging(Pageable pageable);

    List<MaterialResponse> getAll();

    List<MaterialResponse> searchMaterial(String input, Entity_Status status, Pageable pageable);

    Double getTotalPageSearch(String input, Entity_Status status);

    Double getAllTotalPage();

    String addMaterial(MaterialRequest materialRequest);

    void updateMaterial(Long id,MaterialRequest materialRequest);

    Material getById(Long id);
}

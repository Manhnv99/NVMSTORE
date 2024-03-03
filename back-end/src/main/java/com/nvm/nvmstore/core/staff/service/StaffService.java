package com.nvm.nvmstore.core.staff.service;

import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.infrastructure.constant.Staff_Status;
import com.nvm.nvmstore.core.staff.model.request.PostStaffRequest;
import com.nvm.nvmstore.core.staff.model.request.PutStaffRequest;
import com.nvm.nvmstore.core.staff.model.response.StaffResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface StaffService {

    List<StaffResponse> getAll(Pageable pageable);

    Staff getStaffById(Long id);

    ResponseEntity<?> postStaff(PostStaffRequest postStaffRequest) throws IOException;

    ResponseEntity<?> putStaff(Long id, PutStaffRequest putStaffRequest) throws IOException;

    Double getTotalPageStaff();

    List<StaffResponse> searchStaff(String input, Staff_Status status, Pageable pageable);

    Double getTotalPageSearch(String input,Staff_Status status);

    String generateRandomPassword(int length);

}

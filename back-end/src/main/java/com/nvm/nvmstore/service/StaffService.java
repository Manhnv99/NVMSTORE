package com.nvm.nvmstore.service;

import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.request.staff.StaffRequest;
import com.nvm.nvmstore.response.staff.StaffResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface StaffService {

    List<StaffResponse> getAll(Pageable pageable);

    Staff getStaffById(Long id);

    ResponseEntity<?> addStaff(StaffRequest staffRequest) throws IOException;

    ResponseEntity<?> updateStaff(Long id, StaffRequest staffRequest) throws IOException;

    Double getTotalPageStaff();

    List<StaffResponse> searchStaff(String input,Boolean status,Pageable pageable);

    Double getTotalPageSearch(String input,Boolean status);

    String generateRandomPassword(int length);

}

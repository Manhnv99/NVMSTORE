package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.StaffRequest.StaffRequest;
import com.nvm.nvmstore.response.staff.StaffResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface StaffService {

    List<StaffResponse> getAll();

    ResponseEntity<?> addStaff(StaffRequest staffRequest) throws IOException;
}

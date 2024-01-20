package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.repository.RoleRepository;
import com.nvm.nvmstore.repository.StaffRepository;
import com.nvm.nvmstore.request.StaffRequest.StaffRequest;
import com.nvm.nvmstore.response.staff.StaffResponse;
import com.nvm.nvmstore.service.CloudinaryService;
import com.nvm.nvmstore.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CloudinaryService cloudinaryService;



    @Override
    public List<StaffResponse> getAll() {
        return staffRepository.getAll();
    }

    @Override
    public ResponseEntity<?> addStaff(StaffRequest staffRequest) throws IOException {
        Map result=cloudinaryService.upload(staffRequest.getImage());//upload image to cloudinary
        Staff staffAdd=new Staff();
        if(staffRepository.getNewest()==null){
            staffAdd.setCode("STAFF1");
        }else{
            String code=staffRepository.getNewest().getCode();//getNewStaff to get Code
            staffAdd.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
        }
        staffAdd.setName(staffRequest.getName());
        staffAdd.setGender(staffRequest.getGender());
        staffAdd.setBirthday(staffRequest.getBirthday());
        staffAdd.setPhone(staffRequest.getPhone());
        staffAdd.setEmail(staffRequest.getEmail());
        staffAdd.setCccd(staffRequest.getCccd());
        staffAdd.setRole_id(roleRepository.getReferenceById(Long.parseLong("1")));
        staffAdd.setStatus(staffRequest.getStatus());
        staffAdd.setPassword("123");
        staffAdd.setAddress_city(staffRequest.getAddress_city());
        staffAdd.setAddress_province(staffRequest.getAddress_province());
        staffAdd.setAddress_ward(staffRequest.getAddress_ward());
        staffAdd.setAddress_detail(staffRequest.getAddress_detail());
        staffAdd.setCreated_at(new Date());
        staffAdd.setUpdated_at(new Date());
        staffAdd.setImage_id((String) result.get("public_id"));
        staffAdd.setImage_url((String) result.get("url"));
        staffRepository.save(staffAdd);
        return ResponseEntity.status(HttpStatus.CREATED).body("Create Success!");
    }
}

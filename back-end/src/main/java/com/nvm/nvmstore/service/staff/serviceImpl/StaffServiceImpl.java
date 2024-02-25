package com.nvm.nvmstore.service.staff.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.repository.location.DistrictsRepository;
import com.nvm.nvmstore.repository.location.ProvincesRepository;
import com.nvm.nvmstore.repository.location.WardsRepository;
import com.nvm.nvmstore.repository.role.RoleRepository;
import com.nvm.nvmstore.repository.staff.StaffRepository;
import com.nvm.nvmstore.request.staff.PostStaffRequest;
import com.nvm.nvmstore.request.staff.PutStaffRequest;
import com.nvm.nvmstore.response.staff.StaffResponse;
import com.nvm.nvmstore.service.cloudinary.CloudinaryService;
import com.nvm.nvmstore.service.email.EmailService;
import com.nvm.nvmstore.service.staff.StaffService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ProvincesRepository provincesRepository;

    @Autowired
    private DistrictsRepository districtsRepository;

    @Autowired
    private WardsRepository wardsRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private EmailService emailService;



    @Override
    public List<StaffResponse> getAll(Pageable pageable) {
        return staffRepository.getAll(pageable);

    }

    @Override
    public Staff getStaffById(Long id) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Staff> staffOptional=staffRepository.findById(id);
        if(staffOptional.isPresent()){
            staffOptional.get().setAddress_province(provincesRepository.getCodeByFullName(staffOptional.get().getAddress_province()));
            staffOptional.get().setAddress_district(districtsRepository.getCodeByFullName(staffOptional.get().getAddress_district()));
            staffOptional.get().setAddress_ward(wardsRepository.getCodeByFullName(staffOptional.get().getAddress_ward()));
            return staffOptional.get();
        }else{
            keyvalue.put("error","Không tìm thấy nhân viên này!");
            throw new ExceptionMessage(keyvalue);
        }
    }

    @Override
    public ResponseEntity<?> postStaff(PostStaffRequest postStaffRequest) throws IOException {
        String password=generateRandomPassword(10);
        Map<String,String> listError=new HashMap<>();
        if(staffRepository.getByCCCD(postStaffRequest.getCccd())!=null){
            listError.put("cccd","CCCD này đã tồn tại!");
        }
        if(staffRepository.getByEmail(postStaffRequest.getEmail())!=null){
            listError.put("email","Email này đã tồn tại!");
        }
        if(staffRepository.getByPhone(postStaffRequest.getPhone())!=null){
            listError.put("phone","Số điện thoại này đã tồn tại!");
        }
        String nameImage= postStaffRequest.getImage().getOriginalFilename();
        if(nameImage.equalsIgnoreCase("empty-file")){
            listError.put("image","Bạn Chưa Chọn Ảnh!");
        }
        if(!listError.isEmpty()){
            throw new ExceptionMessage(listError);
        }

        Map result=cloudinaryService.upload(postStaffRequest.getImage());//upload image to cloudinary
        Staff staffAdd=new Staff();
        if(staffRepository.getNewest()==null){
            staffAdd.setCode("STAFF1");
        }else{
            String code=staffRepository.getNewest().getCode();//getNewStaff to get Code
            staffAdd.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
        }
        staffAdd.setName(postStaffRequest.getName());
        switch (postStaffRequest.getGender()){
            case "true":
                staffAdd.setGender(true);
                break;
            case "false":
                staffAdd.setGender(false);
                break;
            default:
                staffAdd.setGender(true);
        }
        staffAdd.setBirthday(postStaffRequest.getBirthday());
        staffAdd.setPhone(postStaffRequest.getPhone());
        staffAdd.setEmail(postStaffRequest.getEmail());
        staffAdd.setCccd(postStaffRequest.getCccd());
        staffAdd.setRole_id(roleRepository.getReferenceById(Long.parseLong("1")));
        switch (postStaffRequest.getStatus()){
            case "true":
                staffAdd.setStatus(true);
                break;
            case "false":
                staffAdd.setStatus(false);
                break;
            default:
                staffAdd.setStatus(true);
        }
        staffAdd.setPassword(password);
        staffAdd.setAddress_province(provincesRepository.getFullNameByCode(postStaffRequest.getAddress_province()));
        staffAdd.setAddress_district(districtsRepository.getFullNameByCode(postStaffRequest.getAddress_district()));
        staffAdd.setAddress_ward(wardsRepository.getFullNameByCode(postStaffRequest.getAddress_ward()));
        staffAdd.setAddress_detail(postStaffRequest.getAddress_detail());
        staffAdd.setCreated_at(new Date());
        staffAdd.setUpdated_at(new Date());
        staffAdd.setImage_id((String) result.get("public_id"));
        staffAdd.setImage_url((String) result.get("url"));
        staffRepository.save(staffAdd);
        emailService.sendEmail("nguyenvimanhnqt@gmail.com","Password","Mật khẩu để đăng nhập vào hệ thống bán giày NVMSTORE là:"+password);
        return ResponseEntity.status(HttpStatus.CREATED).body("Thêm Nhân Viên Thành Công!");
    }

    @Override
    public ResponseEntity<?> putStaff(Long id, PutStaffRequest putStaffRequest) throws IOException {
        Map<String,String> listError=new HashMap<>();
        Optional<Staff> staffOptional=staffRepository.findById(id);
        if(staffOptional.isPresent()){
            if(!putStaffRequest.getCccd().equalsIgnoreCase(staffOptional.get().getCccd())){
                listError.put("cccd","CCCD này đã tồn tại!");
            }
            if(!putStaffRequest.getEmail().equalsIgnoreCase(staffOptional.get().getEmail())){
                listError.put("email","Email này đã tồn tại!");
            }
            if(!putStaffRequest.getPhone().equalsIgnoreCase(staffOptional.get().getPhone())){
                listError.put("phone","Số điện thoại này đã tồn tại!");
            }
        }
        if(!listError.isEmpty()){
            throw new ExceptionMessage(listError);
        }

        staffOptional.get().setName(putStaffRequest.getName());
        switch (putStaffRequest.getGender()){
            case "true":
                staffOptional.get().setGender(true);
                break;
            case "false":
                staffOptional.get().setGender(false);
                break;
            default:
                staffOptional.get().setGender(true);
        }
        staffOptional.get().setBirthday(putStaffRequest.getBirthday());
        staffOptional.get().setPhone(putStaffRequest.getPhone());
        staffOptional.get().setEmail(putStaffRequest.getEmail());
        staffOptional.get().setCccd(putStaffRequest.getCccd());
        switch (putStaffRequest.getStatus()){
            case "true":
                staffOptional.get().setStatus(true);
                break;
            case "false":
                staffOptional.get().setStatus(false);
                break;
            default:
                staffOptional.get().setStatus(true);
        }

        String nameImage= putStaffRequest.getImage().getOriginalFilename();
        if(!nameImage.equalsIgnoreCase("empty-file")){
            cloudinaryService.delete(staffOptional.get().getImage_id());//xóa ảnh cũ
            Map result=cloudinaryService.upload(putStaffRequest.getImage());//upload image to cloudinary
            staffOptional.get().setImage_id((String) result.get("public_id"));
            staffOptional.get().setImage_url((String) result.get("url"));
        }
        staffOptional.get().setAddress_province(provincesRepository.getFullNameByCode(putStaffRequest.getAddress_province()));
        staffOptional.get().setAddress_district(districtsRepository.getFullNameByCode(putStaffRequest.getAddress_district()));
        staffOptional.get().setAddress_ward(wardsRepository.getFullNameByCode(putStaffRequest.getAddress_ward()));
        staffOptional.get().setAddress_detail(putStaffRequest.getAddress_detail());
        staffOptional.get().setUpdated_at(new Date());
        staffRepository.save(staffOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("update successfully");
    }

    @Override
    public Double getTotalPageStaff() {
        return Math.ceil(staffRepository.getTotalPageStaff()/3.0);
    }

    @Override
    public List<StaffResponse> searchStaff(String input, Boolean status, Pageable pageable) {
        return staffRepository.searchStaff(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Boolean status) {
        return Math.ceil(staffRepository.getTotalPageSearch(input,status).size()/3.0);
    }

    @Override
    public String generateRandomPassword(int length) {
        return RandomStringUtils.randomAlphanumeric(length);
    }
}

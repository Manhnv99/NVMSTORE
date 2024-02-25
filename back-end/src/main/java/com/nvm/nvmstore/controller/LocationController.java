package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.service.location.DistrictsService;
import com.nvm.nvmstore.service.location.ProvincesService;
import com.nvm.nvmstore.service.location.WardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    private ProvincesService provincesService;

    @Autowired
    private DistrictsService districtsService;

    @Autowired
    private WardsService wardsService;

    @GetMapping("/get-all-provinces")
    public ResponseEntity<?> getAllProvinces(){
        return ResponseEntity.status(HttpStatus.OK).body(provincesService.getAllProvinces());
    }

    @GetMapping("/get-all-districts-by-province-code")
    public ResponseEntity<?> getAllDistrictsByProvinceCode(@RequestParam(name = "province_code") String province_code){
        return ResponseEntity.status(HttpStatus.OK).body(districtsService.getAllByProvincesCode(province_code));
    }

    @GetMapping("/get-all-wards-by-district-code")
    public ResponseEntity<?> getAllWardsByDistrictCode(@RequestParam(name = "district_code") String district_code){
        return ResponseEntity.status(HttpStatus.OK).body(wardsService.getAllByDistrictsCode(district_code));
    }

}

package com.nvm.nvmstore.core.voucher.controller;

import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPostRequest;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPutRequest;
import com.nvm.nvmstore.core.voucher.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@CrossOrigin
@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    private static final int LIMIT=3;

    @Autowired
    private VoucherService voucherService;

    //Post Voucher
    @PostMapping("/post-voucher")
    public ResponseEntity<?> PostVoucher(@RequestBody @Valid VoucherPostRequest voucherPostRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(voucherService.PostVoucher(voucherPostRequest));
    }

    //Put Voucher
    @PutMapping("/put-voucher")
    public ResponseEntity<?> PutVoucher(@RequestBody @Valid VoucherPutRequest voucherPutRequest){
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.PutVoucher(voucherPutRequest));
    }

    //GetAllVoucherPaging
    @GetMapping("/get-all-voucher_paging")
    public ResponseEntity<?> GetAllVoucherPaging(@RequestParam(name = "page") Integer page){
        int index=(page-1)*LIMIT;
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.getAllVoucherPaging(LIMIT,index));
    }

    //GetToTalPageVoucher
    @GetMapping("/get-total-page")
    public ResponseEntity<?> GetToTalPageVoucher(){
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.getToTalPageVoucher(LIMIT));
    }

    //SearchVoucherPaging
    @GetMapping("/search-voucher_paging")
    public ResponseEntity<?> SearchVouCherPaging(@RequestParam(name = "page") Integer page,
                                                 @RequestParam(name = "code",required = false) String code,
                                                 @RequestParam(name = "quantity",required = false) Integer quantity,
                                                 @RequestParam(name = "value",required = false) BigDecimal value,
                                                 @RequestParam(name = "status",required = false) Voucher_Status status,
                                                 @RequestParam(name = "date_start",required = false) String date_start,
                                                 @RequestParam(name = "date_end",required = false) String date_end){
        int index=(page-1)*LIMIT;
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.searchVoucherPaging(code,quantity,value,status,
                                                                                            date_start,date_end,LIMIT,index));
    }

    @GetMapping("/get-total-page-search")
    public ResponseEntity<?> GetToTalPageSearchVoucher(@RequestParam(name = "code",required = false) String code,
                                                       @RequestParam(name = "quantity",required = false) Integer quantity,
                                                       @RequestParam(name = "value",required = false) BigDecimal value,
                                                       @RequestParam(name = "status",required = false) Voucher_Status status,
                                                       @RequestParam(name = "date_start",required = false) String date_start,
                                                       @RequestParam(name = "date_end",required = false) String date_end){
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.getToTalPageSearchVoucher(code,quantity,value,status,date_start,date_end,LIMIT));
    }

    @GetMapping("/get-voucher-by-id")
    public ResponseEntity<?> GetVoucherById(@RequestParam(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(voucherService.getVoucherById(id));
    }
}

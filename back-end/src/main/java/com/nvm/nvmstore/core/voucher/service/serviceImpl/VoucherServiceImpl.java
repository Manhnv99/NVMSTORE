package com.nvm.nvmstore.core.voucher.service.serviceImpl;

import com.nvm.nvmstore.core.voucher.repository.DBVoucherRepository;
import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.repository.VoucherRepository;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPostRequest;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPutRequest;
import com.nvm.nvmstore.core.voucher.model.response.GetAllVoucherResponse;
import com.nvm.nvmstore.core.voucher.service.VoucherService;
import com.nvm.nvmstore.utils.CheckStatusVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private DBVoucherRepository voucherRepository;

    @Autowired
    private CheckStatusVoucher checkStatusVoucher;

    //Post Voucher
    @Override
    public String PostVoucher(VoucherPostRequest voucherPostRequest) {
        //Error
        Map<String,String> error=new HashMap<>();

        //Check Voucher_Name exists
        Optional<Voucher> voucherOptional=voucherRepository.findVoucherByName(voucherPostRequest.getName());
        if(voucherOptional.isPresent()){
            error.put("name","Đã Tồn Tại Tên Phiếu Giảm Giá Này!");
        }
        String dateValid=checkStatusVoucher.CheckDate(voucherPostRequest.getDate_start(),voucherPostRequest.getDate_end());
        if(dateValid.equalsIgnoreCase("INVALID")){
            error.put("date","Ngày Bắt Đầu Phải Nhỏ Hơn Hoặc Bằng Ngày Kết Thúc!");
        }
        if(!error.isEmpty()){
            throw new ExceptionMessage(error);
        }

        //Post Voucher
        Voucher postVoucher=new Voucher();
        //Set Code Identity
        Optional<Voucher> newestVoucherOptional=voucherRepository.getNewestVoucher();
        if(newestVoucherOptional.isPresent()){
            String voucherCode=voucherRepository.getNewestVoucher().get().getCode();//getNewStaff to get Code
            System.out.println(voucherCode);
            postVoucher.setCode(voucherCode.substring(0,2)+((Integer.parseInt(voucherCode.substring(2)))+1));
        }else{
            postVoucher.setCode("VC1");
        }
        postVoucher.setName(voucherPostRequest.getName());
        postVoucher.setValue(voucherPostRequest.getValue());
        postVoucher.setMinimum_order(voucherPostRequest.getMinimum_order());
        postVoucher.setQuantity(voucherPostRequest.getQuantity());
        Voucher_Status status=checkStatusVoucher.CheckStatus(voucherPostRequest.getDate_start(),voucherPostRequest.getDate_end());
        postVoucher.setStatus(status);
        postVoucher.setDate_start(voucherPostRequest.getDate_start());
        postVoucher.setDate_end(voucherPostRequest.getDate_end());
        postVoucher.setCreated_at(new Date());
        postVoucher.setUpdated_at(new Date());

        //Post Voucher
        voucherRepository.save(postVoucher);

        return "Post Voucher Successfully!";
    }

    //Put Voucher
    @Override
    public String PutVoucher(VoucherPutRequest voucherPutRequest) {
        //Error
        Map<String,String> error=new HashMap<>();

        Optional<Voucher> voucherOptional=voucherRepository.findById(voucherPutRequest.getVoucher_id());
        voucherOptional.ifPresent(putVoucher -> {
            //Check Name exists
            if(!putVoucher.getName().equals(voucherPutRequest.getName())){
                Optional<Voucher> voucherCheckNameOptional=voucherRepository.findVoucherByName(voucherPutRequest.getName());
                if(voucherCheckNameOptional.isPresent()){
                    error.put("name","Đã Tồn Tại Tên Phiếu Giảm Giá Này!");
                }
            }
            //Check Date Valid
            String dateValid=checkStatusVoucher.CheckDate(voucherPutRequest.getDate_start(),voucherPutRequest.getDate_end());
            if(dateValid.equalsIgnoreCase("INVALID")){
                error.put("date","Ngày Bắt Đầu Phải Nhỏ Hơn Hoặc Bằng Ngày Kết Thúc!");
            }
            if(!error.isEmpty()){
                throw new ExceptionMessage(error);
            }

            //Set Field
            putVoucher.setName(voucherPutRequest.getName());
            putVoucher.setValue(voucherPutRequest.getValue());
            putVoucher.setMinimum_order(voucherPutRequest.getMinimum_order());
            putVoucher.setQuantity(voucherPutRequest.getQuantity());
            Voucher_Status status=checkStatusVoucher.CheckStatus(voucherPutRequest.getDate_start(),voucherPutRequest.getDate_end());
            putVoucher.setStatus(status);
            putVoucher.setDate_start(voucherPutRequest.getDate_start());
            putVoucher.setDate_end(voucherPutRequest.getDate_end());
            putVoucher.setUpdated_at(new Date());

            //Put Voucher
            voucherRepository.save(putVoucher);
        });
        return "Put Voucher Successfully!";
    }

    //GetAllVoucherPaging
    @Override
    public List<GetAllVoucherResponse> getAllVoucherPaging(Integer limit,Integer index) {
        return voucherRepository.getAllVoucherPaging(limit,index);
    }

    //GetToTalPageVoucher
    @Override
    public Double getToTalPageVoucher(Integer limit) {
        return Math.ceil(voucherRepository.getToTalPageVoucher() / limit);
    }

    //SearchVoucherPaging
    @Override
    public List<GetAllVoucherResponse> searchVoucherPaging(String code, Integer quantity, BigDecimal value, Voucher_Status status, String date_start,
                                                           String date_end, Integer limit,Integer index) {
        return voucherRepository.searchVoucherPaging(code,quantity,value,status,date_start,date_end,limit,index);
    }

    //GetToTalPageSearchVoucher
    @Override
    public Double getToTalPageSearchVoucher(String code, Integer quantity, BigDecimal value, Voucher_Status status, String date_start, String date_end,Integer limit) {
        return Math.ceil(voucherRepository.getToTalPageSearchVoucher(code,quantity,value,status,date_start,date_end) / limit);
    }

    @Override
    public Voucher getVoucherById(Long id) {
        return voucherRepository.findById(id).get();
    }
}

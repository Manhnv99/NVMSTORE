package com.nvm.nvmstore.service.qrcode.serviceImpl;

import com.nvm.nvmstore.service.qrcode.QRCodeService;
import com.nvm.nvmstore.utils.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class QRCodeServiceImpl implements QRCodeService {

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Override
    public void GenerateQRCode(Long data) {
        qrCodeGenerator.GenerateQRCode(data+"");
    }

    public String ReadQRCodeToBase64(String data) throws IOException {
        return qrCodeGenerator.ReadQRCodeToBase64(data);
    }
}
package com.nvm.nvmstore.infrastructure.config.qrcode;

import java.io.IOException;

public interface QRCodeService {
    void GenerateQRCode(Long data);

    String ReadQRCodeToBase64(String data) throws IOException;
}

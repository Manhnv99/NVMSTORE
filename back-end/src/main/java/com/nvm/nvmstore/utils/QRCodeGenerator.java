package com.nvm.nvmstore.utils;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Base64;

@Component
@Scope("prototype")
public class QRCodeGenerator {

    public String ReadQRCodeToBase64(String data) throws IOException {
        StringBuilder result= new StringBuilder();
        String pathToImage="src\\main\\resources\\qrcode";
        if(!data.isEmpty()){
            ByteArrayOutputStream os=new ByteArrayOutputStream();
            File myImage=new File(pathToImage,data+".png");
            BufferedImage bufferedImage= ImageIO.read(myImage);
            ImageIO.write(bufferedImage,"png",os);
            result.append("data:image/png;base64,");
            result.append(new String(Base64.getEncoder().encode(os.toByteArray())));
        }
        return result.toString();
    }


    public void GenerateQRCode(String id)  {
        try {
            String pathToSave = "src\\main\\resources\\qrcode\\" + id + ".png";
            Path path = FileSystems.getDefault().getPath(pathToSave);
            QRCodeWriter qc = new QRCodeWriter();
            BitMatrix bm = qc.encode(id, BarcodeFormat.QR_CODE, 300, 300);
            MatrixToImageWriter.writeToPath(bm, "PNG", path);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

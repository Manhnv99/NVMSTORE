package com.nvm.nvmstore.service.serviceImpl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nvm.nvmstore.service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private Cloudinary cloudinary;

    public CloudinaryServiceImpl(){
        Map<String,String> valuesMap=new HashMap<>();
        valuesMap.put("cloud_name", "dbxajsljz");
        valuesMap.put("api_key", "399527952585688");
        valuesMap.put("api_secret", "q1j99tlBNxR4dD2iwtSJJ6jR0rQ");
        valuesMap.put("upload_preset","nvmstore");
        valuesMap.put("folder","nvmstoreimage");
        cloudinary = new Cloudinary(valuesMap);
    }

    @Override
    public Map upload(MultipartFile multipartFile) throws IOException {
        File file=convert(multipartFile);
        Map result=cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        if (!Files.deleteIfExists(file.toPath())) {
            throw new IOException("Failed to delete temporary file: " + file.getAbsolutePath());
        }
        return result;
    }

    @Override
    public Map delete(String id) throws IOException {
        return cloudinary.uploader().destroy(id,ObjectUtils.emptyMap());
    }

    @Override
    public File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fo = new FileOutputStream(file);//tạo 1 file đầu đầu ra
        fo.write(multipartFile.getBytes());//lấy dữ liệu bytes từ multipartfile và viết vào file
        fo.close();//close
        return file;
    }
}

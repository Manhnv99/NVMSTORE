package com.nvm.nvmstore.utils;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@Scope(value = "prototype")
public class ValidateInput {

    public boolean CheckSpace(String input){
        //Pattern.compile tạo 1 mẫu đầu vào
        //Matcher là dùng để nối 1 chuỗi đầu vào với 1 mẫu Pattern
        //matcher.find() -> nếu input thỏa mãn điều kiện trả ra true ngược lại false.
        Pattern pattern=Pattern.compile("\\s{2,}");
        Matcher matcher= pattern.matcher(input);
        return matcher.find();
    }
}

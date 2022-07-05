package com.configservice.controller;
import com.configservice.dto.ConfigDTO;
import com.configservice.dto.ResponseDTO;
import com.configservice.service.ConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ConfigController {
private final ConfigService configService;
    @PostMapping(value = "/config")
    public ResponseEntity<ResponseDTO<String>> addConfig(
            @Valid @RequestBody ConfigDTO configDTO      ) throws IOException {

        ResponseDTO<String> res = new ResponseDTO<String>();
        configService.applyConfig(configDTO);


        res.setMessage("success");
        res.setData("");
        return new ResponseEntity<ResponseDTO<String>>(res, HttpStatus.OK);
    }

}

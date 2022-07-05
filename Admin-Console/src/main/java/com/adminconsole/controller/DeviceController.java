package com.adminconsole.controller;

import com.adminconsole.dto.*;
import com.adminconsole.entity.Device;
import com.adminconsole.entity.DeviceConfig;
import com.adminconsole.entity.User;
import com.adminconsole.service.DeviceService;
import com.adminconsole.util.AdminUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping(value="/devices")
    public ResponseEntity<ResponseDTO<List<ArpDTO>>> listAllDevices() throws Exception{
        List<ArpDTO> deviceList = deviceService.findDevices();
        ResponseDTO<List<ArpDTO>> res = new ResponseDTO<List<ArpDTO>>();
        res.setMessage("Users Found");
        res.setData(deviceList);
        return new ResponseEntity<ResponseDTO<List<ArpDTO>>>(res, HttpStatus.OK);

    }
    @PostMapping(value = "/device/config")
    public ResponseEntity<ResponseDTO<String>> addConfig(
            @Valid @RequestBody ConfigDTO config   ) throws JsonProcessingException {

        ResponseDTO<String> res = new ResponseDTO<String>();
        Device device= new Device();
            device=deviceService.findByMac(config.getMac().trim());
        device.setMacAddress(config.getMac().trim());
        device.setIp(config.getIp().trim());
        device.setStatus("created");
        DeviceConfig deviceConfig=new DeviceConfig();
        if(device.getDeviceConfig()!=null)
            deviceConfig.setConfigId(device.getDeviceConfig().getConfigId());
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(config.getConfigs());
        deviceConfig.setConfigJson(json);
        device.setDeviceConfig(deviceConfig);
        deviceService.save(device);
        res.setMessage("device config added");
        res.setData("newUser");
        return new ResponseEntity<ResponseDTO<String>>(res, HttpStatus.OK);
    }
    @PostMapping("/apply-config")
    public ResponseEntity<ResponseDTO<String>> deleteEmployee( @Valid @RequestBody DeviceDTO deviceDTO ) throws JsonProcessingException {
        ConfigDTO config =new ConfigDTO();
        config.setIp(deviceDTO.getIp());
        config.setMac(deviceDTO.getMac());
        ResponseDTO<String> res = new ResponseDTO<String>();
        deviceService.applyConfig(config);
        res.setMessage("Applied Succesfully");

        return new ResponseEntity<ResponseDTO<String>>(res, HttpStatus.OK);
    }

}

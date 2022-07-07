package com.adminconsole.dto;

import lombok.Data;

import java.util.List;

@Data
public class ConfigDTO {
    String ip;
    private String mac;
    private List<KeyValue> configs;
    public UUIDDTO uuid;


}

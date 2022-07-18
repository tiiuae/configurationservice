package com.configservice.dto;

import lombok.Data;

import java.util.List;
@Data
public class ConfigDTO {

    private List<KeyValue> configs;
}

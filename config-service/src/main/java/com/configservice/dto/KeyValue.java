package com.configservice.dto;

import lombok.Data;

@Data
public class KeyValue {
    private String key;
    private String value;

    @Override
    public String toString() {
        return "{" +
                "key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}

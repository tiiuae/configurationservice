package com.adminconsole.entity;

import javax.persistence.*;

@Entity
public class DeviceConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "config_id")
    private int configId;


    @Column(length = 30)
    private String macAddress;


    @Column(length = 1000)
    private String configJson;

    public int getConfigId() {
        return configId;
    }

    public void setConfigId(int configId) {
        this.configId = configId;
    }



    public String getConfigJson() {
        return configJson;
    }

    public void setConfigJson(String configJson) {
        this.configJson = configJson;
    }
}

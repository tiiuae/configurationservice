package com.configservice.dto;

import lombok.Data;

@Data
public class KeyValue {
    private String set_hostname;
    private String disable_networking;
    private String mesh_service;
    private String gw_service;
    private String dflt_service;
    private String mesh_inf;
    private String gw_inf;
    private String mesh_infs;
    private String api_version;
    private String ssid;
    private String key;

    private String enc;
    private String ap_mac;
    private String country;
    private String frequency;
    private String subnet;
    private String tx_power;
    private String mode;
    private String type;
    private String ip;


    @Override 
    public String toString() {
        return "{" + "[client]: " +
                "set_hostname: " + set_hostname +
                ", disable_networking: " + disable_networking + ", mesh_service: " + mesh_service + ", gw_service: " + gw_service + ", dflt_service: " + dflt_service + ", mesh_inf: " + mesh_inf + ", gw_inf: " + gw_inf + " [server]: " + '\'' +
                "mesh_inf: " + mesh_infs + " [secos]:" + "api_version: "+ api_version + ", ssid: " + ssid + ", key: " +key+ ", enc: " + enc + ", ap_mac: " + ap_mac + ", country: " + country + ", frequency: " + frequency + ", subnet: " + subnet
                + ", tx_power: " + tx_power + ", mode: " +mode + ", type: " +type + ",ip: " + ip +
                '}';
    }
}

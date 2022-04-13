package com.adminconsole.service;

import com.adminconsole.dto.ArpDTO;
import com.adminconsole.dto.ConfigDTO;
import com.adminconsole.dto.KeyValue;
import com.adminconsole.dto.ResponseDTO;
import com.adminconsole.entity.Device;
import com.adminconsole.entity.DeviceConfig;
import com.adminconsole.repository.DeviceConfigRepository;
import com.adminconsole.repository.DeviceRepository;
import com.adminconsole.util.AdminUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceService {
    private final  DeviceConfigRepository configRepository;

    private final DeviceRepository deviceRepository;

    @Value("${config-service.port-no}")
    private String configPort;

    public List<ArpDTO> findDevices() throws IOException {
        Scanner scanner = new Scanner(Runtime.getRuntime().exec("arp -a").getInputStream()).useDelimiter("\\A");
        String ip="";

        List<ArpDTO> entries = new ArrayList<ArpDTO>();
        // scanner.nextLine();

        while (scanner.hasNextLine()) {
            if (!scanner.hasNext())
                break;

            ip = scanner.next();


        }
        entries= AdminUtil.getDevices(ip);
        if(!CollectionUtils.isEmpty(entries))
        setStatus(entries);

       // entries.forEach(a->System.out.println(a.toString()));
        return  entries;
    }

    private void setStatus(List<ArpDTO> entries) {
        List <String> macList = entries.stream().map(ArpDTO::getMac).map(String::trim).collect(Collectors.toList());

        List<Device> devices = deviceRepository.findByMacAddressIn(macList);

        entries.stream().forEach
                (entry->devices.stream().
                        filter(device-> device.getMacAddress().trim().equals(entry.getMac().trim())
                                &&device.getIp().trim().equals(entry.getIp().trim())).
                        forEach(device ->entry.setStatus(device.getStatus()) )
        );

    }



    public void save(Device device) {
        deviceRepository.save(device);
    }


    public Device findByMac(String mac) {
       return  deviceRepository.findByMacAddress(mac).orElse(new Device());
    }

    public void applyConfig(ConfigDTO config) throws JsonProcessingException {
        Device device = deviceRepository.findByMacAddress(config.getMac().trim()).orElse(new Device());
        ObjectMapper mapper = new ObjectMapper();
        List<KeyValue> configList = mapper.readValue
                (device.getDeviceConfig().getConfigJson(), new TypeReference<List<KeyValue>>(){});

        config.setConfigs(configList);
        String baseurl = "http://"+device.getIp().trim()+":"+configPort;

        WebClient webClient = WebClient.builder()
                .baseUrl(baseurl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        ResponseDTO<String>  responseDTO =
     webClient.post()
                .uri("/api/config")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
              .body(Mono.just(config), ConfigDTO.class)
                .retrieve()
                .bodyToMono(ResponseDTO.class).block();
        if(responseDTO!=null) {
            device.setStatus("applied");
            deviceRepository.save(device);
        }
    }
}

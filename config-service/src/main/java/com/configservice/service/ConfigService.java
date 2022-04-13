package com.configservice.service;

import com.configservice.dto.ConfigDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;

@Service
public class ConfigService {

    public void applyConfig(ConfigDTO configDTO) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        mapper.writeValue(Paths.get("config.json").toFile(), configDTO);

    }
}

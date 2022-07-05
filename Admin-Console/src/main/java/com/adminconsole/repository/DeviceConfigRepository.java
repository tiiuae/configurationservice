package com.adminconsole.repository;

import com.adminconsole.entity.DeviceConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceConfigRepository extends JpaRepository<DeviceConfig, Integer> {
}

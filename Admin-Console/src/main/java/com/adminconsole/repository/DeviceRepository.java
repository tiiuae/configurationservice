package com.adminconsole.repository;

import com.adminconsole.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface
DeviceRepository  extends JpaRepository<Device, Integer> {
    List<Device> findByMacAddressIn(List<String> macList);

    Optional<Device> findByMacAddress(String mac);
}

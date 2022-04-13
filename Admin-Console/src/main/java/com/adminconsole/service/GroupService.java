package com.adminconsole.service;

import com.adminconsole.entity.DeviceConfig;
import com.adminconsole.entity.Group;
import com.adminconsole.repository.DeviceConfigRepository;
import com.adminconsole.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository repository;



    public List<Group> findAll() {
     return   repository.findAll();
    }

    public void save(Group group) {
        repository.save(group);
    }

    public Optional<Group> findById(int groupId) {
       return repository.findById(groupId);
    }

}

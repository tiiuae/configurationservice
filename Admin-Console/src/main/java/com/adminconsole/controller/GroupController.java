package com.adminconsole.controller;

import com.adminconsole.dto.GroupDto;
import com.adminconsole.dto.RegisterDTO;
import com.adminconsole.dto.ResponseDTO;
import com.adminconsole.dto.UserDTO;
import com.adminconsole.entity.Group;
import com.adminconsole.entity.User;
import com.adminconsole.service.GroupService;
import com.adminconsole.service.UserService;
import com.adminconsole.util.AdminUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GroupController {

    @Autowired
    private GroupService groupService;


    @PostMapping(value = "/admin/group")
    public ResponseEntity<ResponseDTO<GroupDto>> createGroup(
            @Valid @RequestBody GroupDto groupDto      ) {

        ResponseDTO<GroupDto> res = new ResponseDTO<GroupDto>();

        Group group= new Group();
        group.setGroupName(groupDto.getGroupName());
        group.setActive(true);
        groupService.save(group);


        res.setMessage("user registration Success");
        res.setData(groupDto);
        return new ResponseEntity<ResponseDTO<GroupDto>>(res, HttpStatus.OK);
    }
    @PutMapping(value = "/admin/group")
    public ResponseEntity<ResponseDTO<GroupDto>> updateGroup(
            @Valid @RequestBody GroupDto groupDto      ) {

        ResponseDTO<GroupDto> res = new ResponseDTO<GroupDto>();

        Group group= groupService.findById(groupDto.getGroupId()).orElse(new Group());
        group.setGroupName(groupDto.getGroupName());
        groupService.save(group);


        res.setMessage("user registration Success");
        res.setData(groupDto);
        return new ResponseEntity<ResponseDTO<GroupDto>>(res, HttpStatus.OK);
    }

    @GetMapping(value="/admin/groups")
    public ResponseEntity<ResponseDTO<List<Group>>> listGroup () throws Exception{
        List<Group> groupList = groupService.findAll();
        ResponseDTO<List<Group>> res = new ResponseDTO<List<Group>>();
        res.setMessage("Group Found");
        res.setData(groupList);
        return new ResponseEntity<ResponseDTO<List<Group>>>(res, HttpStatus.OK);

    }



}

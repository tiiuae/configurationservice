package com.adminconsole.dto;

import com.adminconsole.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Set;
@Data
@NoArgsConstructor
public class GroupDto {
    private int groupId;
    private String groupName;
    private Set<User> members;
}

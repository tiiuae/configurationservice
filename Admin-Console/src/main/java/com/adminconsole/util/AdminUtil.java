package com.adminconsole.util;

import com.adminconsole.dto.ArpDTO;
import com.adminconsole.entity.Group;
import com.adminconsole.entity.Role;
import com.adminconsole.entity.User;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AdminUtil {

    public static void setUserRole(User user, int roleId) {
        List<Role> rollist = new ArrayList<Role>();
        Role role = new Role();
        role.setRoleId(roleId);
        rollist.add(role);
        user.setRoles(new HashSet<>(rollist));
    }

    public static void setUsers(Group group, List<User> users) {
        List<User> userList = new ArrayList<User>();
        userList.addAll(group.getMembers()!=null?group.getMembers():new ArrayList<User>());


        userList.addAll(users);
        group.setMembers(new HashSet<>(userList));
    }


    public static  List<ArpDTO>   getDevices(String arp){
        List<ArpDTO> arpList = new ArrayList<>();
        String [] items = arp.split("\\r?\\n");
        for(int i=2;i<items.length;i++){
            ArpDTO arpobj =new ArpDTO();
            String ip =getIp(items[i]);
            String mac =getMac(items[i]);
            arpobj.setIp(ip);
            arpobj.setMac(mac);
            if(items[i].contains("dynamic"))
                arpobj.setType("dynamic");
            else if(items[i].contains("static"))
                arpobj.setType("static");
            arpobj.setStatus("pending");
            if(StringUtils.hasText(mac))
            arpList.add(arpobj);
        }
        return arpList;

    }
    public static String getIp(String ip){
        String IPADDRESS_PATTERN =
                "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

        Pattern pattern = Pattern.compile(IPADDRESS_PATTERN);
        Matcher matcher = pattern.matcher(ip);
        if (matcher.find()) {
            return matcher.group();
        }
        else{
            return "";
        }
    }
    public static String getMac(String ip){
        String MACADDRESS_PATTERN =
                "\\s{0,}([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})";

        Pattern pattern = Pattern.compile(MACADDRESS_PATTERN);
        Matcher matcher = pattern.matcher(ip);
        if (matcher.find()) {
            return matcher.group();
        }
        else{
            return "";
        }
    }
}

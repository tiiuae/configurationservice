package com.adminconsole.service;

import com.adminconsole.dto.ArpDTO;
import com.adminconsole.entity.User;
import com.adminconsole.repository.UserRepository;
import com.adminconsole.util.AdminUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public User save(User user) {
        return repo.save(user);

    }
    public static String getSubnet(String currentIP) {
        int firstSeparator = currentIP.lastIndexOf("/");
        int lastSeparator = currentIP.lastIndexOf(".");
        return currentIP.substring(firstSeparator+1, lastSeparator+1);
    }
    public void checkHosts() throws Exception  {

        int timeout=500;
        int port = 1234;

        try {
            String currentIP = InetAddress.getLocalHost().toString();
            String subnet = getSubnet(currentIP);
            System.out.println("subnet: " + subnet);

            for (int i=1;i<254;i++){

                String host = subnet + i;
                System.out.println("Checking :" + host);

                if (InetAddress.getByName(host).isReachable(timeout)){
                    System.out.println(host + " is reachable");
                    try {
                        Socket connected = new Socket(subnet, port);
                    }
                    catch (Exception s) {
                        System.out.println(s);
                    }
                }
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

    }

    private static final String ARP_GET_IP_HW = "arp -a";



    public List<User> findAll() throws Exception {


        //checkHosts();
        return repo.findAll();
    }

    public void saveUserCredentials(User user) {
        if(user.getPassword()!="" && user.getPassword()!=null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        repo.saveUserCredentials(user.getUsername(), user.getPassword(), user.getUserId());


    }
    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public void changePassword(User user, String newPassword) {
        BCryptPasswordEncoder bEncoder = new BCryptPasswordEncoder();
        String encoded=bEncoder.encode(newPassword);
        repo.changePassword(encoded,user.getUserId());
    }

    public boolean checkIfValidOldPassword(User user, String oldPassword) {
        return bCryptPasswordEncoder.matches(oldPassword, user.getPassword());
    }

    public List<User> findAdmins() {
        return repo.findByRolesRoleId(1);

    }

    public List<User> findUsers() throws IOException {
      return   repo.findByRolesRoleId(2);

    }

    public User findbyUserId(int userId) {
        return repo.findById(userId).orElse(new User());
    }

    public void delete(int userId) {
        repo.deleteById(userId);
    }
}

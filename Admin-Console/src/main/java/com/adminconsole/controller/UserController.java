package com.adminconsole.controller;

import com.adminconsole.dto.*;
import com.adminconsole.entity.User;
import com.adminconsole.service.UserService;
import com.adminconsole.util.AdminUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping(value = "/auth/registration/user")
    public ResponseEntity<ResponseDTO<UserDTO>> registerEmployer(
            @Valid @RequestBody RegisterDTO registerDTO      ) {

        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();

        User user= new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        user.setActive(true);
        AdminUtil.setUserRole(user, 1);
        user=	userService.save(user);
        userService.saveUserCredentials(user);
        UserDTO userDTO = new UserDTO(user);

        res.setMessage("user registration Success");
        res.setData(userDTO);
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }

    @PutMapping(value = "/admin/user")
    public ResponseEntity<ResponseDTO<UserDTO>> updateUser(
            @Valid @RequestBody UserDTO userDTO      ) {

        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();

        User user= userService.findbyUserId(userDTO.getUserId());
        user.setUsername(userDTO.getUsername());
        if(userDTO.getPassword()!=null)
        user.setPassword(userDTO.getPassword());
        user=	userService.save(user);
        if(userDTO.getPassword()!=null)
        userService.saveUserCredentials(user);

        res.setMessage("update success");
        res.setData(userDTO);
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }
    @PostMapping(value = "/admin/user")
    public ResponseEntity<ResponseDTO<UserDTO>> createUser(
            @Valid @RequestBody UserDTO userDTO      ) {

        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();

        User user= new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setActive(true);
        AdminUtil.setUserRole(user, 2);
        user=	userService.save(user);
        userService.saveUserCredentials(user);
        UserDTO newUser = new UserDTO(user);

        res.setMessage("user creation success");
        res.setData(newUser);
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }
    @PostMapping(value = "/admin/admin")
    public ResponseEntity<ResponseDTO<UserDTO>> createAdmin(
            @Valid @RequestBody UserDTO userDTO      ) {

        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();

        User user= new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setActive(true);
        AdminUtil.setUserRole(user, 1);
        user=	userService.save(user);
        userService.saveUserCredentials(user);
        UserDTO newUser = new UserDTO(user);

        res.setMessage("user creation success");
        res.setData(newUser);
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }




    @GetMapping(value="/admin/users")
    public ResponseEntity<ResponseDTO<List<User>>> listAllUser () throws Exception{
        List<User> userList = userService.findUsers();
        ResponseDTO<List<User>> res = new ResponseDTO<List<User>>();
        res.setMessage("Users Found");
        res.setData(userList);
        return new ResponseEntity<ResponseDTO<List<User>>>(res, HttpStatus.OK);

    }
    @GetMapping(value="/createUUID")
    public ResponseEntity<ResponseDTO<UUIDDTO>> createUUID() throws Exception{
        UUIDDTO uuid = userService.createUUID();
        ResponseDTO<UUIDDTO> res = new ResponseDTO<UUIDDTO>();
        res.setMessage("uuid created");
        res.setData(uuid);
        return new ResponseEntity<ResponseDTO<UUIDDTO>>(res, HttpStatus.OK);
    }



    @GetMapping(value="/admin/admins")
    public ResponseEntity<ResponseDTO<List<User>>> listAllAdmins() throws Exception{
        List<User> userList = userService.findAdmins();
        ResponseDTO<List<User>> res = new ResponseDTO<List<User>>();
        res.setMessage("Users Found");
        res.setData(userList);
        return new ResponseEntity<ResponseDTO<List<User>>>(res, HttpStatus.OK);

    }



    @PutMapping(value="/admin/user/change-password")
    public ResponseEntity<ResponseDTO<UserDTO>> changeUserPassword(
            @Valid @RequestBody PasswordChangeDTO passwordChangeDTO      ) {
        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();


        User user = userService.findByUsername(passwordChangeDTO.getUsername());
        if(!userService.checkIfValidOldPassword(user,passwordChangeDTO.getCurrentPassword())) {

            res.setMessage("Invalid Old Password");
            return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.NOT_FOUND);
        }
        //Save New Password
        userService.changePassword(user,passwordChangeDTO.getNewPassword());
               res.setMessage("Password Changed Successfully");
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }

    @PutMapping(value="/change-password")
    public ResponseEntity<ResponseDTO<UserDTO>> changePassword(
            @Valid @RequestBody PasswordChangeDTO passwordChangeDTO , Principal principal      ) {
        ResponseDTO<UserDTO> res = new ResponseDTO<UserDTO>();


        User user = userService.findByUsername(principal.getName());
        if(!userService.checkIfValidOldPassword(user,passwordChangeDTO.getCurrentPassword())) {

            res.setMessage("Invalid Old Password");
            return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.NOT_FOUND);
        }
        //Save New Password
        userService.changePassword(user,passwordChangeDTO.getNewPassword());
        res.setMessage("Password Changed Successfully");
        return new ResponseEntity<ResponseDTO<UserDTO>>(res, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ResponseDTO<String>> deleteEmployee(@PathVariable(value = "id") int userId)
             {
                 ResponseDTO<String> res = new ResponseDTO<String>();
                 userService.delete(userId);

                 return new ResponseEntity<ResponseDTO<String>>(res, HttpStatus.OK);
    }
}

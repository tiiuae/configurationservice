package com.adminconsole.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
@Data
public class PasswordChangeDTO {
    @NotBlank(message = "username may not be blank")
    private String username;
    @NotBlank(message = "password may not be blank")
    private String currentPassword;
    @NotBlank(message = "password may not be blank")
    private String newPassword;
    private String confirmPassword;
}

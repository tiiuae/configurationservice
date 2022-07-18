package com.adminconsole.dto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Data
public class RegisterDTO {



	//@Size(min = 7, max = 13, message = "Please enter valid Phone Number")
	@NotBlank(message = "username may not be blank")
	private String username;
	@NotBlank(message = "password may not be blank")
	private String password;

}

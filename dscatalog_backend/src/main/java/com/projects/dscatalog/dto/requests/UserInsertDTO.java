package com.projects.dscatalog.dto.requests;

import javax.validation.constraints.NotBlank;

import com.projects.dscatalog.exceptions.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO{
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Senha deve ser preenchida")
    private String password;

    public UserInsertDTO(){
        super();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

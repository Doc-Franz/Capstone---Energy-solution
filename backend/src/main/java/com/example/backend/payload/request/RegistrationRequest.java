package com.example.backend.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data

public class RegistrationRequest {

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(min = 3, max = 20)
    private String firstName;

    @NotBlank
    @Size(min = 3, max = 20)
    private String lastName;

    @NotBlank
    @Email(message = "Email non valida")
    private String email;

    @NotBlank
    @Size(min = 3, max = 20)
    private String password;

    @URL
    private String avatar;

    // ❗❗❗ controllare se inserire String ruolo

}

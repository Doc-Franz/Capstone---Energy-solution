package com.example.backend.payload.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

public class UserRequestDTO {

    @NotBlank
    private String object;

    // commento inserito dall'utente in fase di compilazione del form
    private String textArea;

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
    private String city;

    @Digits(integer = 15, fraction = 0, message = "Il numero di telefono deve contenere solo cifre")
    private String phoneNumber;
}

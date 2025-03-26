package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "userRequests")
@Data
@NoArgsConstructor

public class UserRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // oggetto della richiesta -> assistenza, normative, lavora con noi...
    @Column(nullable = false)
    private String object;

    // commento inserito dall'utente in fase di compilazione del form
    private String textArea;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    private String city;

    private String phoneNumber;

    public UserRequest(String object, String textArea, String firstName, String lastName, String email, String city, String phoneNumber) {
        this.object = object;
        this.textArea = textArea;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.phoneNumber = phoneNumber;
    }
}

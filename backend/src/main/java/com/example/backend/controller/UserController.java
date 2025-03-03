package com.example.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.exception.EmailDuplicatedException;
import com.example.backend.exception.UsernameDuplicatedException;
import com.example.backend.model.User;
import com.example.backend.payload.request.LoginRequest;
import com.example.backend.payload.request.RegistrationRequest;
import com.example.backend.payload.response.LoginResponse;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")

public class UserController {

    @Autowired
    Cloudinary cloudinary;

    @Autowired
    UserService userService;

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> userRegistration(@RequestPart("user") @Validated RegistrationRequest registrationRequest,
                                                                BindingResult validation, @RequestPart("avatar")MultipartFile avatar) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if(validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for(ObjectError error : validation.getAllErrors()){
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(avatar.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine
            String urlImage = mapUpload.get("secure_url").toString();

            // salvo il nuovo user e associo l'avatar
            long newUserId = userService.saveUser(registrationRequest, urlImage);

            response.put("Salvataggio effettuato", "Utente con Id " + newUserId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (EmailDuplicatedException | UsernameDuplicatedException ex){
            response.put("Errore", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Validated @RequestBody LoginRequest loginRequest, BindingResult validation){

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        try {
            if(validation.hasErrors()) {

                StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

                for(ObjectError error : validation.getAllErrors()){
                    errorMessage.append(error.getDefaultMessage()).append("\n");
                }

                response.put("Errore", errorMessage.toString());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

            }

            LoginResponse loginResponse = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

            response.put("utente", loginRequest.getUsername());
            response.put("token" , loginResponse.getToken());
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception ex) {
            response.put("Credenziali non valide", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

}

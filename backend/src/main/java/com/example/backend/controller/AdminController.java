package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")

public class AdminController {

    // ❗❗❗ metodo per testare il login con ADMIN
    @GetMapping("/prova")
    public ResponseEntity<String> metodoDiProva(){
        return new ResponseEntity<>("Il metodo sta funzionando!!!", HttpStatus.OK) ;
    }
}

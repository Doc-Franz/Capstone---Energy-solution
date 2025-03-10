package com.example.backend.exception;

public class HeaterNotFoundException extends RuntimeException {
    public HeaterNotFoundException(String message) {
        super(message);
    }
}

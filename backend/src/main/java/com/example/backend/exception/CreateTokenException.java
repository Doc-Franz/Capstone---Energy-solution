package com.example.backend.exception;

public class CreateTokenException extends RuntimeException {
    public CreateTokenException(String message) {
        super(message);
    }
}

package com.example.backend.exception;

public class NotEnoughCreditException extends RuntimeException {
    public NotEnoughCreditException(String message) {
        super(message);
    }
}

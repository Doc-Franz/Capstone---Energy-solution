package com.example.backend.payload.response;

import lombok.Data;

import java.util.List;

@Data

public class JwtResponse {

    private String username;
    private long id;
    private String email;
    private List<String> role;
    private String token;
    private String type = "Bearer ";

    public JwtResponse(String username, long id, String email, List<String> role, String token) {
        this.username = username;
        this.id = id;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}

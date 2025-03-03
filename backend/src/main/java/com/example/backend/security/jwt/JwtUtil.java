package com.example.backend.security.jwt;

import com.example.backend.exception.CreateTokenException;
import com.example.backend.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component

public class JwtUtil {

    // aggiungere le costanti legate al JWT
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private String jwtExpiration;

    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_PREFIX = "Bearer ";

    // oggetto che occorre per la validazione
    private JwtParser JWTPARSER;

    // il parser viene creato dopo che Spring ha iniettato il valore di jwtSecret
    @PostConstruct
    public void init() {
        JWTPARSER = Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes())
                .build();
    }

    // metodo per la creazione del JWT
    public String createJwtToken(User user) {

        long expirationTime = Long.parseLong(jwtExpiration);

        // impostazione del claims (Payload)
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("roles", user.getRole());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        Date tokenCreationDate = new Date();
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        // creazione del token
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getToken(HttpServletRequest request) throws CreateTokenException {

        // recupero dall'header della richiesta il token con prefisso "Authorization"
        String bearerToken = request.getHeader(TOKEN_HEADER);

        // il token è presente? inizia con "Bearer " ?
        if(bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {

            // ritorna il token senza prefisso
            return bearerToken.substring(TOKEN_PREFIX.length());
        }

        throw new CreateTokenException("Token non creato correttamente");
    }

    // metodo di validazione del token
    public Claims validateClaims(HttpServletRequest request) throws CreateTokenException {

        try {
            String token = getToken(request);
            return JWTPARSER.parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException ex) {
            request.setAttribute("token scaduto", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            request.setAttribute("token invalido", ex.getMessage());
            throw ex;
        }
    }

    // metodo che controlla la scadenza del token
    public boolean checkExpiration(Claims claims) {
        return claims.getExpiration().after(new Date());
    }
}

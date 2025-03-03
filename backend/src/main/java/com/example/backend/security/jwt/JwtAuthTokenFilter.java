package com.example.backend.security.jwt;

import com.example.backend.exception.CreateTokenException;
import com.example.backend.security.services.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component

public class JwtAuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            //1. RECUPERO DEL TOKEN
            String token = jwtUtil.getToken(request);

            //2. VALIDAZIONE DEL TOKEN : token -> claims
            Claims claims = jwtUtil.validateClaims(request);

            //3. CHECK SCADENZA
            if(claims != null && jwtUtil.checkExpiration(claims)) {

                List<GrantedAuthority> roles = new ArrayList<>();
                GrantedAuthority roleAuthenticated = new SimpleGrantedAuthority(claims.get("roles").toString());
                roles.add(roleAuthenticated);
                System.out.println("Ruolo estratto: " + claims.get("roles"));

                //4. INTEGRITà DEL TOKEN
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(claims.getSubject(), "", roles);

                //5. INSERIMENTO NEL CONTESTO DI SICUREZZA
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (CreateTokenException ex) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        } catch (Exception e) {
            Map<String, Object> errorDetails = new HashMap<>();
            errorDetails.put("message", "Autenticazione negata");
            errorDetails.put("details", e.getMessage());
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(response.getWriter(), errorDetails);
            return;
        }

        filterChain.doFilter(request, response);
    }
}

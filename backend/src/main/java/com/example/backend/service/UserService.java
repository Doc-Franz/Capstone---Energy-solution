package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.exception.EmailDuplicatedException;
import com.example.backend.exception.UsernameDuplicatedException;
import com.example.backend.model.User;
import com.example.backend.payload.request.RegistrationRequest;
import com.example.backend.payload.response.LoginResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@Transactional

public class UserService {

    // proprietà dello user ADMIN
    @Value("${user.admin.username}")
    private String adminUsername;

    @Value("${user.admin.email}")
    private String adminEmail;

    @Value("${user.admin.password}")
    private String adminPassword;

    @Value("${user.admin.firstName}")
    private String adminFirstName;

    @Value("${user.admin.lastName}")
    private String adminLastName;

    @Value("${user.admin.avatar}")
    private String adminAvatar;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Cloudinary cloudinary;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    public long saveUser(RegistrationRequest registrationRequest, String urlImage){

        // controllare se email e username sono già stati utilizzati
        checkDuplicated(registrationRequest.getUsername(), registrationRequest.getEmail());

        // la password viene criptata prima dell'inserimento nel database
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());

        User newUser = new User(
                registrationRequest.getUsername(),
                registrationRequest.getFirstName(),
                registrationRequest.getLastName(),
                registrationRequest.getEmail(),
                encodedPassword,
                urlImage
        );

        newUser.setRole("USER");
        userRepository.save(newUser);
        return newUser.getId();
    }

    // generazione dello user con licenza ADMIN
    public void createAdmin() throws IOException {

        // verifico se l'utente è già presente nel database
        if(userRepository.existsByUsername(adminUsername)){
            return;
        }

        try {
            // invio immagine dell'avatar admin al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(adminAvatar.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine
            String urlImage = mapUpload.get("secure_url").toString();

            User adminUser = new User(
                    adminUsername,
                    adminFirstName,
                    adminLastName,
                    adminEmail,
                    passwordEncoder.encode(adminPassword),
                    urlImage
            );

            adminUser.setRole("ADMIN");
            userRepository.save(adminUser);
            System.out.println("Admin salvato con successo");
        } catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }

    // LOGIN
    public LoginResponse login(String username, String password){

        //1. AUTENTICAZIONE DELL'UTENTE IN FASE DI LOGIN
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        //2. INSERIMENTO DELL'AUTENTICAZIONE UTENTE NEL CONTESTO DELLA SICUREZZA
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //3. RECUPERO RUOLI -> String
        String role = null;
        for (Object roleObject : authentication.getAuthorities()){
            role = roleObject.toString();
            break;
        }

        // 4. GENERAZIONE DELL'UTENTE
        User user = new User();
        user.setUsername(username);
        user.setRole(role);

        // 5. GENERAZIONE DEL TOKEN
        String token = jwtUtil.createJwtToken(user);

        // 6. CREO L'OGGETTO DI RISPOSTA AL CLIENT
        return new LoginResponse(username, token);
    }

    // controllare se username ed email dell'utente che si sta registrando già esistono
    public void checkDuplicated(String username, String email) {

            if (userRepository.existsByUsername(username)){
                throw new UsernameDuplicatedException("L'username" + username + "è già stato utilizzato");
            }
            if (userRepository.existsByEmail(email)){
                throw new EmailDuplicatedException("L'email" + email + "è già stata utilizzata");
            }
    }
}

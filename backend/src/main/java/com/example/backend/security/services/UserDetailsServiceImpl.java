package com.example.backend.security.services;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // ricerca dell'utente tramite username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Non è stato trovato nessun utente con username " + username));

        // ritorno di un oggetto UserDetails con le info dell'utente da includere nel token
        // importazione di User da security.core.userdetails effettuata qui per non creare conflitto con la classe User nel model
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(String.valueOf(user.getRole())).build();
    }
}

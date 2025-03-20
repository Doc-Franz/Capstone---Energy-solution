package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor

public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String transactionId;

    private LocalDate transactionDate;

    // un utente può effettuare più transazioni
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // la stessa macchina può venire acquistata più volte
    @ManyToOne
    @JoinColumn(name = "heater_id")
    private Heater heater;

    public Transaction(String transactionId, User user, Heater heater) {
        this.transactionId = transactionId;
        this.transactionDate = LocalDate.now();
        this.user = user;
        this.heater = heater;
    }
}

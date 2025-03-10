package com.example.backend.repository;

import com.example.backend.model.Heater;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HeaterRepository extends JpaRepository<Heater, Long> {

    // in base alla potenza calcolata da input dell'utente verificare se a database ci sono macchine che soddisfano questi valori
    Optional<List<Heater>> findByPowerGreaterThan (int powerEvaluated);
}

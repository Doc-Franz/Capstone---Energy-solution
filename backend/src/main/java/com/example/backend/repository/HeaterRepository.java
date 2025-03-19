package com.example.backend.repository;

import com.example.backend.model.Heater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HeaterRepository extends JpaRepository<Heater, Long> {

    // in base alla potenza calcolata da input dell'utente verificare se a database ci sono macchine che soddisfano questi valori
    List<Heater> findByPowerGreaterThan (int powerEvaluated);

    // ricerca per tipo di sistema
    @Query("SELECT h FROM Heater h WHERE TYPE(h) = :heaterClass")
    List<Heater> findBydiscriminatorType (Class<? extends Heater> heaterClass);

    // ricerca per tipo di sistema e potenza
    @Query("SELECT h FROM Heater h WHERE TYPE(h) = :heaterClass AND h.power >= :powerEvaluated")
    List<Heater> findByBuildingEvaluation (Class<? extends Heater> heaterClass, int powerEvaluated);

    // ricerca un heater dalla barra di ricerca case insensitive
    List<Heater> findByTitleStartingWithIgnoreCase(String search);
    List<Heater> findByDescriptionStartingWithIgnoreCase(String search);
}

package com.example.backend.repository;

import com.example.backend.model.Heater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HeaterRepository extends JpaRepository<Heater, Long> {

    // in base alla potenza calcolata da input dell'utente verificare se a database ci sono macchine che soddisfano questi valori
    List<Heater> findByPowerGreaterThanAndPowerLessThan (int powerEvaluated, int maxPower);

    // ricerca per tipo di sistema
    @Query("SELECT h FROM Heater h WHERE TYPE(h) = :heaterClass")
    List<Heater> findBydiscriminatorType (Class<? extends Heater> heaterClass);

    // ricerca per tipo di sistema e potenza
    @Query("SELECT h FROM Heater h WHERE TYPE(h) = :heaterClass AND h.power >= :powerEvaluated AND h.power < :maxPower")
    List<Heater> findByBuildingEvaluation (@Param("heaterClass") Class<? extends Heater> heaterClass,
                                           @Param("powerEvaluated") int powerEvaluated,
                                           @Param("maxPower") double maxPower);

    // ricerca di tutti i sistemi acquistati da un utente
    @Query("SELECT h FROM Heater h JOIN h.users u WHERE u.id = :userId")
    List<Heater> getUserQuotes (@Param("userId") int userId);

    // ricerca un heater dalla barra di ricerca case insensitive
    List<Heater> findByTitleStartingWithIgnoreCase(String search);
    List<Heater> findByDescriptionStartingWithIgnoreCase(String search);
}

package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "heaters")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "heater_type", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor

public abstract class Heater {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    // descrizione che sarà presente nella pagina di dettaglio
    @Column(nullable = false)
    private String longDescription;

    @Column(nullable = false)
    private int power;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int numberOfPieces;

    private String firstElementList;
    private String secondElementList;
    private String thirdElementList;

    private String firstIcon;
    private String secondIcon;
    private String thirdIcon;

    @Column(nullable = false)
    private String image;

    // quando viene acquistato un prodotto si riduce il numero di pezzi disponibile a magazzino
    public void reduceNumberOfPieces () {
        this.numberOfPieces -= 1;
    }

}

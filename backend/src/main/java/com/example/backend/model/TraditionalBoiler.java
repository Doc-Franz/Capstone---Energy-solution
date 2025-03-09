package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("TRADITIONAL_BOILER")

public class TraditionalBoiler extends Heater{
}

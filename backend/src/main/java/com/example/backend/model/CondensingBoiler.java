package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CONDENSING_BOILER")

public class CondensingBoiler extends Heater{
}

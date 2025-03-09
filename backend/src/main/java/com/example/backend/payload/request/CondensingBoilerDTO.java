package com.example.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data

public class CondensingBoilerDTO {

    @NotBlank(message = "Il campo title non può essere vuoto")
    private String title;

    @NotBlank(message = "Il campo description non può essere vuoto")
    private String description;

    @NotBlank(message = "Il campo power non può essere vuoto")
    private int power;

    private String firstElementList;
    private String secondElementList;
    private String thirdElementList;

    private String firstIcon;
    private String secondIcon;
    private String thirdIcon;

    @URL
    @NotBlank(message = "Il campo image non può essere vuoto")
    private String image;
}

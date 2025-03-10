package com.example.backend.payload.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data

public class GeothermicDTO {

    @NotBlank(message = "Il campo title non può essere vuoto")
    private String title;

    @NotBlank(message = "Il campo description non può essere vuoto")
    private String description;

    @NotNull(message = "Il campo power non può essere vuoto")
    @Min(value = 5, message = "Il campo power deve essere almeno 5")
    private int power;

    private String firstElementList;
    private String secondElementList;
    private String thirdElementList;

    private String firstIcon;
    private String secondIcon;
    private String thirdIcon;

    @URL
    private String image;
}

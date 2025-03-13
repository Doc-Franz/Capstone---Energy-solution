package com.example.backend.service;

import com.example.backend.model.Geothermic;
import com.example.backend.model.Heater;
import com.example.backend.payload.request.GeothermicDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class GeothermicService {

    // Geothermic DTO -> ENTITY
    public Geothermic dto_entity(GeothermicDTO geothermicDTO) {

        Geothermic geothermic = new Geothermic();

        geothermic.setTitle(geothermicDTO.getTitle());
        geothermic.setDescription(geothermicDTO.getDescription());
        geothermic.setLongDescription(geothermicDTO.getLongDescription());
        geothermic.setPower(geothermicDTO.getPower());
        geothermic.setPrice(geothermicDTO.getPrice());
        geothermic.setNumberOfPieces(geothermicDTO.getNumberOfPieces());
        geothermic.setImage(geothermicDTO.getImage());

        geothermic.setFirstElementList(geothermicDTO.getFirstElementList());
        geothermic.setSecondElementList(geothermicDTO.getSecondElementList());
        geothermic.setThirdElementList(geothermicDTO.getThirdElementList());

        geothermic.setFirstIcon(geothermicDTO.getFirstIcon());
        geothermic.setSecondIcon(geothermicDTO.getSecondIcon());
        geothermic.setThirdIcon(geothermicDTO.getThirdIcon());

        return  geothermic;
    }

    // Geothermic ENTITY -> DTO
    public GeothermicDTO entity_dto(Geothermic geothermic) {

        GeothermicDTO geothermicDTO = new GeothermicDTO();

        geothermicDTO.setTitle(geothermic.getTitle());
        geothermicDTO.setDescription(geothermic.getDescription());
        geothermicDTO.setLongDescription(geothermic.getLongDescription());
        geothermicDTO.setPower(geothermic.getPower());
        geothermicDTO.setPrice(geothermic.getPrice());
        geothermicDTO.setNumberOfPieces(geothermic.getNumberOfPieces());
        geothermicDTO.setImage(geothermic.getImage());

        geothermicDTO.setFirstElementList(geothermic.getFirstElementList());
        geothermicDTO.setSecondElementList(geothermic.getSecondElementList());
        geothermicDTO.setThirdElementList(geothermic.getThirdElementList());

        geothermicDTO.setFirstIcon(geothermic.getFirstIcon());
        geothermicDTO.setSecondIcon(geothermic.getSecondIcon());
        geothermicDTO.setThirdIcon(geothermic.getThirdIcon());

        return geothermicDTO;
    }
}

package com.example.backend.service;

import com.example.backend.model.CondensingBoiler;
import com.example.backend.model.TraditionalBoiler;
import com.example.backend.payload.request.CondensingBoilerDTO;
import com.example.backend.payload.request.TraditionalBoilerDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class CondensingBoilerService {

    // Condensing boiler DTO -> ENTITY
    public CondensingBoiler dto_entity(CondensingBoilerDTO condensingBoilerDTO) {

        CondensingBoiler condensingBoiler = new CondensingBoiler();

        condensingBoiler.setTitle(condensingBoilerDTO.getTitle());
        condensingBoiler.setDescription(condensingBoilerDTO.getDescription());
        condensingBoiler.setPower(condensingBoilerDTO.getPower());
        condensingBoiler.setPrice(condensingBoilerDTO.getPrice());
        condensingBoiler.setNumberOfPieces(condensingBoilerDTO.getNumberOfPieces());
        condensingBoiler.setImage(condensingBoilerDTO.getImage());

        condensingBoiler.setFirstElementList(condensingBoilerDTO.getFirstElementList());
        condensingBoiler.setSecondElementList(condensingBoilerDTO.getSecondElementList());
        condensingBoiler.setThirdElementList(condensingBoilerDTO.getThirdElementList());

        condensingBoiler.setFirstIcon(condensingBoilerDTO.getFirstIcon());
        condensingBoiler.setSecondIcon(condensingBoilerDTO.getSecondIcon());
        condensingBoiler.setThirdIcon(condensingBoilerDTO.getThirdIcon());

        return condensingBoiler;
    }

    // Condensing boiler ENTITY -> DTO
    public CondensingBoilerDTO entity_dto(CondensingBoiler condensingBoiler) {

        CondensingBoilerDTO condensingBoilerDTO = new CondensingBoilerDTO();

        condensingBoilerDTO.setTitle(condensingBoiler.getTitle());
        condensingBoilerDTO.setDescription(condensingBoiler.getDescription());
        condensingBoilerDTO.setPower(condensingBoiler.getPower());
        condensingBoilerDTO.setPrice(condensingBoiler.getPrice());
        condensingBoilerDTO.setNumberOfPieces(condensingBoiler.getNumberOfPieces());
        condensingBoilerDTO.setImage(condensingBoiler.getImage());

        condensingBoilerDTO.setFirstElementList(condensingBoiler.getFirstElementList());
        condensingBoilerDTO.setSecondElementList(condensingBoiler.getSecondElementList());
        condensingBoilerDTO.setThirdElementList(condensingBoiler.getThirdElementList());

        condensingBoilerDTO.setFirstIcon(condensingBoiler.getFirstIcon());
        condensingBoilerDTO.setSecondIcon(condensingBoiler.getSecondIcon());
        condensingBoilerDTO.setThirdIcon(condensingBoiler.getThirdIcon());

        return condensingBoilerDTO;
    }
}

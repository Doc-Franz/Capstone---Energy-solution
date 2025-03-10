package com.example.backend.service;

import com.example.backend.model.HeatPump;
import com.example.backend.model.TraditionalBoiler;
import com.example.backend.payload.request.HeatPumpDTO;
import com.example.backend.payload.request.TraditionalBoilerDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class TraditionalBoilerService {

    // Traditional boiler DTO -> ENTITY
    public TraditionalBoiler dto_entity(TraditionalBoilerDTO traditionalBoilerDTO) {

        TraditionalBoiler traditionalBoiler = new TraditionalBoiler();

        traditionalBoiler.setTitle(traditionalBoilerDTO.getTitle());
        traditionalBoiler.setDescription(traditionalBoilerDTO.getDescription());
        traditionalBoiler.setPower(traditionalBoilerDTO.getPower());
        traditionalBoiler.setImage(traditionalBoilerDTO.getImage());

        traditionalBoiler.setFirstElementList(traditionalBoilerDTO.getFirstElementList());
        traditionalBoiler.setSecondElementList(traditionalBoilerDTO.getSecondElementList());
        traditionalBoiler.setThirdElementList(traditionalBoilerDTO.getThirdElementList());

        traditionalBoiler.setFirstIcon(traditionalBoilerDTO.getFirstIcon());
        traditionalBoiler.setSecondIcon(traditionalBoilerDTO.getSecondIcon());
        traditionalBoiler.setThirdIcon(traditionalBoilerDTO.getThirdIcon());

        return  traditionalBoiler;
    }

    // Traditional boiler ENTITY -> DTO
    public TraditionalBoilerDTO entity_dto(TraditionalBoiler traditionalBoiler) {

        TraditionalBoilerDTO traditionalBoilerDTO = new TraditionalBoilerDTO();

        traditionalBoilerDTO.setTitle(traditionalBoiler.getTitle());
        traditionalBoilerDTO.setDescription(traditionalBoiler.getDescription());
        traditionalBoilerDTO.setPower(traditionalBoiler.getPower());
        traditionalBoilerDTO.setImage(traditionalBoiler.getImage());

        traditionalBoilerDTO.setFirstElementList(traditionalBoiler.getFirstElementList());
        traditionalBoilerDTO.setSecondElementList(traditionalBoiler.getSecondElementList());
        traditionalBoilerDTO.setThirdElementList(traditionalBoiler.getThirdElementList());

        traditionalBoilerDTO.setFirstIcon(traditionalBoiler.getFirstIcon());
        traditionalBoilerDTO.setSecondIcon(traditionalBoiler.getSecondIcon());
        traditionalBoilerDTO.setThirdIcon(traditionalBoiler.getThirdIcon());

        return traditionalBoilerDTO;
    }
}

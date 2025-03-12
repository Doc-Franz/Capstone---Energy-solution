package com.example.backend.service;

import com.example.backend.model.Geothermic;
import com.example.backend.model.HeatPump;
import com.example.backend.payload.request.GeothermicDTO;
import com.example.backend.payload.request.HeatPumpDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class HeatPumpService {

    // Heat pump DTO -> ENTITY
    public HeatPump dto_entity(HeatPumpDTO heatPumpDTO) {

        HeatPump heatPump = new HeatPump();

        heatPump.setTitle(heatPumpDTO.getTitle());
        heatPump.setDescription(heatPumpDTO.getDescription());
        heatPump.setPower(heatPumpDTO.getPower());
        heatPump.setPrice(heatPumpDTO.getPrice());
        heatPump.setNumberOfPieces(heatPumpDTO.getNumberOfPieces());
        heatPump.setImage(heatPumpDTO.getImage());

        heatPump.setFirstElementList(heatPumpDTO.getFirstElementList());
        heatPump.setSecondElementList(heatPumpDTO.getSecondElementList());
        heatPump.setThirdElementList(heatPumpDTO.getThirdElementList());

        heatPump.setFirstIcon(heatPumpDTO.getFirstIcon());
        heatPump.setSecondIcon(heatPumpDTO.getSecondIcon());
        heatPump.setThirdIcon(heatPumpDTO.getThirdIcon());

        return  heatPump;
    }

    // Heat pump ENTITY -> DTO
    public HeatPumpDTO entity_dto(HeatPump heatPump) {

        HeatPumpDTO heatPumpDTO = new HeatPumpDTO();

        heatPumpDTO.setTitle(heatPump.getTitle());
        heatPumpDTO.setDescription(heatPump.getDescription());
        heatPumpDTO.setPower(heatPump.getPower());
        heatPumpDTO.setPrice(heatPump.getPrice());
        heatPumpDTO.setNumberOfPieces(heatPump.getNumberOfPieces());
        heatPumpDTO.setImage(heatPump.getImage());

        heatPumpDTO.setFirstElementList(heatPump.getFirstElementList());
        heatPumpDTO.setSecondElementList(heatPump.getSecondElementList());
        heatPumpDTO.setThirdElementList(heatPump.getThirdElementList());

        heatPumpDTO.setFirstIcon(heatPump.getFirstIcon());
        heatPumpDTO.setSecondIcon(heatPump.getSecondIcon());
        heatPumpDTO.setThirdIcon(heatPump.getThirdIcon());

        return heatPumpDTO;
    }
}

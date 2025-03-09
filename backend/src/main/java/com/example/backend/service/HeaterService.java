package com.example.backend.service;

import com.example.backend.model.Geothermic;
import com.example.backend.model.Heater;
import com.example.backend.payload.request.GeothermicDTO;
import com.example.backend.repository.HeaterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class HeaterService {

    @Autowired
    HeaterRepository heaterRepository;

    @Autowired
    GeothermicService geothermicService;

    // metodo che salva il geothermic nel database
public Long saveGeothermic(GeothermicDTO geothermicDTO){
    Geothermic newGeothermic = geothermicService.dto_entity(geothermicDTO);
    heaterRepository.save(newGeothermic);
    return newGeothermic.getId();
}



}



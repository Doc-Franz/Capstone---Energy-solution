package com.example.backend.service;

import com.example.backend.exception.HeaterNotFoundException;
import com.example.backend.model.*;
import com.example.backend.payload.request.CondensingBoilerDTO;
import com.example.backend.payload.request.GeothermicDTO;
import com.example.backend.payload.request.HeatPumpDTO;
import com.example.backend.payload.request.TraditionalBoilerDTO;
import com.example.backend.repository.HeaterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class HeaterService {

    @Autowired
    HeaterRepository heaterRepository;

    @Autowired
    GeothermicService geothermicService;

    @Autowired
    HeatPumpService heatPumpService;

    @Autowired
    TraditionalBoilerService traditionalBoilerService;

    @Autowired
    CondensingBoilerService condensingBoilerService;

    // metodo che salva il geothermic nel database
    public Long saveGeothermic(GeothermicDTO geothermicDTO, String productImage, String firstIconImage,
                               String secondIconImage, String thirdIconImage){
    Geothermic newGeothermic = geothermicService.dto_entity(geothermicDTO);

    // settaggio delle immagini di copertina e icone
    newGeothermic.setImage(productImage);
    newGeothermic.setFirstIcon(firstIconImage);
    newGeothermic.setSecondIcon(secondIconImage);
    newGeothermic.setThirdIcon(thirdIconImage);

    heaterRepository.save(newGeothermic);
    return newGeothermic.getId();
}

    // metodo che salva heat pump nel database
    public Long saveHeatPump(HeatPumpDTO heatPumpDTO, String productImage, String firstIconImage,
                             String secondIconImage, String thirdIconImage){
        HeatPump newHeatPump = heatPumpService.dto_entity(heatPumpDTO);

        // settaggio delle immagini di copertina e icone
        newHeatPump.setImage(productImage);
        newHeatPump.setFirstIcon(firstIconImage);
        newHeatPump.setSecondIcon(secondIconImage);
        newHeatPump.setThirdIcon(thirdIconImage);

        heaterRepository.save(newHeatPump);
        return newHeatPump.getId();
    }
    // metodo che salva traditional boiler nel database
    public Long saveTraditionalBoiler(TraditionalBoilerDTO traditionalBoilerDTO, String productImage, String firstIconImage,
                                      String secondIconImage, String thirdIconImage){
        TraditionalBoiler newTraditionalBoiler = traditionalBoilerService.dto_entity(traditionalBoilerDTO);

        // settaggio delle immagini di copertina e icone
        newTraditionalBoiler.setImage(productImage);
        newTraditionalBoiler.setFirstIcon(firstIconImage);
        newTraditionalBoiler.setSecondIcon(secondIconImage);
        newTraditionalBoiler.setThirdIcon(thirdIconImage);

        heaterRepository.save(newTraditionalBoiler);
        return newTraditionalBoiler.getId();
    }
    // metodo che salva condensing boiler nel database
    public Long saveCondensingBoiler(CondensingBoilerDTO condensingBoilerDTO, String productImage, String firstIconImage,
                                     String secondIconImage, String thirdIconImage){
        CondensingBoiler newCondensingBoiler = condensingBoilerService.dto_entity(condensingBoilerDTO);

        // settaggio delle immagini di copertina e icone
        newCondensingBoiler.setImage(productImage);
        newCondensingBoiler.setFirstIcon(firstIconImage);
        newCondensingBoiler.setSecondIcon(secondIconImage);
        newCondensingBoiler.setThirdIcon(thirdIconImage);

        heaterRepository.save(newCondensingBoiler);
        return newCondensingBoiler.getId();
    }

    // metodo che restituisce un tipo di sistema
    public List<Heater> getByHeaterType(Class<? extends Heater> heaterClass) {
         return  heaterRepository.findBydiscriminatorType(heaterClass);
    }


}



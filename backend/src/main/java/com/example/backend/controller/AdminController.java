package com.example.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.payload.request.CondensingBoilerDTO;
import com.example.backend.payload.request.GeothermicDTO;
import com.example.backend.payload.request.HeatPumpDTO;
import com.example.backend.payload.request.TraditionalBoilerDTO;
import com.example.backend.service.HeaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")

public class AdminController {

    @Autowired
    HeaterService heaterService;

    @Autowired
    Cloudinary cloudinary;

    // ❗❗❗ metodo per testare il login con ADMIN
    @GetMapping("/prova")
    public ResponseEntity<String> metodoDiProva() {
        return new ResponseEntity<>("Il metodo sta funzionando!!!", HttpStatus.OK);
    }

    // POST per sistema geotermico
    @PostMapping("/geothermic")
    public ResponseEntity<Map<String, String>> saveGeothermic(@Validated @RequestPart("product") GeothermicDTO geothermicDTO,
                                                          BindingResult validation, @RequestPart("image") MultipartFile imageProduct,
                                                          @RequestPart(name = "firstIcon", required = false) MultipartFile firstIcon,
                                                          @RequestPart(name = "secondIcon", required = false) MultipartFile secondIcon,
                                                          @RequestPart(name = "thirdIcon", required = false) MultipartFile thirdIcon) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if (validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for (ObjectError error : validation.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(imageProduct.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine del prodotto
            String urlImageProduct = mapUpload.get("secure_url").toString();

            // Controlla e carica la prima icona, se presente
            String urlFirstIcon = (firstIcon != null && !firstIcon.isEmpty())
                    ? cloudinary.uploader().upload(firstIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la seconda icona, se presente
            String urlSecondIcon = (secondIcon != null && !secondIcon.isEmpty())
                    ? cloudinary.uploader().upload(secondIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la terza icona, se presente
            String urlThirdIcon = (thirdIcon != null && !thirdIcon.isEmpty())
                    ? cloudinary.uploader().upload(thirdIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;


            // salvo il nuovo user e associo l'avatar
            long newGeothermicId = heaterService.saveGeothermic(geothermicDTO, urlImageProduct, urlFirstIcon, urlSecondIcon, urlThirdIcon);

            response.put("Salvataggio effettuato", "Sistema geotermico con Id " + newGeothermicId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //POST per sistema a pompa di calore
    @PostMapping("/heatPump")
    public ResponseEntity<Map<String, String>> saveHeatPump(@Validated @RequestPart("product") HeatPumpDTO heatPumpDTO,
                                                          BindingResult validation, @RequestPart("image") MultipartFile imageProduct,
                                                          @RequestPart(name = "firstIcon", required = false) MultipartFile firstIcon,
                                                          @RequestPart(name = "secondIcon", required = false) MultipartFile secondIcon,
                                                          @RequestPart(name = "thirdIcon", required = false) MultipartFile thirdIcon) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if (validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for (ObjectError error : validation.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(imageProduct.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine del prodotto
            String urlImageProduct = mapUpload.get("secure_url").toString();

            // Controlla e carica la prima icona, se presente
            String urlFirstIcon = (firstIcon != null && !firstIcon.isEmpty())
                    ? cloudinary.uploader().upload(firstIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la seconda icona, se presente
            String urlSecondIcon = (secondIcon != null && !secondIcon.isEmpty())
                    ? cloudinary.uploader().upload(secondIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la terza icona, se presente
            String urlThirdIcon = (thirdIcon != null && !thirdIcon.isEmpty())
                    ? cloudinary.uploader().upload(thirdIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;


            // salvo il nuovo user e associo l'avatar
            long newHeatPumpId = heaterService.saveHeatPump(heatPumpDTO, urlImageProduct, urlFirstIcon, urlSecondIcon, urlThirdIcon);

            response.put("Salvataggio effettuato", "Sistema in pompa di calore con Id " + newHeatPumpId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //POST per sistema a caldaia tradizionale
    @PostMapping("/traditionalBoiler")
    public ResponseEntity<Map<String, String>> saveTraditionalBoiler(@Validated @RequestPart("product") TraditionalBoilerDTO traditionalBoilerDTO,
                                                            BindingResult validation, @RequestPart("image") MultipartFile imageProduct,
                                                            @RequestPart(name = "firstIcon", required = false) MultipartFile firstIcon,
                                                            @RequestPart(name = "secondIcon", required = false) MultipartFile secondIcon,
                                                            @RequestPart(name = "thirdIcon", required = false) MultipartFile thirdIcon) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if (validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for (ObjectError error : validation.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(imageProduct.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine del prodotto
            String urlImageProduct = mapUpload.get("secure_url").toString();

            // Controlla e carica la prima icona, se presente
            String urlFirstIcon = (firstIcon != null && !firstIcon.isEmpty())
                    ? cloudinary.uploader().upload(firstIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la seconda icona, se presente
            String urlSecondIcon = (secondIcon != null && !secondIcon.isEmpty())
                    ? cloudinary.uploader().upload(secondIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la terza icona, se presente
            String urlThirdIcon = (thirdIcon != null && !thirdIcon.isEmpty())
                    ? cloudinary.uploader().upload(thirdIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;


            // salvo il nuovo user e associo l'avatar
            long newTraditionalBoilerId = heaterService.saveTraditionalBoiler(traditionalBoilerDTO, urlImageProduct, urlFirstIcon, urlSecondIcon, urlThirdIcon);

            response.put("Salvataggio effettuato", "Sistema con caldaia tradizionale con Id " + newTraditionalBoilerId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //POST per sistema a caldaia a condensazione
    @PostMapping("/condensingBoiler")
    public ResponseEntity<Map<String, String>> saveCondensingBoiler(@Validated @RequestPart("product") CondensingBoilerDTO condensingBoilerDTO,
                                                                     BindingResult validation, @RequestPart("image") MultipartFile imageProduct,
                                                                     @RequestPart(name = "firstIcon", required = false) MultipartFile firstIcon,
                                                                     @RequestPart(name = "secondIcon", required = false) MultipartFile secondIcon,
                                                                     @RequestPart(name = "thirdIcon", required = false) MultipartFile thirdIcon) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if (validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for (ObjectError error : validation.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(imageProduct.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine del prodotto
            String urlImageProduct = mapUpload.get("secure_url").toString();

            // Controlla e carica la prima icona, se presente
            String urlFirstIcon = (firstIcon != null && !firstIcon.isEmpty())
                    ? cloudinary.uploader().upload(firstIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la seconda icona, se presente
            String urlSecondIcon = (secondIcon != null && !secondIcon.isEmpty())
                    ? cloudinary.uploader().upload(secondIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;

            // Controlla e carica la terza icona, se presente
            String urlThirdIcon = (thirdIcon != null && !thirdIcon.isEmpty())
                    ? cloudinary.uploader().upload(thirdIcon.getBytes(), ObjectUtils.emptyMap()).get("secure_url").toString()
                    : null;


            // salvo il nuovo user e associo l'avatar
            long newCondensingBoilerId = heaterService.saveCondensingBoiler(condensingBoilerDTO, urlImageProduct, urlFirstIcon, urlSecondIcon, urlThirdIcon);

            response.put("Salvataggio effettuato", "Sistema con caldaia a condensazione con Id " + newCondensingBoilerId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

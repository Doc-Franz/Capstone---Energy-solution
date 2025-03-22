package com.example.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.exception.*;
import com.example.backend.model.*;
import com.example.backend.payload.request.LoginRequest;
import com.example.backend.payload.request.RegistrationRequest;
import com.example.backend.payload.response.LoginResponse;
import com.example.backend.repository.HeaterRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.HeaterService;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")

public class UserController {

    @Value("${stripe.secretKey}")
    String secretKey;

    @Value("${stripe.publishableKey}")
    String publishableKey;

    @Autowired
    Cloudinary cloudinary;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HeaterRepository heaterRepository;

    @Autowired
    HeaterService heaterService;

    @Autowired
    TransactionService transactionService;

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> userRegistration(@RequestPart("user") @Validated RegistrationRequest registrationRequest,
                                                                BindingResult validation, @RequestPart("avatar")MultipartFile avatar) {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        if(validation.hasErrors()) {

            StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

            for(ObjectError error : validation.getAllErrors()){
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }

            response.put("Errore", errorMessage.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        try {

            // invio immagine al servizio Cloudinary
            Map mapUpload = cloudinary.uploader().upload(avatar.getBytes(), ObjectUtils.emptyMap());

            // salvo l'indirizzo dell'immagine
            String urlImage = mapUpload.get("secure_url").toString();

            // salvo il nuovo user e associo l'avatar
            long newUserId = userService.saveUser(registrationRequest, urlImage);

            response.put("Salvataggio effettuato", "Utente con Id " + newUserId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (EmailDuplicatedException | UsernameDuplicatedException ex){
            response.put("Errore", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Validated @RequestBody LoginRequest loginRequest, BindingResult validation){

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        try {
            if(validation.hasErrors()) {

                StringBuilder errorMessage = new StringBuilder("Problema nella validazione dei dati: \n");

                for(ObjectError error : validation.getAllErrors()){
                    errorMessage.append(error.getDefaultMessage()).append("\n");
                }

                response.put("Errore", errorMessage.toString());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

            }

            LoginResponse loginResponse = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

            response.put("username", loginRequest.getUsername());
            response.put("token" , loginResponse.getToken());

            response.put("avatar", userService.getAvatarByUsername(loginRequest.getUsername()));
            response.put("id", String.valueOf(userRepository.findByUsername(loginRequest.getUsername()).orElseThrow().getId()));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception ex) {
            response.put("Credenziali non valide", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    // GET dall barra di ricerca
    @GetMapping("/search")
    public ResponseEntity<?> findProductBySearch(@RequestParam("search") String search) {
        try {
            List<Heater> heaterList = heaterService.getHeaterBySearch(search);

            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET di tutti i prodotti
   /* @GetMapping("/allProducts")
    public ResponseEntity<?> getAllProducts() {

        try {
            List<Heater> heaterList = heaterRepository.findAll();

            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }*/

    @GetMapping("/allProducts")
    public ResponseEntity<?> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "12") int size,
                                            @RequestParam(defaultValue = "id") String sortBy) {

        try {
            Page<Heater> heaterPage = heaterService.getAllProducts(page, size, sortBy);

            if (heaterPage.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterPage, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET che restituisce tutti i prodotti acquistati dall'utente
    @GetMapping("/quotes/{userId}")
    public ResponseEntity<?> getQuotesByUser(@PathVariable int userId) {

        try {
            List<Transaction> transactionList = transactionService.getTransactionsWithHeaterByUserId(userId);

            if (transactionList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema acquistato");
            }

            return new ResponseEntity<>(transactionList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET di tutti i prodotti con potenza maggiore di quella calcolata nel building evaluation
    @GetMapping("/preventiveProducts")
    public ResponseEntity<?> getAllProductsGreaterThanPower(@RequestParam("power") int power, @RequestParam("type") String type) {

        try {

            Class<? extends Heater> heaterClass;
            switch (type) {
                case "CondensingBoiler":
                    heaterClass = CondensingBoiler.class;
                    break;
                case "Geothermic":
                    heaterClass = Geothermic.class;
                    break;
                case "HeatPump":
                    heaterClass = HeatPump.class;
                    break;
                case "TraditionalBoiler":
                    heaterClass = TraditionalBoiler.class;
                    break;
                default:
                    heaterClass = Heater.class;
            }

            List<Heater> heaterList = new ArrayList<>();

            // ricerco tutte le macchina con potenza maggiore di quella calcolata e minore della potenza calcolata * 1.6
            // se la potenza calcolata è minore di 10 kW imposto la potenza minima di ricerca a 10 kW
            if (power > 10)
            {
                heaterList = heaterService.getByPowerandType(heaterClass, power, (int) (power * 1.6));
            }
            else {
                int minPower = 10;
                heaterList = heaterService.getByPowerandType(heaterClass, minPower, (int) (minPower * 1.6));
            }

            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET dei sistemi geotermici
    @GetMapping("/geothermic")
    public ResponseEntity<?> getGeothermic() {

        try {
            List<Heater> heaterList = heaterService.getByHeaterType(Geothermic.class);
            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET dei sistemi in pompa di calore
    @GetMapping("/heatPump")
    public ResponseEntity<?> getHeatPump() {

        try {
            List<Heater> heaterList = heaterService.getByHeaterType(HeatPump.class);
            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET dei sistemi con caldaia a condensazione
    @GetMapping("/condensingBoiler")
    public ResponseEntity<?> getCondensingBoiler() {

        try {
            List<Heater> heaterList = heaterService.getByHeaterType(CondensingBoiler.class);
            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // GET dei sistemi con caldaia tradizionale
    @GetMapping("/traditionalBoiler")
    public ResponseEntity<?> getTraditionalBoiler() {

        try {
            List<Heater> heaterList = heaterService.getByHeaterType(TraditionalBoiler.class);
            if (heaterList.isEmpty()) {
                throw new HeaterNotFoundException("Nessun sistema trovato");
            }

            return new ResponseEntity<>(heaterList, HttpStatus.OK);
        } catch (HeaterNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // metodo per aggiungere un heater a uno user
    @PostMapping("buyProduct/{username}/{heaterId}")
    public ResponseEntity<?> buyHeater (@PathVariable String username, @PathVariable long heaterId) throws StripeException {

        // oggetto convertibile in formato JSON
        Map<String, String> response = new HashMap<>();

        // ricerco l'utente tramite username
        User user = userRepository.findByUsername(username).orElseThrow();

        // ricerco l'heater tramite ID
        Heater heater = heaterRepository.findById(heaterId).orElseThrow();

        try {

                if (heater.getNumberOfPieces() > 0) {

                    // viene generato l'oggetto Customer che avrà accesso al pagamento
                    Stripe.apiKey = secretKey;
                    CustomerCreateParams customerParams = CustomerCreateParams.builder().setName(user.getUsername()).setEmail(user.getEmail()).build();
                    Customer customer = Customer.create(customerParams);

                    // generazione di una sessione di checkout per il reindirizzamento del pagamento sulla pagina di Stripe
                    SessionCreateParams sessionParams = SessionCreateParams.builder()
                            .setSuccessUrl("http://localhost:5173/success")
                            .setCancelUrl("http://localhost:5173/cancel")
                            .setCustomer(customer.getId())
                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setQuantity(1L)
                                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("eur")
                                                    .setUnitAmount((long) (heater.getPrice() * 100)) // Prezzo in centesimi
                                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(heater.getTitle())
                                                            .setDescription(heater.getDescription())
                                                            .build())
                                                    .build())
                                            .build()
                            )
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .build();
                    Session session = Session.create(sessionParams);

                    user.getHeaterList().add(heater);

                    // aggiornamento dei pezzi a magazzino
                    heater.reduceNumberOfPieces();

                    // Persistenza
                    userRepository.save(user);
                    heaterRepository.save(heater);

                    response.put("message", "Acquisto andato a buon fine!");
                    response.put("id", session.getId());
                    response.put("publishableKey", publishableKey);
                    // response.put("clientSecret", paymentIntent.getClientSecret());

                    // salvataggio della transazione
                    Transaction transaction = new Transaction(session.getId(), user, heater);
                    transactionService.saveTransaction(transaction);

                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    throw new ProductOutOfStockException("Siamo spiacenti ma il prodotto è esaurito");
                }


        } catch (ProductOutOfStockException ex) {
            response.put("message", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

    }
}

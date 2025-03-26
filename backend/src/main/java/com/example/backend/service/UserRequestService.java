package com.example.backend.service;

import com.example.backend.model.UserRequest;
import com.example.backend.payload.request.UserRequestDTO;
import com.example.backend.repository.UserRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional

public class UserRequestService {

    @Autowired
    UserRequestRepository userRequestRepository;

    public long saveUserRequest(UserRequestDTO userRequestDTO){
        UserRequest newUserRequest = dto_entity(userRequestDTO);

        userRequestRepository.save(newUserRequest);
        return newUserRequest.getId();
    }

    // DTO -> ENTITY
    public UserRequest dto_entity(UserRequestDTO userRequestDTO) {
        UserRequest userRequest = new UserRequest();

        userRequest.setObject(userRequestDTO.getObject());
        userRequest.setTextArea(userRequestDTO.getTextArea());
        userRequest.setFirstName(userRequestDTO.getFirstName());
        userRequest.setLastName(userRequestDTO.getLastName());
        userRequest.setEmail(userRequestDTO.getEmail());
        userRequest.setCity(userRequestDTO.getCity());
        userRequest.setPhoneNumber(userRequestDTO.getPhoneNumber());

        return userRequest;

    }

    // ENTITY -> DTO
    public UserRequestDTO entity_dto(UserRequest userRequest) {
        UserRequestDTO userRequestDTO = new UserRequestDTO();

        userRequestDTO.setObject(userRequest.getObject());
        userRequestDTO.setTextArea(userRequest.getTextArea());
        userRequestDTO.setFirstName(userRequest.getFirstName());
        userRequestDTO.setLastName(userRequest.getLastName());
        userRequestDTO.setEmail(userRequest.getEmail());
        userRequestDTO.setCity(userRequest.getCity());
        userRequestDTO.setPhoneNumber(userRequest.getPhoneNumber());

        return userRequestDTO;

    }
}

package com.example.backend.service;

import com.example.backend.model.Transaction;
import com.example.backend.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional

public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    // metodo che salva la transazione
    public void saveTransaction(Transaction transaction){
        transactionRepository.save(transaction);
    }

    // metodo che recupera i dati della transazione e i dettagli dell'heater
    public List<Transaction> getTransactionsWithHeaterByUserId(int userId){
        return transactionRepository.getTransactionsWithHeaterByUserId(userId);
    }

}

package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t JOIN FETCH t.heater WHERE t.user.id = :userId")
    List<Transaction> getTransactionsWithHeaterByUserId(@Param("userId") int userId);
}

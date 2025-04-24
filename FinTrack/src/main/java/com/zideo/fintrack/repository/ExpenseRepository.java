package com.zideo.fintrack.repository;

import com.zideo.fintrack.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

    List<Expense> findByStatusAndDateBetween(String status, LocalDate startDate, LocalDate endDate);

    List<Expense> findByStatus(String status);

    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
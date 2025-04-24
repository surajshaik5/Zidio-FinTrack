package com.zideo.fintrack.service;

import com.zideo.fintrack.dto.ExpenseDTO;
import com.zideo.fintrack.dto.Status;
import com.zideo.fintrack.entities.Expense;
import com.zideo.fintrack.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<ExpenseDTO> getExpenses(String status, LocalDate startDate, LocalDate endDate) {
        List<Expense> expenses;

        if (status != null && startDate != null && endDate != null) {
            expenses = expenseRepository.findByStatusAndDateBetween(status, startDate, endDate);
        } else if (status != null) {
            expenses = expenseRepository.findByStatus(status);
        } else if (startDate != null && endDate != null) {
            expenses = expenseRepository.findByDateBetween(startDate, endDate);
        } else {
            expenses = expenseRepository.findAll();
        }

        return expenses.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ExpenseDTO createExpense(ExpenseDTO expenseDTO) {
        Expense expense = mapToEntity(expenseDTO);
        expense.setStatus(Status.PENDING); // Fixed: Use enum value directly
        expense.setSubmittedDate(LocalDate.now());
        expense = expenseRepository.save(expense);
        return mapToDTO(expense);
    }

    public ExpenseDTO updateExpense(UUID id, ExpenseDTO expenseDTO) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
        expense.setAmount(expenseDTO.getAmount());
        expense.setDescription(expenseDTO.getDescription());
        // Set other fields here...
        expense = expenseRepository.save(expense);
        return mapToDTO(expense);
    }

    public void deleteExpense(UUID id) {
        expenseRepository.deleteById(id);
    }

    public ExpenseDTO approveExpense(UUID id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
        expense.setStatus(Status.APPROVED); // Fixed: Use enum value directly
        expense.setApprovedDate(LocalDate.now());
        // Set approvedBy field with current user or admin
        expense.setApprovedBy("Admin"); // For example
        expense = expenseRepository.save(expense);
        return mapToDTO(expense);
    }

    public ExpenseDTO rejectExpense(UUID id, String rejectionReason) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
        expense.setStatus(Status.REJECTED); // Fixed: Use enum value directly
        expense.setRejectionReason(rejectionReason);
        expense = expenseRepository.save(expense);
        return mapToDTO(expense);
    }

    private ExpenseDTO mapToDTO(Expense expense) {
        return new ExpenseDTO(
                expense.getId(),
                expense.getEmployeeId(),
                expense.getEmployeeName(),
                expense.getDepartmentId(),
                expense.getDepartmentName(),
                expense.getCategoryId(),
                expense.getCategoryName(),
                expense.getAmount(),
                expense.getDate(),
                expense.getDescription(),
                expense.getStatus().name(),
                expense.getReceiptUrl(),
                expense.getAttachments(),
                expense.getSubmittedDate(),
                expense.getApprovedBy(),
                expense.getApprovedDate(),
                expense.getRejectionReason(),
                expense.getNotes(),
                expense.getTags()
        );
    }

    private Expense mapToEntity(ExpenseDTO expenseDTO) {
        return new Expense(
                expenseDTO.getId(),
                expenseDTO.getEmployeeId(),
                expenseDTO.getEmployeeName(),
                expenseDTO.getDepartmentId(),
                expenseDTO.getDepartmentName(),
                expenseDTO.getCategoryId(),
                expenseDTO.getCategoryName(),
                expenseDTO.getAmount(),
                expenseDTO.getDate(),
                expenseDTO.getDescription(),
                Status.valueOf(expenseDTO.getStatus()),
                expenseDTO.getReceiptUrl(),
                expenseDTO.getAttachments(),
                expenseDTO.getSubmittedDate(),
                expenseDTO.getApprovedBy(),
                expenseDTO.getApprovedDate(),
                expenseDTO.getRejectionReason(),
                expenseDTO.getNotes(),
                expenseDTO.getTags()
        );
    }
}
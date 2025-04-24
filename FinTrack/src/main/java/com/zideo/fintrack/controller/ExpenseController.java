package com.zideo.fintrack.controller;

import com.zideo.fintrack.dto.ExpenseDTO;
import com.zideo.fintrack.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // List expenses with filters for status and date range
    @GetMapping
    public List<ExpenseDTO> getExpenses(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "startDate", required = false) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) LocalDate endDate) {
        return expenseService.getExpenses(status, startDate, endDate);
    }

    // Create new expense
    @PostMapping
    public ExpenseDTO createExpense(@RequestBody ExpenseDTO expenseDTO) {
        return expenseService.createExpense(expenseDTO);
    }

    // Update an existing expense
    @PutMapping("/{id}")
    public ExpenseDTO updateExpense(@PathVariable UUID id, @RequestBody ExpenseDTO expenseDTO) {
        return expenseService.updateExpense(id, expenseDTO);
    }

    // Delete an expense
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable UUID id) {
        expenseService.deleteExpense(id);
    }

    // Approve an expense
    @PutMapping("/{id}/approve")
    public ExpenseDTO approveExpense(@PathVariable UUID id) {
        return expenseService.approveExpense(id);
    }

    // Reject an expense
    @PutMapping("/{id}/reject")
    public ExpenseDTO rejectExpense(@PathVariable UUID id, @RequestParam String rejectionReason) {
        return expenseService.rejectExpense(id, rejectionReason);
    }
}

package com.zideo.fintrack.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {

    private UUID id;
    private String employeeId;
    private String employeeName;
    private String departmentId;
    private String departmentName;
    private String categoryId;
    private String categoryName;
    private Double amount;
    private LocalDate date;
    private String description;
    private String status;
    private String receiptUrl;
    private List<String> attachments;
    private LocalDate submittedDate;
    private String approvedBy;
    private LocalDate approvedDate;
    private String rejectionReason;
    private String notes;
    private List<String> tags;
}

package com.zideo.fintrack.entities;

import com.zideo.fintrack.dto.Status;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String employeeId;

    private String employeeName;

    private String departmentId;

    private String departmentName;

    private String categoryId;

    private String categoryName;

    private Double amount;

    private LocalDate date;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String receiptUrl;

    @ElementCollection
    @CollectionTable(name = "expense_attachments", joinColumns = @JoinColumn(name = "expense_id"))
    @Column(name = "attachment")
    private List<String> attachments;

    private LocalDate submittedDate;

    private String approvedBy;

    private LocalDate approvedDate;

    @Column(length = 1000)
    private String rejectionReason;

    @Column(length = 1000)
    private String notes;

    @ElementCollection
    @CollectionTable(name = "expense_tags", joinColumns = @JoinColumn(name = "expense_id"))
    @Column(name = "tag")
    private List<String> tags;




}

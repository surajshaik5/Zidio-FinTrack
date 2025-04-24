package com.zideo.fintrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String userId;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String title;

    @Column(length = 1000)
    private String message;

    private String referenceId;

    @Enumerated(EnumType.STRING)
    private ReferenceType referenceType;

    private Boolean isRead;

    private LocalDate createdAt;

    public enum NotificationType {
        EXPENSE_SUBMITTED,
        EXPENSE_APPROVED,
        EXPENSE_REJECTED,
        REMINDER,
        SYSTEM
    }

    public enum ReferenceType {
        EXPENSE,
        USER,
        DEPARTMENT
    }
}

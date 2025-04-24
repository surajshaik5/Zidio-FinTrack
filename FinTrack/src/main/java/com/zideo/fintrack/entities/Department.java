package com.zideo.fintrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    private String managerId;

    private String managerName;

    private Double budget;

    private Double budgetUsed;

    private Double budgetRemaining;

    private Integer employeeCount;

    @Column(length = 1000)
    private String description;

    private Boolean isActive;
}

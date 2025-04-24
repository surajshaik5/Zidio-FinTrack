package com.zideo.fintrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String description;

    private String icon;

    private String color;

    private Boolean isDefault;

    private Boolean isActive;

    @Embedded
    private Limit limits;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Limit {
        private Double perTransaction;
        private Double daily;
        private Double monthly;
    }
}

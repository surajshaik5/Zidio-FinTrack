package com.zideo.fintrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "users") // You can name it "employees" if that's more appropriate
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Column(unique = true, nullable = false)
    private String workId;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String department;

    private String position;

    private String profileImage; // You can store image URL or base64 string

    private String contactNumber;

    private LocalDate dateJoined;

    private Boolean isActive;

    public enum Role {
        EMPLOYEE,
        MANAGER,
        ADMIN
    }
}

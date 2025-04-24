package com.zideo.fintrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    @Embedded
    private Filters filters;

    private String createdBy;

    private LocalDate createdAt;

    private LocalDate lastGenerated;

    @Enumerated(EnumType.STRING)
    private ReportFormat format;

    private Boolean isScheduled;

    @Enumerated(EnumType.STRING)
    private ScheduleFrequency scheduleFrequency;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Filters {
        private LocalDate startDate;
        private LocalDate endDate;

        @ElementCollection
        @CollectionTable(name = "report_departments", joinColumns = @JoinColumn(name = "report_id"))
        @Column(name = "department")
        private List<String> departments;

        @ElementCollection
        @CollectionTable(name = "report_categories", joinColumns = @JoinColumn(name = "report_id"))
        @Column(name = "category")
        private List<String> categories;

        @ElementCollection
        @CollectionTable(name = "report_status", joinColumns = @JoinColumn(name = "report_id"))
        @Column(name = "status")
        private List<String> status;

        @ElementCollection
        @CollectionTable(name = "report_users", joinColumns = @JoinColumn(name = "report_id"))
        @Column(name = "user")
        private List<String> users;
    }

    public enum ReportType {
        EXPENSE,
        DEPARTMENT,
        USER,
        CATEGORY
    }

    public enum ReportFormat {
        PDF,
        EXCEL,
        CSV
    }

    public enum ScheduleFrequency {
        DAILY,
        WEEKLY,
        MONTHLY,
        QUARTERLY
    }
}

package com.zideo.fintrack.entities;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDashboardDTO {

    private Double totalExpenses;
    private Double pendingExpenses;
    private Double approvedExpenses;
    private Double rejectedExpenses;

    private Double thisMonthTotal;
    private Double lastMonthTotal;
    private Double percentageChange;

    private List<TopCategoryDTO> topCategories;
    private List<TopDepartmentDTO> topDepartments;
    private List<MonthlyBreakdownDTO> monthlyBreakdown;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TopCategoryDTO {
        private String categoryName;
        private Double amount;
        private Double percentage;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TopDepartmentDTO {
        private String departmentName;
        private Double amount;
        private Double percentage;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MonthlyBreakdownDTO {
        private String month;
        private Double expenses;
        private Double budget;
    }
}

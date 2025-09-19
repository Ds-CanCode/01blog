package com.blog_01.dto;

import java.time.LocalDateTime;

public class ReportDTO {
    private final Long id;
    private final String reason;
    private final LocalDateTime createdAt;
    private final String reporterUsername;
    private final String reportedUsername;

    public ReportDTO(Long id, String reason, LocalDateTime createdAt, String reporterUsername, String reportedUsername) {
        this.id = id;
        this.reason = reason;
        this.createdAt = createdAt;
        this.reporterUsername = reporterUsername;
        this.reportedUsername = reportedUsername;
    }

    public Long getId() { return id; }
    public String getReason() { return reason; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getReporterUsername() { return reporterUsername; }
    public String getReportedUsername() { return reportedUsername; }
}
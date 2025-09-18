package com.blog_01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.model.Report;
import com.blog_01.model.User;
import com.blog_01.repository.ReportRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ReportService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Transactional
    public void addReport(Long reporterId, Long reportedUserId, String reason) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new RuntimeException("Utilisateur reporter introuvable"));
        User reportedUser = userRepository.findById(reportedUserId)
                .orElseThrow(() -> new RuntimeException("Utilisateur cible introuvable"));

        Report report = new Report();
        report.setReporter(reporter);  
        report.setUser(reportedUser);  
        report.setReason(reason);

        reportRepository.save(report);
    }
}

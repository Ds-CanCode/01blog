package com.blog_01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.service.JwtService;
import com.blog_01.service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ReportService reportService;

    @PostMapping("/{reportedUserId}")
    public ResponseEntity<?> addReport(
            @PathVariable Long reportedUserId,
            @RequestParam("reason") String reason,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant");
        }

        String token = authHeader.substring(7);
        Long reporterId = jwtService.extractId(token);

        reportService.addReport(reporterId, reportedUserId, reason);

        return ResponseEntity.ok("Report ajouté avec succès");
    }
}

package com.blog_01.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog_01.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

}

package com.blog_01.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog_01.model.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

}
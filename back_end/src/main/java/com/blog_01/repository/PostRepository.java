package com.blog_01.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog_01.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  
  @Override
  Page<Post> findAll(Pageable pageable);
  
  @Query("SELECT DISTINCT p FROM Post p LEFT JOIN FETCH p.medias WHERE p.user.id = :userId")
  Optional<List<Post>> findPostsWithMediaByUserId(@Param("userId") Long userId);
}

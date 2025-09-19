package com.blog_01.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog_01.dto.UserLoginDTO;
import com.blog_01.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.blog_01.dto.UserLoginDTO(u.id, u.username, u.email, u.password, u.role, u.isBanned) "
            + "FROM User u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
    UserLoginDTO findLoginUser(@Param("usernameOrEmail") String usernameOrEmail);

    Optional<User> findByUsername(String username);

    User findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);
}

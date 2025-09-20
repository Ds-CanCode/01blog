package com.blog_01.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog_01.dto.UserLoginDTO;
import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    @Transactional
    public UserLoginDTO authenticateUser(String usernameOrEmail, String password) {
        UserLoginDTO user = userRepository.findLoginUser(usernameOrEmail);
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }
        if (user.getIsBanned()) {
            throw new RuntimeException("Cet utilisateur est banni");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    @Transactional
    public String loginAndGenerateToken(String usernameOrEmail, String password) {
        UserLoginDTO user = authenticateUser(usernameOrEmail, password);
        return jwtService.generateToken(user.getId(), user.getUsername(), user.getRole().name());
    }

    @Transactional
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

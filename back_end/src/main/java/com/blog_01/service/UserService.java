package com.blog_01.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        // Vérification si le username existe déjà
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Vérification si l'email existe déjà
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Sauvegarder l'utilisateur
        return userRepository.save(user);
    }

    public User authenticateUser(String usernameOrEmail, String password) {
        User user = userRepository.findByUsername(usernameOrEmail);
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    public String loginAndGenerateToken(String usernameOrEmail, String password) {
        User user = authenticateUser(usernameOrEmail, password);
        return jwtService.generateToken(user.getUsername(), user.getRole().name());
    }

    // public String loginAndGenerateToken(String usernameOrEmail, String password) {
    //     User user = login(usernameOrEmail, password);
    //     return jwtService.generateToken(user.getUsername(), user.getRole().name());
    // }
    // public User login(String usernameOrEmail, String password) {
    //     User user = userRepository.findByUsername(usernameOrEmail);
    //     if (user == null) {
    //         user = userRepository.findByEmail(usernameOrEmail);
    //     }
    //     if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
    //         throw new RuntimeException("Invalid credentials");
    //     }
    //     return user;
    // }
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

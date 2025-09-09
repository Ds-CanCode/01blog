// package com.blog_01.service;

// import com.blog_01.model.User;
// import com.blog_01.repository.UserRepository;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {

//     private final UserRepository userRepository;
//     private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//     public UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     public User register(User user) {
//         if (userRepository.existsByEmail(user.getEmail())) {
//             throw new RuntimeException("Email déjà utilisé");
//         }
//         if (userRepository.existsByUsername(user.getUsername())) {
//             throw new RuntimeException("Nom d'utilisateur déjà utilisé");
//         }
//         // Hasher le mot de passe avant sauvegarde
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         return userRepository.save(user);
//     }

//     public User login(String email, String password) {
//         User user = userRepository.findByEmail(email);
//         if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
//             throw new RuntimeException("Email ou mot de passe incorrect");
//         }
//         return user;
//     }
// }

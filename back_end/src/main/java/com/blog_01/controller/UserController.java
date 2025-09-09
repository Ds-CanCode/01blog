// package com.blog_01.controller;

// // import java.util.List;

// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// // import com.blog_01.model.User;
// // import com.blog_01.repository.UserRepository;

// @RestController
// @RequestMapping("/api/users")
// public class UserController {

//     // private final UserRepository userRepository;

//     // public UserController(UserRepository userRepository) {
//     //     this.userRepository = userRepository;
//     // }

//     // @PostMapping
//     // public User createUser(@RequestParam String username,
//     //                        @RequestParam String email,
//     //                        @RequestParam String password,
//     //                        @RequestParam("image") MultipartFile imageFile) throws IOException {

//     //     User user = new User();
//     //     user.setUsername(username);
//     //     user.setEmail(email);
//     //     user.setPasswordHash(password);
//     //     user.setRole(User.Role.USER);
//     //     user.setCreatedAt(LocalDateTime.now());
//     //     user.setIsBanned(false);

//     //     if (!imageFile.isEmpty()) {
//     //         user.setImage(imageFile.getBytes());
//     //     }

//     //     return userRepository.save(user);
//     // }

//     @GetMapping
//     public String getAllUsers() {
//         return "hello";
//     }
// }

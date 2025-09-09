// package com.blog_01.controller;


// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.blog_01.model.User;
// import com.blog_01.service.UserService;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:4200") 
// public class AuthController {

//     private final UserService userService;

//     public AuthController(UserService userService) {
//         this.userService = userService;
//     }

//     @PostMapping("/register")
//     public User register(@RequestBody User user) {
//         return userService.register(user);
//     }

//     @PostMapping("/login")
//     public User login(@RequestBody User user) {
//         return userService.login(user.getEmail(), user.getPassword());
//     }
// }


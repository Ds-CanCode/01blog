package com.blog_01.dto;
import com.blog_01.model.User.Role;

public class UserLoginDTO {

    private Long id;
    private String username;
    private String email;
    private String password;
    private Role role;
    private Boolean isBanned;

    public UserLoginDTO(Long id, String username, String email, String password, Role role, Boolean isBanned) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isBanned = isBanned;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Boolean getIsBanned() {return isBanned;}
    public void setIsBanned(Boolean isBanned) {this.isBanned = isBanned;}
}

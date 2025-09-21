package com.blog_01.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.blog_01.exception.TokenExpiredException;
import com.blog_01.exception.UnauthorizedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET = "maSuperzEBICleSecreteUltraLonguePourHS2561234567890";

    public String generateToken(Long id, String username, String role) {
        long expirationTime = 1000 * 60 * 60 * 2;

        return Jwts.builder()
                .setSubject(username)
                .claim("id", String.valueOf(id))
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Long extractId(String token) {
        return Long.valueOf(extractAllClaims(token).get("id", String.class));
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token) {
        return extractAllClaims(token).getExpiration().after(new Date());
    }

    private Claims extractAllClaims(String token) {
    try {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    } catch (ExpiredJwtException e) {
        throw new TokenExpiredException("Token expired");
    } catch (JwtException e) {
        throw new UnauthorizedException("Invalid token");
    }
}
    
}

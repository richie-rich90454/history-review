package com.richierich90454.backend.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil{

    private static final String SECRET_KEY ="YourSuperSecretKeyForJWTGenerationMustBeAtLeast256BitsLong!";
    private static final long EXPIRATION_TIME=86400000;

    private final Key key=Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    /**
     * Generates a JWT token for a user with email and role claims.
     * @param email user's email (subject)
     * @param role user's role (admin/user)
     * @return compact JWT string
     */
    public String generateToken(String email, String role){
        Date now=new Date();
        Date expiryDate=new Date(now.getTime() + EXPIRATION_TIME);
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the email (subject) from a JWT token.
     * @param token JWT token string
     * @return email address
     */
    public String getEmailFromToken(String token){
        return parseClaims(token).getSubject();
    }

    /**
     * Extracts the role claim from a JWT token.
     * @param token JWT token string
     * @return role string
     */
    public String getRoleFromToken(String token){
        return parseClaims(token).get("role", String.class);
    }

    private Claims parseClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Validates a JWT token's signature and expiration.
     * @param token JWT token string
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token){
        try{
            parseClaims(token);
            return true;
        }
        catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }
}
package com.richierich90454.backend.controller;

import com.richierich90454.backend.dto.AuthResponse;
import com.richierich90454.backend.dto.LoginRequest;
import com.richierich90454.backend.dto.RegisterRequest;
import com.richierich90454.backend.security.JwtUtil;
import com.richierich90454.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController{

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil){
        this.authService=authService;
        this.jwtUtil=jwtUtil;
    }

    /**
     * Registers a new user with default role 'user' and returns a JWT token.
     * @param request registration request containing email and password
     * @return AuthResponse containing JWT token, email, and role
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        String token=authService.register(request);
        String email=jwtUtil.getEmailFromToken(token);
        String role=jwtUtil.getRoleFromToken(token);
        return ResponseEntity.ok(new AuthResponse(token, email, role));
    }

    /**
     * Authenticates a user and returns a JWT token upon successful login.
     * @param request login request containing email and password
     * @return AuthResponse containing JWT token, email, and role
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        String token=authService.login(request);
        String email=jwtUtil.getEmailFromToken(token);
        String role=jwtUtil.getRoleFromToken(token);
        return ResponseEntity.ok(new AuthResponse(token, email, role));
    }
}
package com.richierich90454.backend.service;

import com.richierich90454.backend.dto.LoginRequest;
import com.richierich90454.backend.dto.RegisterRequest;
import com.richierich90454.backend.model.User;
import com.richierich90454.backend.repository.UserRepository;
import com.richierich90454.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtUtil=jwtUtil;
    }

    /**
     * Registers a new user with encrypted password and default role 'user'.
     * @param request registration data
     * @return generated JWT token for the new user
     * @throws RuntimeException if email already exists
     */
    public String register(RegisterRequest request){
        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already registered");
        }
        User user=new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole("user");
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    /**
     * Authenticates a user by email and password.
     * @param request login credentials
     * @return JWT token upon successful authentication
     * @throws RuntimeException if credentials are invalid
     */
    public String login(LoginRequest request){
        User user=userRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}
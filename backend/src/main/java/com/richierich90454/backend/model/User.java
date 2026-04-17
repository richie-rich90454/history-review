package com.richierich90454.backend.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String email;

    @Column(nullable=false)
    private String passwordHash;

    @Column(nullable=false)
    private String role;

    @Column(nullable=false)
    private LocalDateTime createdAt;

    public User(){}

    public User(String email, String passwordHash, String role){
        this.email=email;
        this.passwordHash=passwordHash;
        setRole(role);
        this.createdAt=LocalDateTime.now();
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getPasswordHash(){
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash){
        this.passwordHash=passwordHash;
    }

    public String getRole(){
        return role;
    }

    public void setRole(String role){
        if ("admin".equals(role)||"user".equals(role)){
            this.role=role;
        }
        else{
            throw new IllegalArgumentException("Role must be 'admin' or 'user'");
        }
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }

    /**
     * Sets the creation timestamp.
     * @param createdAt the timestamp to set
     */
    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt=createdAt;
    }
}
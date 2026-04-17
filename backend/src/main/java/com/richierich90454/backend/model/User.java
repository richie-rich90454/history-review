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
    public User(){

    }
    public User(String email, String passwordHash, String role){
        this.email=new String(email);
        this.passwordHash=new String(passwordHash);
        setRole(role);
        this.createdAt=LocalDateTime.now();
    }
    public Long getID(){
        return Long.valueOf(id);
    }
    public String getEmail(){
        return new String(email);
    }
    public String getPasswordHash(){
        return new String(passwordHash);
    }
    public String getRole(){
        return new String(role);
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setID(Long id){
        this.id=Long.valueOf(id);
    }
    public void setEmail(String email){
        this.email=new String(email);
    }
    public void setPasswordHash(String passwordHash){
        this.passwordHash=new String(passwordHash);
    }
    public void setRole(String role){
        if (role.equals("admin")||role.equals("user")){
            this.role=new String(role);
        }
        else{
            throw new IllegalArgumentException("Role must be 'admin' or 'user'");
        }
    }
}
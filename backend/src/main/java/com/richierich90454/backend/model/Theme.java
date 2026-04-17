package com.richierich90454.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="themes")
public class Theme{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    private String description;

    @OneToMany(mappedBy="theme")
    private List<Evidence> evidenceList=new ArrayList<>();

    public Theme(){
    }

    public Theme(String name, String description){
        this.name=name;
        this.description=description;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public List<Evidence> getEvidenceList(){
        return evidenceList;
    }

    public void setEvidenceList(List<Evidence> evidenceList){
        this.evidenceList=evidenceList;
    }
}
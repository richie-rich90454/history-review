package com.richierich90454.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="people")
public class Person{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    private Integer birthYear;
    private Integer deathYear;

    @Column(length=100000)
    private String biography;

    @ManyToOne
    @JoinColumn(name="civilization_id")
    private Civilization civilization;

    public Person(){
    }

    public Person(String name, Integer birthYear, Integer deathYear, String biography){
        this.name=name;
        this.birthYear=birthYear;
        this.deathYear=deathYear;
        this.biography=biography;
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

    public Integer getBirthYear(){
        return birthYear;
    }

    public void setBirthYear(Integer birthYear){
        this.birthYear=birthYear;
    }

    public Integer getDeathYear(){
        return deathYear;
    }

    public void setDeathYear(Integer deathYear){
        this.deathYear=deathYear;
    }

    public String getBiography(){
        return biography;
    }

    public void setBiography(String biography){
        this.biography=biography;
    }

    public Civilization getCivilization(){
        return civilization;
    }

    public void setCivilization(Civilization civilization){
        this.civilization=civilization;
    }
}
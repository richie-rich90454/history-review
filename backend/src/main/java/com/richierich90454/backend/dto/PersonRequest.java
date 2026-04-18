package com.richierich90454.backend.dto;

public class PersonRequest{
    private String name;
    private Integer birthYear;
    private Integer deathYear;
    private String biography;
    private Long civilizationId;

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

    public Long getCivilizationId(){
        return civilizationId;
    }

    public void setCivilizationId(Long civilizationId){
        this.civilizationId=civilizationId;
    }
}
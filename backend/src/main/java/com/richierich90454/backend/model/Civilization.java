package com.richierich90454.backend.model;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="civilizations")
public class Civilization{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(length=200000)
    private String overview;

    private Integer startYear;
    private Integer endYear;

    @ManyToOne
    @JoinColumn(name="period_id")
    private Period period;

    @OneToMany(mappedBy="civilization", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Evidence> evidenceList=new ArrayList<>();

    @OneToMany(mappedBy="civilization", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Event> events=new ArrayList<>();

    @OneToMany(mappedBy="civilization", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Person> people=new ArrayList<>();

    public Civilization(){
    }

    public Civilization(String name, String overview, Integer startYear, Integer endYear){
        this.name=name;
        this.overview=overview;
        this.startYear=startYear;
        this.endYear=endYear;
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

    public String getOverview(){
        return overview;
    }

    public void setOverview(String overview){
        this.overview=overview;
    }

    public Integer getStartYear(){
        return startYear;
    }

    public void setStartYear(Integer startYear){
        this.startYear=startYear;
    }

    public Integer getEndYear(){
        return endYear;
    }

    public void setEndYear(Integer endYear){
        this.endYear=endYear;
    }

    public Period getPeriod(){
        return period;
    }

    public void setPeriod(Period period){
        this.period=period;
    }

    public List<Evidence> getEvidenceList(){
        return evidenceList;
    }

    public void setEvidenceList(List<Evidence> evidenceList){
        this.evidenceList=evidenceList;
    }

    public List<Event> getEvents(){
        return events;
    }

    public void setEvents(List<Event> events){
        this.events=events;
    }

    public List<Person> getPeople(){
        return people;
    }

    public void setPeople(List<Person> people){
        this.people=people;
    }
}
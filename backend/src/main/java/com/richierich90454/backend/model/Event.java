package com.richierich90454.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="events")
public class Event implements Comparable<Event>{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    private Integer year;

    @Column(length=200000)
    private String description;

    private String significance;

    @ManyToOne
    @JoinColumn(name="period_id")
    private Period period;

    @ManyToOne
    @JoinColumn(name="civilization_id")
    private Civilization civilization;

    @OneToMany(mappedBy="event", cascade=CascadeType.ALL, orphanRemoval=true)
    @JsonIgnore
    private List<Evidence> evidence=new ArrayList<>();

    @Column(nullable=false)
    private String status="PENDING";

    public Event(){
    }

    public Event(String name, Integer year, String description, String significance){
        this.name=name;
        this.year=year;
        this.description=description;
        this.significance=significance;
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

    public Integer getYear(){
        return year;
    }

    public void setYear(Integer year){
        this.year=year;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public String getSignificance(){
        return significance;
    }

    public void setSignificance(String significance){
        this.significance=significance;
    }

    public Period getPeriod(){
        return period;
    }

    public void setPeriod(Period period){
        this.period=period;
    }

    public Civilization getCivilization(){
        return civilization;
    }

    public void setCivilization(Civilization civilization){
        this.civilization=civilization;
    }

    public List<Evidence> getEvidence(){
        return evidence;
    }

    public void setEvidence(List<Evidence> evidence){
        this.evidence=evidence;
    }

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status=status;
    }

    @Override
    public int compareTo(Event other){
        return this.year.compareTo(other.year);
    }
}
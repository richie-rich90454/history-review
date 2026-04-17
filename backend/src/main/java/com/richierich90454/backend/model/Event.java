package com.richierich90454.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

    @Override
    public int compareTo(Event other){
        return this.year.compareTo(other.year);
    }
}
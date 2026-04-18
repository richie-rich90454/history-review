package com.richierich90454.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="periods")
public class Period{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    private Integer startYear;
    private Integer endYear;

    @Column(length=100000)
    private String overview;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    @JsonIgnore
    @OneToMany(mappedBy="period", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Event> events=new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy="period", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Civilization> civilizations=new ArrayList<>();

    public Period(){
    }

    public Period(String title, Integer startYear, Integer endYear, String overview){
        this.title=title;
        this.startYear=startYear;
        this.endYear=endYear;
        this.overview=overview;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title=title;
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

    public String getOverview(){
        return overview;
    }

    public void setOverview(String overview){
        this.overview=overview;
    }

    public Course getCourse(){
        return course;
    }

    public void setCourse(Course course){
        this.course=course;
    }

    public List<Event> getEvents(){
        return events;
    }

    public void setEvents(List<Event> events){
        this.events=events;
    }

    public List<Civilization> getCivilizations(){
        return civilizations;
    }

    public void setCivilizations(List<Civilization> civilizations){
        this.civilizations=civilizations;
    }

    public void addEvent(Event event){
        events.add(event);
        event.setPeriod(this);
    }

    public void removeEvent(Event event){
        events.remove(event);
        event.setPeriod(null);
    }
}
package com.richierich90454.backend.model;

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

    @Column(length=1000000)
    private String overview;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    @OneToMany(mappedBy="period", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Event> events=new ArrayList<>();

    public Period(){

    }
    public Period(String title, Integer startYear, Integer endYear, String overview){
        this.title=new String(title);
        this.startYear=Integer.valueOf(startYear);
        this.endYear=Integer.valueOf(endYear);
        this.overview=new String(overview);
    }
    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }
    public String getTitle(){
        return new String(title);
    }
    public void setTitle(String title){
        this.title=new String(title);
    }
    public Integer getStartYear(){
        return (Integer) Integer.valueOf(startYear);
    }
    public void setStartYear(Integer startYear){
        this.startYear=Integer.valueOf(startYear);
    }
    public Integer getEndYear(){
        return Integer.valueOf(endYear);
    }
    public void setEndYear(Integer endYear){
        this.endYear=Integer.valueOf(endYear);
    }
    public String getOverview(){
        return new String(overview);
    }
    public void setOverview(String overview){
        this.overview=new String(overview);
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
    public void addEvent(Event event){
        events.add(event);
        event.setPeriod(this);
    }
    public void removeEvent(Event event){
        events.remove(event);
        event.setPeriod(null);
    }
}
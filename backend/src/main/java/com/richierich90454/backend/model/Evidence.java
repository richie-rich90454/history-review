package com.richierich90454.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="evidence")
public class Evidence{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    @Column(length=20000)
    private String description;

    @ManyToOne
    @JoinColumn(name="theme_id")
    private Theme theme;

    private String type;

    @ManyToOne
    @JoinColumn(name="civilization_id")
    private Civilization civilization;

    @ManyToOne
    @JoinColumn(name="event_id")
    private Event event;

    private String source;

    @Column(length=500)
    private String significance;

    @Column(nullable=false)
    private String status="PENDING";

    public Evidence(){
    }

    public Evidence(String title, String description, Theme theme, String type, Civilization civilization){
        this.title=title;
        this.description=description;
        this.theme=theme;
        this.type=type;
        this.civilization=civilization;
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

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public Theme getTheme(){
        return theme;
    }

    public void setTheme(Theme theme){
        this.theme=theme;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type=type;
    }

    public Civilization getCivilization(){
        return civilization;
    }

    public void setCivilization(Civilization civilization){
        this.civilization=civilization;
    }

    public Event getEvent(){
        return event;
    }

    public void setEvent(Event event){
        this.event=event;
    }

    public String getSource(){
        return source;
    }

    public void setSource(String source){
        this.source=source;
    }

    public String getSignificance(){
        return significance;
    }

    public void setSignificance(String significance){
        this.significance=significance;
    }

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status=status;
    }
}
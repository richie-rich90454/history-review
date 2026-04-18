package com.richierich90454.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="courses")
public class Course{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @Column(length=500000)
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy="course", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Period> periods=new ArrayList<>();

    public Course(){

    }

    public Course(String name, String description){
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

    public List<Period> getPeriods(){
        return periods;
    }

    public void setPeriods(List<Period> periods){
        this.periods=periods;
    }

    public void addPeriod(Period period){
        periods.add(period);
        period.setCourse(this);
    }

    public void removePeriod(Period period){
        periods.remove(period);
        period.setCourse(null);
    }
}
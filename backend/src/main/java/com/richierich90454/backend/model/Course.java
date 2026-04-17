package com.richierich90454.backend.model;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
    @OneToMany(mappedBy="course", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Period> periods=new ArrayList<>();
    private Course(){

    }
    public Course(String name, String description){
        this.name=new String(name);
        this.description=new String(description);
    }
    public String getName(){
        return new String(name);
    }
    public String getDescription(){
        return new String(description);
    }
    public Long getID(){
        return Long.valueOf(id);
    }
    public List<Period> getPeriods(){
        return new ArrayList<Period>(periods);
    }
    public void setId(Long id){
        this.id=Long.valueOf(id);
    }
    public void setName(String name){
        this.name=new String(name);
    }
    public void setDescription(String description){
        this.description=new String(description);
    }
    public void setPeriods(List<Period> periods){
        this.periods=new ArrayList<Period>(periods);
    }
    public void addPeriod(Period period) {
        periods.add(period);
        period.setCourse(this);
    }
    public void removePeriod(Period period){
        periods.remove(period);
        period.setCourse(null);
    }
}
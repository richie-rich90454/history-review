package com.richierich90454.backend.dto;

public class EventRequest{
    private String name;
    private Integer year;
    private String description;
    private String significance;
    private Long periodId;
    private Long civilizationId;

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

    public Long getPeriodId(){
        return periodId;
    }

    public void setPeriodId(Long periodId){
        this.periodId=periodId;
    }

    public Long getCivilizationId(){
        return civilizationId;
    }

    public void setCivilizationId(Long civilizationId){
        this.civilizationId=civilizationId;
    }
}
package com.richierich90454.backend.dto;

public class CivilizationRequest{
    private String name;
    private String overview;
    private Integer startYear;
    private Integer endYear;
    private Long periodId;

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

    public Long getPeriodId(){
        return periodId;
    }

    public void setPeriodId(Long periodId){
        this.periodId=periodId;
    }
}
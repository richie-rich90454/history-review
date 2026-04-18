package com.richierich90454.backend.dto;

public class PeriodRequest{
    private String title;
    private Integer startYear;
    private Integer endYear;
    private String overview;
    private Long courseId;

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

    public Long getCourseId(){
        return courseId;
    }

    public void setCourseId(Long courseId){
        this.courseId=courseId;
    }
}
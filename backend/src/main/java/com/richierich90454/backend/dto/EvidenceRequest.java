package com.richierich90454.backend.dto;

public class EvidenceRequest{
    private String title;
    private String description;
    private String type;
    private String source;
    private String significance;
    private Long civilizationId;
    private Long themeId;
    private Long eventId;

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

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type=type;
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

    public Long getCivilizationId(){
        return civilizationId;
    }

    public void setCivilizationId(Long civilizationId){
        this.civilizationId=civilizationId;
    }

    public Long getThemeId(){
        return themeId;
    }

    public void setThemeId(Long themeId){
        this.themeId=themeId;
    }

    public Long getEventId(){
        return eventId;
    }

    public void setEventId(Long eventId){
        this.eventId=eventId;
    }
}
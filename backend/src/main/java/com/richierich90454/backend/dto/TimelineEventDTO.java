package com.richierich90454.backend.dto;

import com.richierich90454.backend.model.*;
import java.util.List;
import java.util.stream.Collectors;

public class TimelineEventDTO{
    private Long id;
    private String name;
    private Integer year;
    private String description;
    private String significance;
    private CivilizationDTO civilization;
    private List<PersonDTO> people;
    private List<EvidenceDTO> evidence;

    public TimelineEventDTO(Event event){
        this.id=event.getId();
        this.name=event.getName();
        this.year=event.getYear();
        this.description=event.getDescription();
        this.significance=event.getSignificance();
        if (event.getCivilization() != null){
            this.civilization=new CivilizationDTO(event.getCivilization());
            this.people=event.getCivilization().getPeople().stream()
                    .filter(p -> "APPROVED".equals(p.getStatus()))
                    .map(PersonDTO::new)
                    .collect(Collectors.toList());
        }
        this.evidence=event.getEvidence().stream()
                .filter(e -> "APPROVED".equals(e.getStatus()))
                .map(EvidenceDTO::new)
                .collect(Collectors.toList());
    }

    public Long getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public Integer getYear(){
        return year;
    }

    public String getDescription(){
        return description;
    }

    public String getSignificance(){
        return significance;
    }

    public CivilizationDTO getCivilization(){
        return civilization;
    }

    public List<PersonDTO> getPeople(){
        return people;
    }

    public List<EvidenceDTO> getEvidence(){
        return evidence;
    }

    public static class CivilizationDTO{
        private Long id;
        private String name;
        private String overview;
        private Integer startYear;
        private Integer endYear;

        public CivilizationDTO(Civilization c){
            this.id=c.getId();
            this.name=c.getName();
            this.overview=c.getOverview();
            this.startYear=c.getStartYear();
            this.endYear=c.getEndYear();
        }

        public Long getId(){
            return id;
        }

        public String getName(){
            return name;
        }

        public String getOverview(){
            return overview;
        }

        public Integer getStartYear(){
            return startYear;
        }

        public Integer getEndYear(){
            return endYear;
        }
    }

    public static class PersonDTO{
        private Long id;
        private String name;
        private Integer birthYear;
        private Integer deathYear;
        private String biography;

        public PersonDTO(Person p){
            this.id=p.getId();
            this.name=p.getName();
            this.birthYear=p.getBirthYear();
            this.deathYear=p.getDeathYear();
            this.biography=p.getBiography();
        }

        public Long getId(){
            return id;
        }

        public String getName(){
            return name;
        }

        public Integer getBirthYear(){
            return birthYear;
        }

        public Integer getDeathYear(){
            return deathYear;
        }

        public String getBiography(){
            return biography;
        }
    }

    public static class EvidenceDTO{
        private Long id;
        private String title;
        private String description;
        private String type;
        private String source;
        private ThemeDTO theme;

        public EvidenceDTO(Evidence e){
            this.id=e.getId();
            this.title=e.getTitle();
            this.description=e.getDescription();
            this.type=e.getType();
            this.source=e.getSource();
            if (e.getTheme() != null){
                this.theme=new ThemeDTO(e.getTheme());
            }
        }

        public Long getId(){
            return id;
        }

        public String getTitle(){
            return title;
        }

        public String getDescription(){
            return description;
        }

        public String getType(){
            return type;
        }

        public String getSource(){
            return source;
        }

        public ThemeDTO getTheme(){
            return theme;
        }
    }

    public static class ThemeDTO{
        private Long id;
        private String name;

        public ThemeDTO(Theme t){
            this.id=t.getId();
            this.name=t.getName();
        }

        public Long getId(){
            return id;
        }

        public String getName(){
            return name;
        }
    }
}
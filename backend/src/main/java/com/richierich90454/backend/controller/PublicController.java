package com.richierich90454.backend.controller;

import com.richierich90454.backend.model.*;
import com.richierich90454.backend.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
public class PublicController{

    private final CourseService courseService;
    private final PeriodService periodService;
    private final EventService eventService;
    private final CivilizationService civilizationService;
    private final ThemeService themeService;
    private final PersonService personService;
    private final EvidenceService evidenceService;

    public PublicController(CourseService courseService, PeriodService periodService, EventService eventService,
            CivilizationService civilizationService, ThemeService themeService,
            PersonService personService, EvidenceService evidenceService){
        this.courseService=courseService;
        this.periodService=periodService;
        this.eventService=eventService;
        this.civilizationService=civilizationService;
        this.themeService=themeService;
        this.personService=personService;
        this.evidenceService=evidenceService;
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id){
        return courseService.getCourseById(id);
    }

    @GetMapping("/courses/{courseId}/periods")
    public List<Period> getPeriodsByCourse(@PathVariable Long courseId){
        return periodService.getPeriodsByCourseId(courseId);
    }

    @GetMapping("/periods/{id}")
    public Period getPeriodById(@PathVariable Long id){
        return periodService.getPeriodById(id);
    }

    @GetMapping("/periods/{periodId}/events")
    public List<Event> getEventsByPeriod(@PathVariable Long periodId){
        return eventService.getEventsByPeriodId(periodId).stream()
                .filter(e -> "APPROVED".equals(e.getStatus()))
                .collect(Collectors.toList());
    }

    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable Long id){
        return eventService.getEventById(id);
    }

    @GetMapping("/civilizations")
    public List<Civilization> getAllCivilizations(){
        return civilizationService.getApprovedCivilizations();
    }

    @GetMapping("/civilizations/{id}")
    public Civilization getCivilizationById(@PathVariable Long id){
        return civilizationService.getCivilizationById(id);
    }

    @GetMapping("/civilizations/{civilizationId}/events")
    public List<Event> getEventsByCivilization(@PathVariable Long civilizationId){
        return eventService.getEventsByCivilizationId(civilizationId).stream()
                .filter(e -> "APPROVED".equals(e.getStatus()))
                .collect(Collectors.toList());
    }

    @GetMapping("/civilizations/{civilizationId}/people")
    public List<Person> getPeopleByCivilization(@PathVariable Long civilizationId){
        return personService.getPeopleByCivilizationId(civilizationId).stream()
                .filter(p -> "APPROVED".equals(p.getStatus()))
                .collect(Collectors.toList());
    }

    @GetMapping("/themes")
    public List<Theme> getAllThemes(){
        return themeService.getAllThemes();
    }

    @GetMapping("/evidence")
    public List<Evidence> getApprovedEvidence(){
        return evidenceService.getApprovedEvidence();
    }
}
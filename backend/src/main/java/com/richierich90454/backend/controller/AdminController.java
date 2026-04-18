package com.richierich90454.backend.controller;



import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Course;
import com.richierich90454.backend.model.Event;
import com.richierich90454.backend.model.Evidence;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.model.Person;
import com.richierich90454.backend.model.Theme;
import com.richierich90454.backend.service.CivilizationService;
import com.richierich90454.backend.service.CourseService;
import com.richierich90454.backend.service.EventService;
import com.richierich90454.backend.service.EvidenceService;
import com.richierich90454.backend.service.PeriodService;
import com.richierich90454.backend.service.PersonService;
import com.richierich90454.backend.service.ThemeService;

@RestController
@RequestMapping("/api/admin")
public class AdminController{

    private final CourseService courseService;
    private final PeriodService periodService;
    private final EventService eventService;
    private final CivilizationService civilizationService;
    private final ThemeService themeService;
    private final PersonService personService;
    private final EvidenceService evidenceService;

    public AdminController(CourseService courseService, PeriodService periodService, EventService eventService,
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

    @PostMapping("/courses")
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody Course course){
        return courseService.createCourse(course);
    }

    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course){
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/courses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id){
        courseService.deleteCourse(id);
    }

    @PostMapping("/periods")
    @ResponseStatus(HttpStatus.CREATED)
    public Period createPeriod(@RequestBody Period period){
        return periodService.createPeriod(period);
    }

    @PutMapping("/periods/{id}")
    public Period updatePeriod(@PathVariable Long id, @RequestBody Period period){
        return periodService.updatePeriod(id, period);
    }

    @DeleteMapping("/periods/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePeriod(@PathVariable Long id){
        periodService.deletePeriod(id);
    }

    @PostMapping("/events")
    @ResponseStatus(HttpStatus.CREATED)
    public Event createEvent(@RequestBody Event event){
        return eventService.createEvent(event, true);
    }

    @PutMapping("/events/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
    }

    @PostMapping("/civilizations")
    @ResponseStatus(HttpStatus.CREATED)
    public Civilization createCivilization(@RequestBody Civilization civilization){
        return civilizationService.createCivilization(civilization, true);
    }

    @PutMapping("/civilizations/{id}")
    public Civilization updateCivilization(@PathVariable Long id, @RequestBody Civilization civilization){
        return civilizationService.updateCivilization(id, civilization);
    }

    @DeleteMapping("/civilizations/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCivilization(@PathVariable Long id){
        civilizationService.deleteCivilization(id);
    }

    @PostMapping("/evidence")
    @ResponseStatus(HttpStatus.CREATED)
    public Evidence createEvidence(@RequestBody Evidence evidence){
        return evidenceService.createEvidence(evidence, true);
    }

    @PutMapping("/evidence/{id}")
    public Evidence updateEvidence(@PathVariable Long id, @RequestBody Evidence evidence){
        return evidenceService.updateEvidence(id, evidence);
    }

    @DeleteMapping("/evidence/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvidence(@PathVariable Long id){
        evidenceService.deleteEvidence(id);
    }

    @PostMapping("/people")
    @ResponseStatus(HttpStatus.CREATED)
    public Person createPerson(@RequestBody Person person){
        return personService.createPerson(person, true);
    }

    @PutMapping("/people/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person person){
        return personService.updatePerson(id, person);
    }

    @DeleteMapping("/people/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long id){
        personService.deletePerson(id);
    }

    @PostMapping("/themes")
    @ResponseStatus(HttpStatus.CREATED)
    public Theme createTheme(@RequestBody Theme theme){
        return themeService.createTheme(theme);
    }

    @PutMapping("/themes/{id}")
    public Theme updateTheme(@PathVariable Long id, @RequestBody Theme theme){
        return themeService.updateTheme(id, theme);
    }

    @DeleteMapping("/themes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTheme(@PathVariable Long id){
        themeService.deleteTheme(id);
    }
}
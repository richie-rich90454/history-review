package com.richierich90454.backend.controller;

import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Course;
import com.richierich90454.backend.model.Event;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.model.Person;
import com.richierich90454.backend.model.Theme;
import com.richierich90454.backend.service.CivilizationService;
import com.richierich90454.backend.service.CourseService;
import com.richierich90454.backend.service.EventService;
import com.richierich90454.backend.service.PeriodService;
import com.richierich90454.backend.service.PersonService;
import com.richierich90454.backend.service.ThemeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController{

    private final CourseService courseService;
    private final PeriodService periodService;
    private final EventService eventService;
    private final CivilizationService civilizationService;
    private final ThemeService themeService;
    private final PersonService personService;

    public PublicController(CourseService courseService, PeriodService periodService, EventService eventService, CivilizationService civilizationService, ThemeService themeService, PersonService personService){
        this.courseService=courseService;
        this.periodService=periodService;
        this.eventService=eventService;
        this.civilizationService=civilizationService;
        this.themeService=themeService;
        this.personService=personService;
    }

    /**
     * Retrieves all AP History courses.
     * @return list of Course entities
     */
    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    /**
     * Retrieves a single course by its ID.
     * @param id course ID
     * @return Course entity
     */
    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id){
        return courseService.getCourseById(id);
    }

    /**
     * Retrieves all periods belonging to a specific course.
     * @param courseId course ID
     * @return list of Period entities
     */
    @GetMapping("/courses/{courseId}/periods")
    public List<Period> getPeriodsByCourse(@PathVariable Long courseId){
        return periodService.getPeriodsByCourseId(courseId);
    }

    /**
     * Retrieves a single period by its ID.
     * @param id period ID
     * @return Period entity
     */
    @GetMapping("/periods/{id}")
    public Period getPeriodById(@PathVariable Long id){
        return periodService.getPeriodById(id);
    }

    /**
     * Retrieves all events belonging to a specific period, ordered by year ascending.
     * @param periodId period ID
     * @return list of Event entities
     */
    @GetMapping("/periods/{periodId}/events")
    public List<Event> getEventsByPeriod(@PathVariable Long periodId){
        return eventService.getEventsByPeriodId(periodId);
    }

    /**
     * Retrieves a single event by its ID.
     * @param id event ID
     * @return Event entity
     */
    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable Long id){
        return eventService.getEventById(id);
    }

    /**
     * Retrieves all civilizations.
     * @return list of Civilization entities
     */
    @GetMapping("/civilizations")
    public List<Civilization> getAllCivilizations(){
        return civilizationService.getAllCivilizations();
    }

    /**
     * Retrieves a single civilization by its ID.
     * @param id civilization ID
     * @return Civilization entity
     */
    @GetMapping("/civilizations/{id}")
    public Civilization getCivilizationById(@PathVariable Long id){
        return civilizationService.getCivilizationById(id);
    }

    /**
     * Retrieves all SPICE-T themes.
     * @return list of Theme entities
     */
    @GetMapping("/themes")
    public List<Theme> getAllThemes(){
        return themeService.getAllThemes();
    }

    /**
     * Retrieves all people associated with a specific civilization.
     * @param civilizationId civilization ID
     * @return list of Person entities
     */
    @GetMapping("/civilizations/{civilizationId}/people")
    public List<Person> getPeopleByCivilization(@PathVariable Long civilizationId){
        return personService.getPeopleByCivilizationId(civilizationId);
    }
}
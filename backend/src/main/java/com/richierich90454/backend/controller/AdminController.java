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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController{

    private final CourseService courseService;
    private final PeriodService periodService;
    private final EventService eventService;
    private final CivilizationService civilizationService;
    private final ThemeService themeService;
    private final PersonService personService;

    public AdminController(CourseService courseService, PeriodService periodService, EventService eventService, CivilizationService civilizationService, ThemeService themeService, PersonService personService){
        this.courseService=courseService;
        this.periodService=periodService;
        this.eventService=eventService;
        this.civilizationService=civilizationService;
        this.themeService=themeService;
        this.personService=personService;
    }

    /**
     * Creates a new course.
     * @param course course to create
     * @return created Course entity
     */
    @PostMapping("/courses")
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody Course course){
        return courseService.createCourse(course);
    }

    /**
     * Updates an existing course.
     * @param id course ID
     * @param course updated course data
     * @return updated Course entity
     */
    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course){
        return courseService.updateCourse(id, course);
    }

    /**
     * Deletes a course by its ID.
     * @param id course ID
     */
    @DeleteMapping("/courses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id){
        courseService.deleteCourse(id);
    }

    /**
     * Creates a new period.
     * @param period period to create (should contain course reference)
     * @return created Period entity
     */
    @PostMapping("/periods")
    @ResponseStatus(HttpStatus.CREATED)
    public Period createPeriod(@RequestBody Period period){
        return periodService.createPeriod(period);
    }

    /**
     * Updates an existing period.
     * @param id period ID
     * @param period updated period data
     * @return updated Period entity
     */
    @PutMapping("/periods/{id}")
    public Period updatePeriod(@PathVariable Long id, @RequestBody Period period){
        return periodService.updatePeriod(id, period);
    }

    /**
     * Deletes a period by its ID.
     * @param id period ID
     */
    @DeleteMapping("/periods/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePeriod(@PathVariable Long id){
        periodService.deletePeriod(id);
    }

    /**
     * Creates a new event.
     * @param event event to create (should contain period reference)
     * @return created Event entity
     */
    @PostMapping("/events")
    @ResponseStatus(HttpStatus.CREATED)
    public Event createEvent(@RequestBody Event event){
        return eventService.createEvent(event);
    }

    /**
     * Updates an existing event.
     * @param id event ID
     * @param event updated event data
     * @return updated Event entity
     */
    @PutMapping("/events/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return eventService.updateEvent(id, event);
    }

    /**
     * Deletes an event by its ID.
     * @param id event ID
     */
    @DeleteMapping("/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
    }

    /**
     * Creates a new civilization.
     * @param civilization civilization to create
     * @return created Civilization entity
     */
    @PostMapping("/civilizations")
    @ResponseStatus(HttpStatus.CREATED)
    public Civilization createCivilization(@RequestBody Civilization civilization){
        return civilizationService.createCivilization(civilization);
    }

    /**
     * Updates an existing civilization.
     * @param id civilization ID
     * @param civilization updated civilization data
     * @return updated Civilization entity
     */
    @PutMapping("/civilizations/{id}")
    public Civilization updateCivilization(@PathVariable Long id, @RequestBody Civilization civilization){
        return civilizationService.updateCivilization(id, civilization);
    }

    /**
     * Deletes a civilization by its ID.
     * @param id civilization ID
     */
    @DeleteMapping("/civilizations/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCivilization(@PathVariable Long id){
        civilizationService.deleteCivilization(id);
    }

    /**
     * Creates a new theme.
     * @param theme theme to create
     * @return created Theme entity
     */
    @PostMapping("/themes")
    @ResponseStatus(HttpStatus.CREATED)
    public Theme createTheme(@RequestBody Theme theme){
        return themeService.createTheme(theme);
    }

    /**
     * Updates an existing theme.
     * @param id theme ID
     * @param theme updated theme data
     * @return updated Theme entity
     */
    @PutMapping("/themes/{id}")
    public Theme updateTheme(@PathVariable Long id, @RequestBody Theme theme){
        return themeService.updateTheme(id, theme);
    }

    /**
     * Deletes a theme by its ID.
     * @param id theme ID
     */
    @DeleteMapping("/themes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTheme(@PathVariable Long id){
        themeService.deleteTheme(id);
    }

    /**
     * Creates a new historical person.
     * @param person person to create
     * @return created Person entity
     */
    @PostMapping("/people")
    @ResponseStatus(HttpStatus.CREATED)
    public Person createPerson(@RequestBody Person person){
        return personService.createPerson(person);
    }

    /**
     * Updates an existing person.
     * @param id person ID
     * @param person updated person data
     * @return updated Person entity
     */
    @PutMapping("/people/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person person){
        return personService.updatePerson(id, person);
    }

    /**
     * Deletes a person by its ID.
     * @param id person ID
     */
    @DeleteMapping("/people/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long id){
        personService.deletePerson(id);
    }
}
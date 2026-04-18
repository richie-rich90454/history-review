package com.richierich90454.backend.controller;

import com.richierich90454.backend.model.*;
import com.richierich90454.backend.service.*;

import java.util.List;

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

	@GetMapping("/events/all")
	public List<Event> getAllEvents(){
		return eventService.getAllEvents();
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

	@GetMapping("/civilizations/all")
	public List<Civilization> getAllCivilizations(){
		return civilizationService.getAllCivilizations();
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

	@GetMapping("/evidence/all")
	public List<Evidence> getAllEvidence(){
		return evidenceService.getAllEvidence();
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

	@GetMapping("/people/all")
	public List<Person> getAllPeople(){
		return personService.getAllPeople();
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

	@GetMapping("/periods/all")
	public List<Period> getAllPeriods(){
		return periodService.getAllPeriods();
	}
}
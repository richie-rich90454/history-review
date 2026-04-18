package com.richierich90454.backend.controller;

import com.richierich90454.backend.dto.*;
import com.richierich90454.backend.model.*;
import com.richierich90454.backend.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

	@GetMapping("/courses/all")
	public List<Course> getAllCoursesAdmin(){
		return courseService.getAllCourses();
	}

	@PostMapping("/periods")
	@ResponseStatus(HttpStatus.CREATED)
	public Period createPeriod(@RequestBody PeriodRequest request){
		Period period=new Period();
		period.setTitle(request.getTitle());
		period.setStartYear(request.getStartYear());
		period.setEndYear(request.getEndYear());
		period.setOverview(request.getOverview());
		if (request.getCourseId()!=null){
			Course course=courseService.getCourseById(request.getCourseId());
			period.setCourse(course);
		}
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

	@GetMapping("/periods/all")
	public List<Period> getAllPeriodsAdmin(){
		return periodService.getAllPeriods();
	}

	@PostMapping("/civilizations")
	@ResponseStatus(HttpStatus.CREATED)
	public Civilization createCivilization(@RequestBody CivilizationRequest request){
		Civilization civilization=new Civilization();
		civilization.setName(request.getName());
		civilization.setOverview(request.getOverview());
		civilization.setStartYear(request.getStartYear());
		civilization.setEndYear(request.getEndYear());
		if (request.getPeriodId()!=null){
			Period period=periodService.getPeriodById(request.getPeriodId());
			civilization.setPeriod(period);
		}
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
	public List<Civilization> getAllCivilizationsAdmin(){
		return civilizationService.getAllCivilizations();
	}

	@PostMapping("/events")
	@ResponseStatus(HttpStatus.CREATED)
	public Event createEvent(@RequestBody EventRequest request){
		Event event=new Event();
		event.setName(request.getName());
		event.setYear(request.getYear());
		event.setDescription(request.getDescription());
		event.setSignificance(request.getSignificance());
		if (request.getPeriodId()!=null){
			Period period=periodService.getPeriodById(request.getPeriodId());
			event.setPeriod(period);
		}
		if (request.getCivilizationId()!=null){
			Civilization civ=civilizationService.getCivilizationById(request.getCivilizationId());
			event.setCivilization(civ);
		}
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
	public List<Event> getAllEventsAdmin(){
		return eventService.getAllEvents();
	}

	@PostMapping("/evidence")
	@ResponseStatus(HttpStatus.CREATED)
	public Evidence createEvidence(@RequestBody EvidenceRequest request){
		Evidence evidence=new Evidence();
		evidence.setTitle(request.getTitle());
		evidence.setDescription(request.getDescription());
		evidence.setType(request.getType());
		evidence.setSource(request.getSource());
		evidence.setSignificance(request.getSignificance());
		if (request.getCivilizationId()!=null){
			Civilization civ=civilizationService.getCivilizationById(request.getCivilizationId());
			evidence.setCivilization(civ);
		}
		if (request.getThemeId()!=null){
			Theme theme=themeService.getThemeById(request.getThemeId());
			evidence.setTheme(theme);
		}
		if (request.getEventId()!=null){
			Event event=eventService.getEventById(request.getEventId());
			evidence.setEvent(event);
		}
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
	public List<Evidence> getAllEvidenceAdmin(){
		return evidenceService.getAllEvidence();
	}

	@PostMapping("/people")
	@ResponseStatus(HttpStatus.CREATED)
	public Person createPerson(@RequestBody PersonRequest request){
		Person person=new Person();
		person.setName(request.getName());
		person.setBirthYear(request.getBirthYear());
		person.setDeathYear(request.getDeathYear());
		person.setBiography(request.getBiography());
		if (request.getCivilizationId()!=null){
			Civilization civ=civilizationService.getCivilizationById(request.getCivilizationId());
			person.setCivilization(civ);
		}
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
	public List<Person> getAllPeopleAdmin(){
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
}
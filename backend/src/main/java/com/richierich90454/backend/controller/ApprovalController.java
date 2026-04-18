package com.richierich90454.backend.controller;

import com.richierich90454.backend.model.*;
import com.richierich90454.backend.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin/approvals")
public class ApprovalController {

	private final CivilizationService civilizationService;
	private final EventService eventService;
	private final EvidenceService evidenceService;
	private final PersonService personService;

	public ApprovalController(CivilizationService civilizationService, EventService eventService,
							  EvidenceService evidenceService, PersonService personService) {
		this.civilizationService = civilizationService;
		this.eventService = eventService;
		this.evidenceService = evidenceService;
		this.personService = personService;
	}

	@GetMapping("/pending")
	public List<Map<String, Object>> getPendingItems() {
		List<Map<String, Object>> pending = new ArrayList<>();

		for (Civilization c : civilizationService.getAllCivilizations()) {
			if ("PENDING".equals(c.getStatus())) {
				pending.add(Map.of("type", "civilization", "id", c.getId(), "title", c.getName(), "data", c));
			}
		}
		for (Event e : eventService.getAllEvents()) {
			if ("PENDING".equals(e.getStatus())) {
				pending.add(Map.of("type", "event", "id", e.getId(), "title", e.getName(), "data", e));
			}
		}
		for (Evidence e : evidenceService.getAllEvidence()) {
			if ("PENDING".equals(e.getStatus())) {
				pending.add(Map.of("type", "evidence", "id", e.getId(), "title", e.getTitle(), "data", e));
			}
		}
		for (Person p : personService.getAllPeople()) {
			if ("PENDING".equals(p.getStatus())) {
				pending.add(Map.of("type", "person", "id", p.getId(), "title", p.getName(), "data", p));
			}
		}
		return pending;
	}

	@PostMapping("/civilization/{id}/approve")
	public Civilization approveCivilization(@PathVariable Long id) {
		return civilizationService.approveCivilization(id);
	}

	@PostMapping("/civilization/{id}/reject")
	public Civilization rejectCivilization(@PathVariable Long id) {
		return civilizationService.rejectCivilization(id);
	}

	@PostMapping("/event/{id}/approve")
	public Event approveEvent(@PathVariable Long id) {
		return eventService.approveEvent(id);
	}

	@PostMapping("/event/{id}/reject")
	public Event rejectEvent(@PathVariable Long id) {
		return eventService.rejectEvent(id);
	}

	@PostMapping("/evidence/{id}/approve")
	public Evidence approveEvidence(@PathVariable Long id) {
		return evidenceService.approveEvidence(id);
	}

	@PostMapping("/evidence/{id}/reject")
	public Evidence rejectEvidence(@PathVariable Long id) {
		return evidenceService.rejectEvidence(id);
	}

	@PostMapping("/person/{id}/approve")
	public Person approvePerson(@PathVariable Long id) {
		return personService.approvePerson(id);
	}

	@PostMapping("/person/{id}/reject")
	public Person rejectPerson(@PathVariable Long id) {
		return personService.rejectPerson(id);
	}
}
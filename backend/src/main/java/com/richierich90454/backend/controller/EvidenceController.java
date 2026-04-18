package com.richierich90454.backend.controller;

import com.richierich90454.backend.dto.EvidenceRequest;
import com.richierich90454.backend.model.*;
import com.richierich90454.backend.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController{

	private final EvidenceService evidenceService;
	private final CivilizationService civilizationService;
	private final ThemeService themeService;
	private final EventService eventService;

	public EvidenceController(EvidenceService evidenceService, CivilizationService civilizationService,
							  ThemeService themeService, EventService eventService){
		this.evidenceService=evidenceService;
		this.civilizationService=civilizationService;
		this.themeService=themeService;
		this.eventService=eventService;
	}

	@GetMapping("/public/by-civ-and-theme")
	public List<Evidence> getEvidenceByCivAndTheme(@RequestParam Long civId, @RequestParam Long themeId){
		return evidenceService.getEvidenceByCivilizationAndTheme(civId, themeId);
	}

	@GetMapping("/public")
	public List<Evidence> getAllEvidencePublic(){
		return evidenceService.getApprovedEvidence();
	}

	@GetMapping("/public/{id}")
	public Evidence getEvidenceById(@PathVariable Long id){
		return evidenceService.getEvidenceById(id);
	}

	@PostMapping("/admin")
	@ResponseStatus(HttpStatus.CREATED)
	public Evidence createEvidence(@RequestBody EvidenceRequest request){
		Evidence evidence=new Evidence();
		evidence.setTitle(request.getTitle());
		evidence.setDescription(request.getDescription());
		evidence.setType(request.getType());
		evidence.setSource(request.getSource());
		evidence.setSignificance(request.getSignificance());
		if (request.getCivilizationId() != null){
			Civilization civ=civilizationService.getCivilizationById(request.getCivilizationId());
			evidence.setCivilization(civ);
		}
		if (request.getThemeId() != null){
			Theme theme=themeService.getThemeById(request.getThemeId());
			evidence.setTheme(theme);
		}
		if (request.getEventId() != null){
			Event event=eventService.getEventById(request.getEventId());
			evidence.setEvent(event);
		}
		return evidenceService.createEvidence(evidence, false);
	}

	@PutMapping("/admin/{id}")
	public Evidence updateEvidence(@PathVariable Long id, @RequestBody EvidenceRequest request){
		Evidence evidence=evidenceService.getEvidenceById(id);
		evidence.setTitle(request.getTitle());
		evidence.setDescription(request.getDescription());
		evidence.setType(request.getType());
		evidence.setSource(request.getSource());
		evidence.setSignificance(request.getSignificance());
		return evidenceService.updateEvidence(id, evidence);
	}

	@DeleteMapping("/admin/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteEvidence(@PathVariable Long id){
		evidenceService.deleteEvidence(id);
	}
}
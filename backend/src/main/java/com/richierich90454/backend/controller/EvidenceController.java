package com.richierich90454.backend.controller;

import com.richierich90454.backend.model.Evidence;
import com.richierich90454.backend.service.EvidenceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController{

	private final EvidenceService evidenceService;

	public EvidenceController(EvidenceService evidenceService){
		this.evidenceService=evidenceService;
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
	public Evidence createEvidence(@RequestBody Evidence evidence){
		return evidenceService.createEvidence(evidence, false);
	}

	@PutMapping("/admin/{id}")
	public Evidence updateEvidence(@PathVariable Long id, @RequestBody Evidence evidence){
		return evidenceService.updateEvidence(id, evidence);
	}

	@DeleteMapping("/admin/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteEvidence(@PathVariable Long id){
		evidenceService.deleteEvidence(id);
	}
}
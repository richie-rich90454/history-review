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

    /**
     * Retrieves evidence filtered by civilization ID and theme ID.
     * @param civId civilization ID
     * @param themeId theme ID
     * @return list of Evidence entities matching the criteria
     */
    @GetMapping("/public/by-civ-and-theme")
    public List<Evidence> getEvidenceByCivAndTheme(@RequestParam Long civId, @RequestParam Long themeId){
        return evidenceService.getEvidenceByCivilizationAndTheme(civId, themeId);
    }

    /**
     * Retrieves all evidence entries (public endpoint).
     * @return list of all Evidence entities
     */
    @GetMapping("/public")
    public List<Evidence> getAllEvidencePublic(){
        return evidenceService.getAllEvidence();
    }

    /**
     * Retrieves a single evidence entry by its ID.
     * @param id evidence ID
     * @return Evidence entity
     */
    @GetMapping("/public/{id}")
    public Evidence getEvidenceById(@PathVariable Long id){
        return evidenceService.getEvidenceById(id);
    }

    /**
     * Creates a new evidence entry (admin only).
     * @param evidence evidence to create
     * @return created Evidence entity
     */
    @PostMapping("/admin")
    @ResponseStatus(HttpStatus.CREATED)
    public Evidence createEvidence(@RequestBody Evidence evidence){
        return evidenceService.createEvidence(evidence);
    }

    /**
     * Updates an existing evidence entry (admin only).
     * @param id evidence ID
     * @param evidence updated evidence data
     * @return updated Evidence entity
     */
    @PutMapping("/admin/{id}")
    public Evidence updateEvidence(@PathVariable Long id, @RequestBody Evidence evidence){
        return evidenceService.updateEvidence(id, evidence);
    }

    /**
     * Deletes an evidence entry by its ID (admin only).
     * @param id evidence ID
     */
    @DeleteMapping("/admin/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvidence(@PathVariable Long id){
        evidenceService.deleteEvidence(id);
    }
}
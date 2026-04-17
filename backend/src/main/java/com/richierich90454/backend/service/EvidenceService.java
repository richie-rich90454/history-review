package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Evidence;
import com.richierich90454.backend.model.Theme;
import com.richierich90454.backend.repository.EvidenceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EvidenceService{

    private final EvidenceRepository evidenceRepository;
    private final CivilizationService civilizationService;
    private final ThemeService themeService;

    public EvidenceService(EvidenceRepository evidenceRepository, CivilizationService civilizationService, ThemeService themeService){
        this.evidenceRepository=evidenceRepository;
        this.civilizationService=civilizationService;
        this.themeService=themeService;
    }

    /**
     * Retrieves all evidence entries.
     * @return list of Evidence entities
     */
    public List<Evidence> getAllEvidence(){
        return evidenceRepository.findAll();
    }

    /**
     * Retrieves a single evidence by its ID.
     * @param id evidence ID
     * @return Evidence entity
     * @throws RuntimeException if not found
     */
    public Evidence getEvidenceById(Long id){
        return evidenceRepository.findById(id).orElseThrow(() -> new RuntimeException("Evidence not found"));
    }

    /**
     * Retrieves evidence filtered by civilization and theme.
     * @param civilizationId civilization ID
     * @param themeId theme ID
     * @return list of Evidence entities matching both criteria
     */
    public List<Evidence> getEvidenceByCivilizationAndTheme(Long civilizationId, Long themeId){
        return evidenceRepository.findByCivilizationIdAndThemeId(civilizationId, themeId);
    }

    /**
     * Creates a new evidence entry, ensuring civilization and theme references are valid.
     * @param evidence evidence entity
     * @return saved Evidence entity
     */
    public Evidence createEvidence(Evidence evidence){
        if (evidence.getCivilization() != null && evidence.getCivilization().getId() != null){
            Civilization civ=civilizationService.getCivilizationById(evidence.getCivilization().getId());
            evidence.setCivilization(civ);
        }
        if (evidence.getTheme() != null && evidence.getTheme().getId() != null){
            Theme theme=themeService.getThemeById(evidence.getTheme().getId());
            evidence.setTheme(theme);
        }
        return evidenceRepository.save(evidence);
    }

    /**
     * Updates an existing evidence entry.
     * @param id evidence ID
     * @param evidenceDetails updated evidence data
     * @return updated Evidence entity
     */
    public Evidence updateEvidence(Long id, Evidence evidenceDetails){
        Evidence evidence=getEvidenceById(id);
        evidence.setTitle(evidenceDetails.getTitle());
        evidence.setDescription(evidenceDetails.getDescription());
        evidence.setType(evidenceDetails.getType());
        evidence.setSource(evidenceDetails.getSource());
        evidence.setSignificance(evidenceDetails.getSignificance());
        return evidenceRepository.save(evidence);
    }

    /**
     * Deletes an evidence entry by its ID.
     * @param id evidence ID
     */
    public void deleteEvidence(Long id){
        evidenceRepository.deleteById(id);
    }
}
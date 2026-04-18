package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Evidence;
import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Theme;
import com.richierich90454.backend.repository.EvidenceRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

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

	public List<Evidence> getAllEvidence(){
		return evidenceRepository.findAll();
	}

	public List<Evidence> getApprovedEvidence(){
		return evidenceRepository.findByStatus("APPROVED");
	}

	public Evidence getEvidenceById(Long id){
		return evidenceRepository.findById(id).orElseThrow(() -> new RuntimeException("Evidence not found"));
	}

	public List<Evidence> getEvidenceByCivilizationAndTheme(Long civilizationId, Long themeId){
		return evidenceRepository.findByCivilizationIdAndThemeId(civilizationId, themeId).stream()
				.filter(e -> "APPROVED".equals(e.getStatus()))
				.collect(Collectors.toList());
	}

	public List<Evidence> getEvidenceByCivilizationId(Long civilizationId){
		return evidenceRepository.findByCivilizationId(civilizationId).stream()
				.filter(e -> "APPROVED".equals(e.getStatus()))
				.collect(Collectors.toList());
	}

	public Evidence createEvidence(Evidence evidence, boolean isAdmin){
		if (evidence.getCivilization() != null && evidence.getCivilization().getId() != null){
			Civilization civ=civilizationService.getCivilizationById(evidence.getCivilization().getId());
			evidence.setCivilization(civ);
		}
		if (evidence.getTheme() != null && evidence.getTheme().getId() != null){
			Theme theme=themeService.getThemeById(evidence.getTheme().getId());
			evidence.setTheme(theme);
		}
		if (!isAdmin){
			evidence.setStatus("PENDING");
		} else{
			evidence.setStatus("APPROVED");
		}
		return evidenceRepository.save(evidence);
	}

	public Evidence updateEvidence(Long id, Evidence evidenceDetails){
		Evidence evidence=getEvidenceById(id);
		evidence.setTitle(evidenceDetails.getTitle());
		evidence.setDescription(evidenceDetails.getDescription());
		evidence.setType(evidenceDetails.getType());
		evidence.setSource(evidenceDetails.getSource());
		evidence.setSignificance(evidenceDetails.getSignificance());
		return evidenceRepository.save(evidence);
	}

	public void deleteEvidence(Long id){
		evidenceRepository.deleteById(id);
	}

	public Evidence approveEvidence(Long id){
		Evidence evidence=getEvidenceById(id);
		evidence.setStatus("APPROVED");
		return evidenceRepository.save(evidence);
	}

	public Evidence rejectEvidence(Long id){
		Evidence evidence=getEvidenceById(id);
		evidence.setStatus("REJECTED");
		return evidenceRepository.save(evidence);
	}
}
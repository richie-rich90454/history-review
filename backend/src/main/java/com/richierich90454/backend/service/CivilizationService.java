package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.repository.CivilizationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CivilizationService{

	private final CivilizationRepository civilizationRepository;
	private final PeriodService periodService;

	public CivilizationService(CivilizationRepository civilizationRepository, PeriodService periodService){
		this.civilizationRepository=civilizationRepository;
		this.periodService=periodService;
	}

	public List<Civilization> getAllCivilizations(){
		return civilizationRepository.findAll();
	}

	public List<Civilization> getApprovedCivilizations(){
		return civilizationRepository.findByStatus("APPROVED");
	}

	public Civilization getCivilizationById(Long id){
		return civilizationRepository.findById(id).orElseThrow(() -> new RuntimeException("Civilization not found"));
	}

	public List<Civilization> getCivilizationsByPeriodId(Long periodId){
		return civilizationRepository.findByPeriodId(periodId);
	}

	public Civilization createCivilization(Civilization civilization, boolean isAdmin){
		if (civilization.getPeriod() != null && civilization.getPeriod().getId() != null){
			Period period=periodService.getPeriodById(civilization.getPeriod().getId());
			civilization.setPeriod(period);
		}
		if (!isAdmin){
			civilization.setStatus("PENDING");
		} else{
			civilization.setStatus("APPROVED");
		}
		return civilizationRepository.save(civilization);
	}

	public Civilization updateCivilization(Long id, Civilization civilizationDetails){
		Civilization civ=getCivilizationById(id);
		civ.setName(civilizationDetails.getName());
		civ.setOverview(civilizationDetails.getOverview());
		civ.setStartYear(civilizationDetails.getStartYear());
		civ.setEndYear(civilizationDetails.getEndYear());
		return civilizationRepository.save(civ);
	}

	public void deleteCivilization(Long id){
		civilizationRepository.deleteById(id);
	}

	public Civilization approveCivilization(Long id){
		Civilization civ=getCivilizationById(id);
		civ.setStatus("APPROVED");
		return civilizationRepository.save(civ);
	}

	public Civilization rejectCivilization(Long id){
		Civilization civ=getCivilizationById(id);
		civ.setStatus("REJECTED");
		return civilizationRepository.save(civ);
	}
}
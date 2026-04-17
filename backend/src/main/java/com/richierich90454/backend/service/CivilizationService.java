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

    /**
     * Retrieves all civilizations.
     * @return list of Civilization entities
     */
    public List<Civilization> getAllCivilizations(){
        return civilizationRepository.findAll();
    }

    /**
     * Retrieves a civilization by its ID.
     * @param id civilization ID
     * @return Civilization entity
     * @throws RuntimeException if not found
     */
    public Civilization getCivilizationById(Long id){
        return civilizationRepository.findById(id).orElseThrow(() -> new RuntimeException("Civilization not found"));
    }

    /**
     * Retrieves all civilizations within a specific period.
     * @param periodId period ID
     * @return list of Civilization entities
     */
    public List<Civilization> getCivilizationsByPeriodId(Long periodId){
        return civilizationRepository.findByPeriodId(periodId);
    }

    /**
     * Creates a new civilization and associates it with a period.
     * @param civilization civilization entity
     * @return saved Civilization entity
     */
    public Civilization createCivilization(Civilization civilization){
        if (civilization.getPeriod() != null && civilization.getPeriod().getId() != null){
            Period period=periodService.getPeriodById(civilization.getPeriod().getId());
            civilization.setPeriod(period);
        }
        return civilizationRepository.save(civilization);
    }

    /**
     * Updates an existing civilization.
     * @param id civilization ID
     * @param civilizationDetails updated civilization data
     * @return updated Civilization entity
     */
    public Civilization updateCivilization(Long id, Civilization civilizationDetails){
        Civilization civ=getCivilizationById(id);
        civ.setName(civilizationDetails.getName());
        civ.setOverview(civilizationDetails.getOverview());
        civ.setStartYear(civilizationDetails.getStartYear());
        civ.setEndYear(civilizationDetails.getEndYear());
        return civilizationRepository.save(civ);
    }

    /**
     * Deletes a civilization by its ID.
     * @param id civilization ID
     */
    public void deleteCivilization(Long id){
        civilizationRepository.deleteById(id);
    }
}
package com.history.backend.repository;

import com.history.backend.model.Civilization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CivilizationRepository extends JpaRepository<Civilization, Long>{
	List<Civilization> findByPeriodId(Long periodId);
	List<Civilization> findByStatus(String status);
}
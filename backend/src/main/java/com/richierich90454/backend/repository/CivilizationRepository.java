package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Civilization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CivilizationRepository extends JpaRepository<Civilization, Long>{
    List<Civilization> findByPeriodId(Long periodId);
}
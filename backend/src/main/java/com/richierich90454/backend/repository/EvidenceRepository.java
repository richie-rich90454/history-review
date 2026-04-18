package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EvidenceRepository extends JpaRepository<Evidence, Long>{
	List<Evidence> findByCivilizationIdAndThemeId(Long civilizationId, Long themeId);
	List<Evidence> findByCivilizationId(Long civilizationId);
	List<Evidence> findByThemeId(Long themeId);
	List<Evidence> findByStatus(String status);
}
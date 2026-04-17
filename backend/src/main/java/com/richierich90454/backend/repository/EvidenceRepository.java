package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EvidenceRepository extends JpaRepository<Evidence, Long>{
    /**
     * Finds evidence by civilization ID and theme ID.
     * @param civilizationId the ID of the civilization
     * @param themeId the ID of the SPICE-T theme
     * @return list of matching evidence
     */
    List<Evidence> findByCivilizationIdAndThemeId(Long civilizationId, Long themeId);

    /**
     * Finds evidence by civilization ID.
     * @param civilizationId the ID of the civilization
     * @return list of evidence belonging to that civilization
     */
    List<Evidence> findByCivilizationId(Long civilizationId);

    /**
     * Finds evidence by theme ID.
     * @param themeId the ID of the theme
     * @return list of evidence associated with that theme
     */
    List<Evidence> findByThemeId(Long themeId);
}
package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long>{
    List<Event> findByPeriodIdOrderByYearAsc(Long periodId);
    List<Event> findByCivilizationIdOrderByYearAsc(Long civilizationId);
    List<Event> findByStatus(String status);
    @Query("SELECT DISTINCT e FROM Event e "+"LEFT JOIN FETCH e.civilization c "+"LEFT JOIN FETCH e.evidence ev "+"WHERE e.period.id = :periodId "+"ORDER BY e.year ASC")
    List<Event> findByPeriodIdWithDetails(@Param("periodId") Long periodId);
}
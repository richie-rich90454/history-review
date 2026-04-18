package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long>{
	List<Event> findByPeriodIdOrderByYearAsc(Long periodId);
	List<Event> findByCivilizationIdOrderByYearAsc(Long civilizationId);
	List<Event> findByStatus(String status);
}
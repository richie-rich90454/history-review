package com.history.backend.repository;

import com.history.backend.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PeriodRepository extends JpaRepository<Period, Long>{
    List<Period> findByCourseId(Long courseId);
}
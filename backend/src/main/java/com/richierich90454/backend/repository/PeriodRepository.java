package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PeriodRepository extends JpaRepository<Period, Long>{
    List<Period> findByCourseId(Long courseId);
}
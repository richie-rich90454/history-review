package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long>{
    Optional<Course> findByName(String name);
}
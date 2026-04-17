package com.richierich90454.backend.repository;

import com.richierich90454.backend.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long>{
    Optional<Theme> findByName(String name);
}
package com.history.backend.repository;

import com.history.backend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long>{
	List<Person> findByCivilizationId(Long civilizationId);
	List<Person> findByStatus(String status);
}
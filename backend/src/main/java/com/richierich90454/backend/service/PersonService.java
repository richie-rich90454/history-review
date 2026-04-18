package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Person;
import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.repository.PersonRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService{

	private final PersonRepository personRepository;
	private final CivilizationService civilizationService;

	public PersonService(PersonRepository personRepository, CivilizationService civilizationService){
		this.personRepository=personRepository;
		this.civilizationService=civilizationService;
	}

	public List<Person> getAllPeople(){
		return personRepository.findAll();
	}

	public List<Person> getApprovedPeople(){
		return personRepository.findByStatus("APPROVED");
	}

	public Person getPersonById(Long id){
		return personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
	}

	public List<Person> getPeopleByCivilizationId(Long civilizationId){
		return personRepository.findByCivilizationId(civilizationId).stream()
				.filter(p -> "APPROVED".equals(p.getStatus()))
				.collect(Collectors.toList());
	}

	public Person createPerson(Person person, boolean isAdmin){
		if (person.getCivilization() != null && person.getCivilization().getId() != null){
			Civilization civ=civilizationService.getCivilizationById(person.getCivilization().getId());
			person.setCivilization(civ);
		}
		if (!isAdmin){
			person.setStatus("PENDING");
		} else{
			person.setStatus("APPROVED");
		}
		return personRepository.save(person);
	}

	public Person updatePerson(Long id, Person personDetails){
		Person person=getPersonById(id);
		person.setName(personDetails.getName());
		person.setBirthYear(personDetails.getBirthYear());
		person.setDeathYear(personDetails.getDeathYear());
		person.setBiography(personDetails.getBiography());
		return personRepository.save(person);
	}

	public void deletePerson(Long id){
		personRepository.deleteById(id);
	}

	public Person approvePerson(Long id){
		Person person=getPersonById(id);
		person.setStatus("APPROVED");
		return personRepository.save(person);
	}

	public Person rejectPerson(Long id){
		Person person=getPersonById(id);
		person.setStatus("REJECTED");
		return personRepository.save(person);
	}
}
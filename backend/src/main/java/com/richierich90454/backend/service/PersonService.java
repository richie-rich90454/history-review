package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.model.Person;
import com.richierich90454.backend.repository.PersonRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService{

    private final PersonRepository personRepository;
    private final CivilizationService civilizationService;

    public PersonService(PersonRepository personRepository, CivilizationService civilizationService){
        this.personRepository=personRepository;
        this.civilizationService=civilizationService;
    }

    /**
     * Retrieves all people associated with a specific civilization.
     * @param civilizationId civilization ID
     * @return list of Person entities
     */
    public List<Person> getPeopleByCivilizationId(Long civilizationId){
        return personRepository.findByCivilizationId(civilizationId);
    }

    /**
     * Retrieves a person by its ID.
     * @param id person ID
     * @return Person entity
     * @throws RuntimeException if not found
     */
    public Person getPersonById(Long id){
        return personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
    }

    /**
     * Creates a new person and associates with a civilization.
     * @param person person entity
     * @return saved Person entity
     */
    public Person createPerson(Person person){
        if (person.getCivilization() != null && person.getCivilization().getId() != null){
            Civilization civ=civilizationService.getCivilizationById(person.getCivilization().getId());
            person.setCivilization(civ);
        }
        return personRepository.save(person);
    }

    /**
     * Updates an existing person.
     * @param id person ID
     * @param personDetails updated person data
     * @return updated Person entity
     */
    public Person updatePerson(Long id, Person personDetails){
        Person person=getPersonById(id);
        person.setName(personDetails.getName());
        person.setBirthYear(personDetails.getBirthYear());
        person.setDeathYear(personDetails.getDeathYear());
        person.setBiography(personDetails.getBiography());
        return personRepository.save(person);
    }

    /**
     * Deletes a person by its ID.
     * @param id person ID
     */
    public void deletePerson(Long id){
        personRepository.deleteById(id);
    }
}
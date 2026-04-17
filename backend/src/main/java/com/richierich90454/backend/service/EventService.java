package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Event;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService{

    private final EventRepository eventRepository;
    private final PeriodService periodService;

    public EventService(EventRepository eventRepository, PeriodService periodService){
        this.eventRepository=eventRepository;
        this.periodService=periodService;
    }

    /**
     * Retrieves all events belonging to a specific period, ordered by year.
     * @param periodId period ID
     * @return list of Event entities
     */
    public List<Event> getEventsByPeriodId(Long periodId){
        return eventRepository.findByPeriodIdOrderByYearAsc(periodId);
    }

    /**
     * Retrieves an event by its ID.
     * @param id event ID
     * @return Event entity
     * @throws RuntimeException if not found
     */
    public Event getEventById(Long id){
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    /**
     * Creates a new event and associates it with a period.
     * @param event event entity (should contain period ID in its period field)
     * @return saved Event entity
     */
    public Event createEvent(Event event){
        if (event.getPeriod() != null && event.getPeriod().getId() != null){
            Period period=periodService.getPeriodById(event.getPeriod().getId());
            event.setPeriod(period);
        }
        return eventRepository.save(event);
    }

    /**
     * Updates an existing event.
     * @param id event ID
     * @param eventDetails updated event data
     * @return updated Event entity
     */
    public Event updateEvent(Long id, Event eventDetails){
        Event event=getEventById(id);
        event.setName(eventDetails.getName());
        event.setYear(eventDetails.getYear());
        event.setDescription(eventDetails.getDescription());
        event.setSignificance(eventDetails.getSignificance());
        return eventRepository.save(event);
    }

    /**
     * Deletes an event by its ID.
     * @param id event ID
     */
    public void deleteEvent(Long id){
        eventRepository.deleteById(id);
    }
}
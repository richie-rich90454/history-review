package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Event;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.dto.TimelineEventDTO;
import com.richierich90454.backend.model.Civilization;
import com.richierich90454.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService{

	private final EventRepository eventRepository;
	private final PeriodService periodService;
	private final CivilizationService civilizationService;

	public EventService(EventRepository eventRepository, PeriodService periodService,
			CivilizationService civilizationService){
		this.eventRepository=eventRepository;
		this.periodService=periodService;
		this.civilizationService=civilizationService;
	}

	public List<Event> getAllEvents(){
		return eventRepository.findAll();
	}

	public List<Event> getApprovedEvents(){
		return eventRepository.findByStatus("APPROVED");
	}

	public Event getEventById(Long id){
		return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
	}

	public List<Event> getEventsByPeriodId(Long periodId){
		return eventRepository.findByPeriodIdWithDetails(periodId).stream()
				.filter(e -> "APPROVED".equals(e.getStatus()))
				.collect(Collectors.toList());
	}

	public List<TimelineEventDTO> getTimelineEventsByPeriodId(Long periodId){
		return eventRepository.findByPeriodIdOrderByYearAsc(periodId).stream()
			.filter(e -> "APPROVED".equals(e.getStatus()))
			.map(TimelineEventDTO::new)
			.collect(Collectors.toList());
	}

	public List<Event> getEventsByCivilizationId(Long civilizationId){
		return eventRepository.findByCivilizationIdOrderByYearAsc(civilizationId).stream()
				.filter(e -> "APPROVED".equals(e.getStatus()))
				.collect(Collectors.toList());
	}

	public Event createEvent(Event event, boolean isAdmin){
		if (event.getPeriod() != null && event.getPeriod().getId() != null){
			Period period=periodService.getPeriodById(event.getPeriod().getId());
			event.setPeriod(period);
		}
		if (event.getCivilization() != null && event.getCivilization().getId() != null){
			Civilization civ=civilizationService.getCivilizationById(event.getCivilization().getId());
			event.setCivilization(civ);
		}
		if (!isAdmin){
			event.setStatus("PENDING");
		} else{
			event.setStatus("APPROVED");
		}
		return eventRepository.save(event);
	}

	public Event updateEvent(Long id, Event eventDetails){
		Event event=getEventById(id);
		event.setName(eventDetails.getName());
		event.setYear(eventDetails.getYear());
		event.setDescription(eventDetails.getDescription());
		event.setSignificance(eventDetails.getSignificance());
		return eventRepository.save(event);
	}

	public void deleteEvent(Long id){
		eventRepository.deleteById(id);
	}

	public Event approveEvent(Long id){
		Event event=getEventById(id);
		event.setStatus("APPROVED");
		return eventRepository.save(event);
	}

	public Event rejectEvent(Long id){
		Event event=getEventById(id);
		event.setStatus("REJECTED");
		return eventRepository.save(event);
	}
}
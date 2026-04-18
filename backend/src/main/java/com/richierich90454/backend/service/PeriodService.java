package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Course;
import com.richierich90454.backend.model.Period;
import com.richierich90454.backend.repository.PeriodRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PeriodService{

	private final PeriodRepository periodRepository;
	private final CourseService courseService;

	public PeriodService(PeriodRepository periodRepository, CourseService courseService){
		this.periodRepository=periodRepository;
		this.courseService=courseService;
	}

	public List<Period> getAllPeriods(){
		return periodRepository.findAll();
	}

	public List<Period> getPeriodsByCourseId(Long courseId){
		return periodRepository.findByCourseId(courseId);
	}

	public Period getPeriodById(Long id){
		return periodRepository.findById(id).orElseThrow(() -> new RuntimeException("Period not found"));
	}

	public Period createPeriod(Period period){
		if (period.getCourse()!=null&&period.getCourse().getId()!=null){
			Course course=courseService.getCourseById(period.getCourse().getId());
			period.setCourse(course);
		}
		return periodRepository.save(period);
	}

	public Period updatePeriod(Long id, Period periodDetails){
		Period period=getPeriodById(id);
		period.setTitle(periodDetails.getTitle());
		period.setStartYear(periodDetails.getStartYear());
		period.setEndYear(periodDetails.getEndYear());
		period.setOverview(periodDetails.getOverview());
		return periodRepository.save(period);
	}

	public void deletePeriod(Long id){
		periodRepository.deleteById(id);
	}
}
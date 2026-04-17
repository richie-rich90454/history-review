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

    /**
     * Retrieves all periods belonging to a specific course.
     * @param courseId course ID
     * @return list of Period entities
     */
    public List<Period> getPeriodsByCourseId(Long courseId){
        return periodRepository.findByCourseId(courseId);
    }

    /**
     * Retrieves a period by its ID.
     * @param id period ID
     * @return Period entity
     * @throws RuntimeException if not found
     */
    public Period getPeriodById(Long id){
        return periodRepository.findById(id).orElseThrow(() -> new RuntimeException("Period not found"));
    }

    /**
     * Creates a new period and associates it with a course.
     * @param period period entity (should contain course ID in its course field)
     * @return saved Period entity
     */
    public Period createPeriod(Period period){
        if (period.getCourse()!=null&&period.getCourse().getId()!=null){
            Course course=courseService.getCourseById(period.getCourse().getId());
            period.setCourse(course);
        }
        return periodRepository.save(period);
    }

    /**
     * Updates an existing period.
     * @param id period ID
     * @param periodDetails updated period data
     * @return updated Period entity
     */
    public Period updatePeriod(Long id, Period periodDetails){
        Period period=getPeriodById(id);
        period.setTitle(periodDetails.getTitle());
        period.setStartYear(periodDetails.getStartYear());
        period.setEndYear(periodDetails.getEndYear());
        period.setOverview(periodDetails.getOverview());
        return periodRepository.save(period);
    }

    /**
     * Deletes a period by its ID.
     * @param id period ID
     */
    public void deletePeriod(Long id){
        periodRepository.deleteById(id);
    }
}
package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Course;
import com.richierich90454.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService{

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository=courseRepository;
    }

    /**
     * Retrieves all courses.
     * @return list of Course entities
     */
    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    /**
     * Retrieves a course by its ID.
     * @param id course ID
     * @return Course entity
     * @throws RuntimeException if not found
     */
    public Course getCourseById(Long id){
        return courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    /**
     * Creates a new course.
     * @param course course entity to persist
     * @return saved Course entity
     */
    public Course createCourse(Course course){
        return courseRepository.save(course);
    }

    /**
     * Updates an existing course.
     * @param id course ID
     * @param courseDetails updated course data
     * @return updated Course entity
     */
    public Course updateCourse(Long id, Course courseDetails){
        Course course=getCourseById(id);
        course.setName(courseDetails.getName());
        course.setDescription(courseDetails.getDescription());
        return courseRepository.save(course);
    }

    /**
     * Deletes a course by its ID.
     * @param id course ID
     */
    public void deleteCourse(Long id){
        courseRepository.deleteById(id);
    }
}
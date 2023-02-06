package com.teamtwo.quizgenerator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import com.teamtwo.quizgenerator.model.subject.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    public Optional<Subject> findBySubjectName(String subjectName);

    public List<Subject> findAllByUserUsername(String username);
} 


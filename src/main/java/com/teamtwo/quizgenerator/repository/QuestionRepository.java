package com.teamtwo.quizgenerator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.teamtwo.quizgenerator.model.question.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    public Optional<Question> findByQuestion(String question);
    public List<Question> findAllByChapterId(Long chapter_id);
}

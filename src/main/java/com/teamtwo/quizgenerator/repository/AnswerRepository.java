package com.teamtwo.quizgenerator.repository;

import java.util.List;

import com.teamtwo.quizgenerator.model.answer.Answer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long>{
    public List<Answer> findAllByQuestionQuestionId(Long questionId);
}

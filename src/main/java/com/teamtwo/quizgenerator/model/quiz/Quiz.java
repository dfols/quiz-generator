package com.teamtwo.quizgenerator.model.quiz;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import java.util.HashMap;

import com.teamtwo.quizgenerator.model.question.Question;
import com.teamtwo.quizgenerator.model.answer.Answer;

public class Quiz {
    List<Question> questions;
    Map<Long, List<Answer>> questionAnswerMap;

    public Quiz() {
        this.questions = new ArrayList<Question>();
        this.questionAnswerMap = new HashMap<>();
    }

    public Quiz(List<Question> questions) {
        this.questions = questions;
    }

    public void setQuestions(List<Question> questions){
        this.questions = questions;
    }

    public List<Question> getQuestions() {
        return this.questions;
    }

    public void addQuestion(Question question){
        this.questions.add(question);
    }

    public void setQuestionAnswerMap(Map<Long, List<Answer>> answerMap){
        this.questionAnswerMap = answerMap;
    }

    public Map<Long, List<Answer>> getQuestionAnswerMap() {
        return this.questionAnswerMap;
    }

    public void addAnswerListToMap(Long id, List<Answer> answers){
        this.questionAnswerMap.put(id, answers);
    }
    
}

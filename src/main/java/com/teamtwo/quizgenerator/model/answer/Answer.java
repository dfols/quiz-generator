package com.teamtwo.quizgenerator.model.answer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.teamtwo.quizgenerator.model.question.Question;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="answer_generator")
    @SequenceGenerator(name="answer_generator", sequenceName="answer_seq")
    @Column(name="answer_id")
    private Long id;
    
    @Column(name="correct_answer")
    private Boolean correctAnswer;
    
    @Column(name="answer")
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;


    public Answer() {
        answer = "";
        correctAnswer = null;
       question = null;
    }

    public Answer(String answer, Boolean correctAnswer, Question question) {
        this.answer = answer;
        this.correctAnswer = correctAnswer;
        this.question = question;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(Boolean ans) {
        this.correctAnswer = ans;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String ans) {
        this.answer = ans;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question q) {
        this.question = q;
    }
}

package com.teamtwo.quizgenerator.model.question;

import java.util.Objects;
import java.util.Set;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.teamtwo.quizgenerator.model.answer.Answer;

import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
//handle recursive saves in db
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "answers"})
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="question_generator")
    @SequenceGenerator(name="question_generator", sequenceName="question_seq")
    @Column(name="question_id")
    private Long questionId;
    
    @Column(name="chapter_id")
    private Long chapterId;
    
    @Column(name="question")
    private String question;
    
    @Column(name="question_type")
    private String question_type;

    @Column(name="point_value")
    private Long pointValue;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Answer> answers;

    /**
     * default constructor for Question.
     */
    public Question() {
        question = "";
        question_type = "";
        pointValue = 0L;
    }

    /**
     * Constructor with parameters for Question.
     */
    public Question(String question, String question_type) {
        this.question = question;
        this.question_type = question_type;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long question_id) {
        this.questionId = question_id;
    }
    
    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapter_id) {
        this.chapterId = chapter_id;
    }
    
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionType() {
        return question_type;
    }

    public void setQuestionType(String question_type) {
        this.question_type = question_type;
    }

    public Set<Answer> getAnswers() {
        return this.answers;
    }

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
    }

    public void addMultipleAnswers(List<Answer> answers) {
        this.answers.addAll(answers);
    }

    public Long getPointValue() {
        return pointValue;
    }

    public void setPointValue(Long points) {
        this.pointValue = points;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Question)) {
            return false;
        }
        Question question2 = (Question) o;
        return questionId == question2.questionId && chapterId == question2.chapterId && Objects.equals(question, question2.question)
                && Objects.equals(question_type, question2.question_type) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, chapterId, question, question_type);
    }

    @Override
    public String toString() {
        return "{" +
                "  questionId='" + getQuestionId() + "'" +
                ", chapterId='" + getChapterId() + "'" +
                ", question='" + getQuestion() + "'" +
                ", questiontype='" + getQuestionType() + "'" +
                "}";
    }
}

package com.teamtwo.quizgenerator.model.question;

import java.util.List;
import com.teamtwo.quizgenerator.model.answer.Answer;

public class QuestionManagement {
    Long subjectId;
    Long chapterId;
    Question question;
    List<Answer> answers;

    public QuestionManagement(){
        subjectId = 0L;
        chapterId = 0L;
        question = null;
        answers = null;
    }

    public void setSubjectId(Long subId){
        this.subjectId = subId;
    }

    public void setChapterId(Long chapId){
        this.chapterId = chapId;
    }

    public void setQuestion(Question q){
        this.question = q;
    }

    public void setAnswers(List<Answer> ans){
        this.answers = ans;
    }

    public Long getSubjectId(){
        return this.subjectId;
    }

    public Long getChapterId(){
        return this.chapterId;
    }

    public Question getQuestion(){
        return this.question;
    }

    public List<Answer> getAnswers(){
        return this.answers;
    }
}

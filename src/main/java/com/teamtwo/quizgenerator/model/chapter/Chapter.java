package com.teamtwo.quizgenerator.model.chapter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.teamtwo.quizgenerator.model.subject.Subject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "questions"})
public class Chapter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="chapter_generator")
    @SequenceGenerator(name="chapter_generator", sequenceName="chapter_seq")
    @Column(name="chapter_id")
    private Long chapterId;

  
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @Column(name="chapter_title")
    private String chapterTitle;

    public Chapter(){
        this.subject = null;
        this.chapterTitle = "";
    }

    public Chapter(Subject sub, String title){
        this.subject = sub;
        this.chapterTitle = title;
    }

    public Long getChapterId(){
        return this.chapterId;
    }

    public void setChapterId(Long id){
        this.chapterId = id;
    }

    public Subject getSubject(){
        return this.subject;
    }

    public void setSubject(Subject sub){
        this.subject = sub;
    }

    public String getChapterTitle(){
        return this.chapterTitle;
    }

    public void setChapterTitle(String title){
        this.chapterTitle = title;
    }
}

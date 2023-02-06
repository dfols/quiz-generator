package com.teamtwo.quizgenerator.model.subject;

import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="subject_generator")
    @SequenceGenerator(name="subject_generator", sequenceName="subject_seq")
    @Column(name="subject_id")
    private Long subjectId;

    @Column(name="subject_name")
    private String subjectName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Chapter> chapters;

    public Subject() {
        this.subjectName = "";
        this.user = null;
    }

    public Subject(String subjectName, User userId) {
        this.subjectName = subjectName;
        this.user = userId;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectName() {
        return this.subjectName;
    }

    public void setSubjectId(Long id) {
        this.subjectId = id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User usr) {
        this.user = usr;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Subject)) {
            return false;
            
        } else {
            Subject sub1 = (Subject) o;
            if(this.hashCode() == sub1.hashCode()){
                return true;
            } else {
                return false;
            }
        }   
    }
    @Override
    public int hashCode() {
        return Objects.hash(subjectId, subjectName);
    }

    @Override
    public String toString() {
        return "{" +
                "  subjectId='" + getSubjectId() + "'" +
                ", subjectName='" + getSubjectName() + "'" +
                "}";
    }
}


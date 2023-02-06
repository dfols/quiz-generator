package com.teamtwo.quizgenerator.model.question;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.subject.Subject;
import com.teamtwo.quizgenerator.model.answer.Answer;

public class TextBook {
    Subject subject;

    List<Chapter> chapters;

    HashMap<String, List<Question>> chapterQuestionMap;

    HashMap<String, List<Answer>> questionAnswerMap;

    public TextBook() {
        subject = new Subject();
        chapters = new ArrayList<Chapter>();
        chapterQuestionMap = new HashMap<>();
        questionAnswerMap = new HashMap<>();
    }


    public void setSubject(Subject sub) {
        this.subject = sub;
    }

    public void addChapter(Chapter chap) {
        this.chapters.add(chap);
    }

    public void setChapters(List<Chapter> chaps){
        this.chapters = chaps;
    }

    public void setChapterQuestionMap(HashMap map) {
        this.chapterQuestionMap = map;
    }

    public void addMapItem(String key, List<Question> answers) {
        this.chapterQuestionMap.put(key, answers);
    }

    public void addAnswerMapItem(String key, List<Answer> answers) {
        this.questionAnswerMap.put(key, answers);
    }

    public Subject getSubject() {
        return this.subject;
    }

    public List<Chapter> getChapters(){
        return this.chapters;
    }

    public HashMap getChapterQuestionMap() {
        return this.chapterQuestionMap;
    }

    public Object getMapItem(String key) {
        return this.chapterQuestionMap.get(key);
    }

    public HashMap getQuestionAnswerMap() {
        return this.questionAnswerMap;
    }

    public Object getAnswerMapItem(String key) {
        return this.questionAnswerMap.get(key);
    }
}

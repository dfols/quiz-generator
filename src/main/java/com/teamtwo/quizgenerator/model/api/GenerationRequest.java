package com.teamtwo.quizgenerator.model.api;

public class GenerationRequest {
    private Long subjectId;
    private int fromChapter;
    private int toChapter;
    private int numberOfQuestions;

    public Long getSubjectId() {
        return this.subjectId;
    }

    public void setSubjectId(Long sub_id) {
        this.subjectId = sub_id;
    }

    public int getFromChapter() {
        return fromChapter;
    }

    public void setFromChapter(int fromChapter) {
        this.fromChapter = fromChapter;
    }

    public int getToChapter() {
        return toChapter;
    }

    public void setToChapter(int toChapter) {
        this.toChapter = toChapter;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}

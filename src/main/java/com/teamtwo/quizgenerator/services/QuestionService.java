package com.teamtwo.quizgenerator.services;

import com.teamtwo.quizgenerator.repository.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.question.Question;
import com.teamtwo.quizgenerator.model.question.TextBook;
import com.teamtwo.quizgenerator.model.question.QuestionManagement;
import com.teamtwo.quizgenerator.model.subject.Subject;

@Service
public class QuestionService {
    
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SubjectService subjectService;

    @Autowired
    ChapterService chapterService;

    @Autowired
    AnswerService answerService;

    @Autowired
    QuestionRepository questionRepo;

    public List<QuestionManagement> getQuestions(String username){
        List<Subject> subs = subjectService.findAllByUserName(username);
        List<QuestionManagement> questionManagements = new ArrayList<QuestionManagement>();

        for(Subject sub : subs) {
            List<Chapter> chaps = chapterService.getAllChaptersBySubjectId(sub.getSubjectId());

            for(Chapter chap : chaps) {
                List<Question> questions = questionRepo.findAllByChapterId(chap.getChapterId());

                for(Question q : questions) {
                    QuestionManagement qm = new QuestionManagement();
                    qm.setChapterId(chap.getChapterId());
                    qm.setSubjectId(sub.getSubjectId());
                    qm.setQuestion(q);
                    qm.setAnswers(answerService.getAllAnswersByQuestionId(q.getQuestionId()));
                    questionManagements.add(qm);
                }
            }

        }
        return questionManagements;
    }
    public List<TextBook> getQuestionsByUsername(String username){
        List<Subject> subs = subjectService.findAllByUserName(username);
        List<TextBook> textbooks = new ArrayList<TextBook>();

        for(Subject sub : subs) {
            TextBook tb = new TextBook();

            tb.setSubject(sub);
            tb.setChapters(chapterService.getAllChaptersBySubjectId(sub.getSubjectId()));
            
            for(Chapter chap : tb.getChapters()){
                List<Question> questions = questionRepo.findAllByChapterId(chap.getChapterId());
                tb.addMapItem(chap.getChapterTitle(), questions);
                
                for (Question q : questions) {
                    tb.addAnswerMapItem(q.getQuestionId().toString(), answerService.getAllAnswersByQuestionId(q.getQuestionId()));
                }
            }

            System.out.println("map: " + tb.getChapterQuestionMap());
            textbooks.add(tb);
        }

        return textbooks;
    }

    public List<Question> getAllQuestionsByChapterId(Long chapterId){
        return questionRepo.findAllByChapterId(chapterId);
    }
    
    public List<Question> getAllQuestions(){
        return questionRepo.findAll();
    }
}

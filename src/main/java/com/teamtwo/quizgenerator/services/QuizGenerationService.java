package com.teamtwo.quizgenerator.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Set;

import com.teamtwo.quizgenerator.model.api.GenerationRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.question.Question;
import com.teamtwo.quizgenerator.model.answer.Answer;
import com.teamtwo.quizgenerator.model.quiz.Quiz;

@Service
public class QuizGenerationService {
    @Autowired
    private ChapterService chapterService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerService answerService;

    public Quiz generateQuiz(GenerationRequest request) {
        // get all chapters by subject id
        List<Chapter> chapters = chapterService.getAllChaptersBySubjectId(request.getSubjectId());
        List<Question> questions = new ArrayList<>();

        for (int i = request.getFromChapter() - 1; i < request.getToChapter(); i++) {
            if (i < chapters.size()) {
                questions.addAll(questionService.getAllQuestionsByChapterId(chapters.get(i).getChapterId()));
            }
        }

        return collectQuestions(questions, request.getNumberOfQuestions());
    }

    private Quiz collectQuestions(List<Question> questions, int numberOfQuestions) {
        Set<Integer> chosenIndicies = new HashSet<Integer>();
        Quiz quiz = new Quiz();
        Map<Long, List<Answer>> questionAnswerMap = new HashMap<>();

        int i = 0;
        int safety = 0;
        while (i < numberOfQuestions && safety < numberOfQuestions) {
            int index = (int) ((Math.random() * (questions.size() - 0)) + 0);

            if (!chosenIndicies.contains(index)) {
                Question q = questions.get(index);
                List<Answer> answers = answerService.getAllAnswersByQuestionId(q.getQuestionId());
                if (!answers.isEmpty()) {
                    questionAnswerMap.put(q.getQuestionId(), answers);
                    quiz.addQuestion(q);

                    chosenIndicies.add(index);
                    i++;
                }
                safety++;
            }
        }

        quiz.setQuestionAnswerMap(questionAnswerMap);
        return quiz;
    }
}

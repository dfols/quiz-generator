package com.teamtwo.quizgenerator.services;

import java.util.Optional;
import java.util.List;

import com.teamtwo.quizgenerator.model.answer.Answer;
import com.teamtwo.quizgenerator.model.question.Question;
import com.teamtwo.quizgenerator.repository.AnswerRepository;
import com.teamtwo.quizgenerator.repository.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
    @Autowired
    private AnswerRepository answerRepo;

    @Autowired
    private QuestionRepository questionRepo;


    public Answer processSave(Answer newAnswer){
       if(newAnswer.getQuestion().getQuestion().isEmpty()){
            //get the question from passed in id
            Optional<Question> question = questionRepo.findById(newAnswer.getQuestion().getQuestionId()); //

            //check if object was found
            if(question.isPresent()){
            //add it to new answer object
                newAnswer.setQuestion(question.get());
            } else
                return null; //if not found
               

            //return the new answer
            return answerRepo.save(newAnswer);
        } else{
            //return the new answer
           return answerRepo.save(newAnswer);
        }
    }
    
    public List<Answer> getAllAnswersByQuestionId(Long questionId){
        return answerRepo.findAllByQuestionQuestionId(questionId);
    }
}

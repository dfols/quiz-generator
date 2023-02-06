package com.teamtwo.quizgenerator.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.teamtwo.quizgenerator.model.answer.Answer;
import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.repository.AnswerRepository;
import com.teamtwo.quizgenerator.services.AnswerService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/answer")
public class AnswerController {
    private static Logger logger = LogManager.getLogger(AnswerController.class);

    @Autowired
    private AnswerRepository answerRepo;

    @Autowired
    private AnswerService answerService;
    
    @GetMapping(value="/all", produces = "application/json")
    public ResponseEntity getAllAnswers() {
        logger.info("getting all answers");
        try{
            // attempt to get
            return ResponseEntity.ok(answerRepo.findAll());
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting all answers: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/answers/{question_id}", produces = "application/json")
    public ResponseEntity getAnswersByQuestionId(@PathVariable Long question_id) {
        logger.info("getting answers by questionId");
        try{
            // attempt to get
            return ResponseEntity.ok(answerRepo.findAllByQuestionQuestionId(question_id));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting chapter by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @PutMapping(produces = "application/json")
    public ResponseEntity UpdateAnswer(@RequestBody Answer newAnswer) {
        return answerRepo.findById(newAnswer.getId())
        .map(answer -> {
            // update question details
            answer.setAnswer(newAnswer.getAnswer());
            answer.setCorrectAnswer(newAnswer.getCorrectAnswer());
            try{
                // attempt to save
               return ResponseEntity.ok().body(answerRepo.save(answer)); 
            } catch (Exception e){
                //handle error when saving
                logger.error(e.getMessage());
                String errorString = "Error when creating question: " + e.getMessage();
                return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
            } 
        })
        .orElseGet(() -> {
            try{
                // attempt to save
                return ResponseEntity.ok().body(answerRepo.save(newAnswer)); 
             } catch (Exception e){
                 // handle error when saving 
                 logger.error(e.getMessage());
                 String errorString = "Error when creating question: " + e.getMessage();
                 return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
             }
        });
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity createAnswer(@RequestBody Answer answer) {
        try {
            Answer newAnswer = answerService.processSave(answer);

            if(newAnswer == null)
                throw new Exception("Subject not found by id: " + answer.getQuestion().getQuestionId());
            // attempt to save
            return ResponseEntity.ok().body(newAnswer);
        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating chapter: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    @DeleteMapping(value="/{id}", produces = "application/json")
    public ResponseEntity deleteQuestionById(@PathVariable Long id) {
        logger.info("deleting answer by id");
        try {
            // attempt to delete
            answerRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            // handle error when deleting
            logger.error(e.getMessage());
            String errorString = "Error when deleting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }
}

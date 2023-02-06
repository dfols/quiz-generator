package com.teamtwo.quizgenerator.controller;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.question.Question;
import com.teamtwo.quizgenerator.repository.QuestionRepository;
import com.teamtwo.quizgenerator.services.QuestionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/question")
public class QuestionController {
    private static Logger logger = LogManager.getLogger(QuestionController.class);

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private QuestionService questionService;
    
    @GetMapping(value="/{question_id}", produces = "application/json")
    public ResponseEntity getQuestionById(@PathVariable Long question_id) {
        logger.info("getting question by id");
        try{
            // attempt to get
            return ResponseEntity.ok(questionRepo.findById(question_id));
        } catch (Exception e){ 
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/name/{question}", produces = "application/json")
    public ResponseEntity getQuestionByQuestion(@PathVariable String question) {
        logger.info("getting question by question");
        try{
            // attempt to get
            return ResponseEntity.ok(questionRepo.findByQuestion(question));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/chapter/{chapter_id}", produces = "application/json")
    public ResponseEntity getQuestionByChapterId(@PathVariable Long chapter_id) {
        logger.info("getting question by question");
        try{
            // attempt to get
            return ResponseEntity.ok(questionRepo.findAllByChapterId(chapter_id));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/all/{username}", produces = "application/json")
    public ResponseEntity getAllQuestionsByUsername(@PathVariable String username) {
        logger.info("getting question by username");
        try{
            // attempt to get
            //return ResponseEntity.ok(questionService.getQuestionsByUsername(username));
            return ResponseEntity.ok(questionService.getQuestions(username));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/all", produces = "application/json")
    public ResponseEntity getAllQuestions() {
        logger.info("getting question by question");
        try{
            // attempt to get
            return ResponseEntity.ok(questionService.getAllQuestions());
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity createQuestion(@RequestBody Question newQuestion) {
        try {
            // attempt to save
            return ResponseEntity.ok().body(questionRepo.save(newQuestion));
        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating question: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    @PutMapping(produces = "application/json")
    public ResponseEntity UpdateQuestion(@RequestBody Question newQuestion) {
        System.out.println("points: " + newQuestion.getPointValue());
        // update or insert a question
        return questionRepo.findById(newQuestion.getQuestionId())
        .map(question -> {
            // update question details
            question.setQuestion(newQuestion.getQuestion());
            question.setQuestionType(newQuestion.getQuestionType());
            question.setPointValue(newQuestion.getPointValue());
            try{
                // attempt to save
               return ResponseEntity.ok().body(questionRepo.save(question)); 
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
                return ResponseEntity.ok().body(questionRepo.save(newQuestion)); 
             } catch (Exception e){
                 // handle error when saving 
                 logger.error(e.getMessage());
                 String errorString = "Error when creating question: " + e.getMessage();
                 return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
             }
        });
    }

    @DeleteMapping(value="/{question_id}", produces = "application/json")
    public ResponseEntity deleteQuestionById(@PathVariable Long question_id) {
        logger.info("deleting question by id");
        try {
            // attempt to delete
            questionRepo.deleteById(question_id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            // handle error when deleting
            logger.error(e.getMessage());
            String errorString = "Error when deleting question by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }
}

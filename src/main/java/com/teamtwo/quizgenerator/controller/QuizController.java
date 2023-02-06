package com.teamtwo.quizgenerator.controller;

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.api.GenerationRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamtwo.quizgenerator.services.QuizGenerationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/quiz")
public class QuizController {

    @Autowired
    private QuizGenerationService generationService;

    @PostMapping(produces = "application/json")
    public ResponseEntity generateQuiz(@RequestBody GenerationRequest quiz) {
        try {
            // attempt to generate a quiz
            return ResponseEntity.ok().body(generationService.generateQuiz(quiz));
        } catch (Exception e){
            //handle error when saving 
            //logger.error(e.getMessage());
            String errorString = "Error when creating question: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }
    
}

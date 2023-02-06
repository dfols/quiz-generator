package com.teamtwo.quizgenerator.controller;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.subject.Subject;
import com.teamtwo.quizgenerator.repository.SubjectRepository;
import com.teamtwo.quizgenerator.services.SubjectService;


@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/v1/subject")
public class SubjectController {

    private static Logger logger = LogManager.getLogger(SubjectController.class);

    @Autowired
    private SubjectRepository subjectrepo;

    @Autowired
    private SubjectService subjectService;

    @PostMapping(produces = "application/json")
    public ResponseEntity createSubject(@RequestBody Subject sub) {
        try {
            // attempt to save
            return ResponseEntity.ok().body(subjectService.processSubjectCreation(sub));

        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating subject: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }


    @PostMapping(value="/{chapterNums}", produces = "application/json")
    public ResponseEntity createSubjectWithChapters(@RequestBody Subject sub, @PathVariable int chapterNums) {
        try {
            // attempt to save
            return ResponseEntity.ok().body(subjectService.processSubjectCreation(sub, chapterNums));

        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating subject: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    @GetMapping(value="/all", produces = "application/json")
    public ResponseEntity createSubjectWithChapters() {
        try {
            // attempt to save
            return ResponseEntity.ok().body(subjectService.findAll());

        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating subject: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    @GetMapping(value="/{subject_id}", produces = "application/json")
    public ResponseEntity getSubjectById(@PathVariable Long subject_id) {
        logger.info("getting subject by id");
        try{
            // attempt to get
            return ResponseEntity.ok(subjectrepo.findById(subject_id));
        } catch (Exception e){ 
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting subject by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/subjects/{username}", produces = "application/json")
    public ResponseEntity getSubjectByUsername(@PathVariable String username) {
        logger.info("getting all subjects by username");
        try{
            // attempt to get
            return ResponseEntity.ok(subjectService.findAllByUserName(username));
        } catch (Exception e){ 
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting all subjects by username " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }


}
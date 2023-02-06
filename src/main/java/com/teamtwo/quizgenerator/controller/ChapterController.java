package com.teamtwo.quizgenerator.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.repository.ChapterRepository;
import com.teamtwo.quizgenerator.services.ChapterService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/chapter")
public class ChapterController {
    private static Logger logger = LogManager.getLogger(ChapterController.class);

    @Autowired
    private ChapterRepository chapterRepo;

    @Autowired
    private ChapterService chapterService;

    @GetMapping(value="/{id}", produces = "application/json")
    public ResponseEntity getChapterById(@PathVariable Long id) {
        logger.info("getting user by id");
        try{
            // attempt to get
            return ResponseEntity.ok(chapterRepo.findById(id));
        } catch (Exception e){ 
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting user by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/title/{title}", produces = "application/json")
    public ResponseEntity getChapterByTitle(@PathVariable String title) {
        logger.info("getting chapter by title");
        try{
            // attempt to get
            return ResponseEntity.ok(chapterRepo.findByChapterTitle(title));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting chapter by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/all", produces = "application/json")
    public ResponseEntity getAllChapters() {
        logger.info("getting all chapters");
        try{
            // attempt to get
            return ResponseEntity.ok(chapterRepo.findAll());
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting all chapters: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @GetMapping(value="/chapters/{subject_id}", produces = "application/json")
    public ResponseEntity getChaptersBySubjectId(@PathVariable Long subject_id) {
        logger.info("getting chapters by subjectId");
        try{
            // attempt to get
            return ResponseEntity.ok(chapterRepo.findAllBySubjectSubjectId(subject_id));
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting chapter by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity createChapter(@RequestBody Chapter newChapter) {
        try {
            newChapter = chapterService.processSave(newChapter);
            if(newChapter == null)
                throw new Exception("Subject not found by id: " + newChapter.getSubject().getSubjectId());
            // attempt to save
            return ResponseEntity.ok().body(chapterRepo.save(newChapter));
        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating chapter: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    @PutMapping(produces = "application/json")
    public ResponseEntity updateChapter(@RequestBody Chapter newChapter) {
        // update or insert a user
        return chapterRepo.findById(newChapter.getChapterId())
        .map(chapter -> {
            // update user details
            chapter.setChapterTitle(newChapter.getChapterTitle());
            chapter.setSubject(newChapter.getSubject());
            try{
                // attempt to save
               return ResponseEntity.ok().body(chapterRepo.save(chapter)); 
            } catch (Exception e){
                //handle error when saving
                logger.error(e.getMessage());
                String errorString = "Error when creating chapter: " + e.getMessage();
                return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
            } 
        })
        .orElseGet(() -> {
            try{
                // attempt to save
                return ResponseEntity.ok().body(chapterRepo.save(newChapter)); 
             } catch (Exception e){
                 // handle error when saving 
                 logger.error(e.getMessage());
                 String errorString = "Error when creating user: " + e.getMessage();
                 return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
             }
        });
    }

    @DeleteMapping(value="/{id}", produces = "application/json")
    public ResponseEntity deleteChapterById(@PathVariable Long id) {
        logger.info("deleting user by id");
        try {
            // attempt to delete
            chapterRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            // handle error when deleting
            logger.error(e.getMessage());
            String errorString = "Error when deleting chapter by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }
}

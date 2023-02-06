package com.teamtwo.quizgenerator.services;

import java.util.Optional;

import com.teamtwo.quizgenerator.repository.SubjectRepository;
import com.teamtwo.quizgenerator.repository.ChapterRepository;
import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.subject.Subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterService {
    
    @Autowired
    private ChapterRepository chapterRepo;

    @Autowired
    private SubjectRepository subRepo;

    public Chapter processSave(Chapter newChap){
        if(newChap.getSubject().getSubjectName().equals("")){
            //get the subject from passed in id
            Optional<Subject> sub = subRepo.findById(newChap.getSubject().getSubjectId());

            //check if object was found
            if(sub.isPresent()){
                //add it to new chapter object
                newChap.setSubject(sub.get());
            } else
                //return null if not found
                return null;

            //return the new chapter
            return chapterRepo.save(newChap);
        } else{
            //return the new chapter
            return chapterRepo.save(newChap);
        }
    }


    public List<Chapter> getAllChaptersBySubjectId(Long subjectId){
        return chapterRepo.findAllBySubjectSubjectId(subjectId);
    }

}

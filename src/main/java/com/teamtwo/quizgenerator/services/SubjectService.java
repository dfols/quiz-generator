package com.teamtwo.quizgenerator.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtwo.quizgenerator.model.subject.Subject;
import com.teamtwo.quizgenerator.model.chapter.Chapter;
import com.teamtwo.quizgenerator.model.user.User;
import com.teamtwo.quizgenerator.repository.SubjectRepository;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepo;

    @Autowired
    private ChapterService chapterService;
    
    @Autowired
    private UserService userService;

    public Subject processSubjectCreation(Subject sub) {
        User user = (User) userService.getUserById(sub.getUser().getId()).getBody();
        if (user == null)
            return null;

        sub.setUser(user);
        Subject result = subjectRepo.saveAndFlush(sub);

        return result;
    }

    public List<Subject> findAll(){
        return subjectRepo.findAll();
    }

    public List<Subject> findAllByUserName(String username) {
        return subjectRepo.findAllByUserUsername(username);
    }

    public Subject processSubjectCreation(Subject sub, int chapterNums) {
        User user = (User) userService.getUserById(sub.getUser().getId()).getBody();
        if (user == null)
            return null;

        sub.setUser(user);

        Subject result = subjectRepo.saveAndFlush(sub);

        for(int i = 1; i <= chapterNums; i++){
            Chapter chap = new Chapter(sub, "Chapter: " + i);
            chapterService.processSave(chap);
        }

        return result;
    }
}

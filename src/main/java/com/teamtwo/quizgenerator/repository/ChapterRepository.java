package com.teamtwo.quizgenerator.repository;

import com.teamtwo.quizgenerator.model.chapter.Chapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long>{
    public Optional<Chapter> findByChapterTitle(String title);

    public List<Chapter> findAllBySubjectSubjectId(Long subject_id);
}

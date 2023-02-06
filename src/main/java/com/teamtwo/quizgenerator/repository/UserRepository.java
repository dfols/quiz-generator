package com.teamtwo.quizgenerator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.teamtwo.quizgenerator.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByUsername(String username);

    //TODO add support for find by hashing maybe for login functionality?
}


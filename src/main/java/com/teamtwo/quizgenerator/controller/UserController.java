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

import com.teamtwo.quizgenerator.model.user.User;
import com.teamtwo.quizgenerator.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/user")
public class UserController {
    private static Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    
    @GetMapping(value="/{id}", produces = "application/json")
    public ResponseEntity getUserById(@PathVariable Long id) {
        logger.info("getting user by id");
        // attempt to get
        return userService.getUserById(id);
    }

    @GetMapping(value="/name/{username}", produces = "application/json")
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        logger.info("getting user by username");
        return userService.getUserByUsername(username);
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity createUser(@RequestBody User newUser) {
        return userService.saveUser(newUser);
    }

    @PutMapping(produces = "application/json")
    public ResponseEntity UpdateUser(@RequestBody User newUser) {
        return userService.processPut(newUser);
    }

    @DeleteMapping(value="/{id}", produces = "application/json")
    public ResponseEntity deleteUserById(@PathVariable Long id) {
        logger.info("deleting user by id");
        return userService.deleteById(id);
    }
    
}

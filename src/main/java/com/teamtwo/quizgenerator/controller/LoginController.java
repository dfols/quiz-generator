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

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.user.User;
import com.teamtwo.quizgenerator.model.login.AuthenticationRequest;
import com.teamtwo.quizgenerator.services.LoginService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/v1/login")
public class LoginController {

    @Autowired
    private LoginService service;
    //TODO Add controller advice for more central error handling

    private static Logger logger = LogManager.getLogger(LoginController.class.getName());

    @PostMapping(value="/authenticate", produces = "application/json")
    public ResponseEntity Login(@RequestBody AuthenticationRequest request) {
        try{
            User authenticatedUser = service.AuthenticateUser(request.getUsername(), request.getPassword());
            
            if(authenticatedUser == null){
                String errorString = "Invalid username and password combination.";
                return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST));
            }
            return ResponseEntity.ok().body(authenticatedUser);

        } catch (Exception e){
            logger.error("exception caught, user is not authenticated");
            logger.error("exception: " + e);
            String errorString = "Error when getting user by id: " + e.getMessage();
            return ResponseEntity.internalServerError().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}

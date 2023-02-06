package com.teamtwo.quizgenerator.services;

import java.util.Optional;

import com.teamtwo.quizgenerator.model.api.ErrorResponse;
import com.teamtwo.quizgenerator.model.user.User;
import com.teamtwo.quizgenerator.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@Service
public class UserService {
    private static Logger logger = LogManager.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepo;

    public ResponseEntity getUserById(Long userId){
        try{
            // attempt to get
            return ResponseEntity.ok(userRepo.findById(userId).get());
        } catch (Exception e){ 
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting user by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    public ResponseEntity getUserByUsername(String username){
        try{
            // attempt to get
            return ResponseEntity.ok(userRepo.findByUsername(username).get());
        } catch (Exception e){
            //handle error
            logger.error(e.getMessage());
            String errorString = "Error when getting user by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.INTERNAL_SERVER_ERROR)); 
        }
    }

    public ResponseEntity saveUser(User user){
        try {
            return ResponseEntity.ok().body(userRepo.save(user));
        } catch (Exception e){
            //handle error when saving 
            logger.error(e.getMessage());
            String errorString = "Error when creating user: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    public ResponseEntity deleteById(Long id){
        try {
            userRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            // handle error when deleting
            logger.error(e.getMessage());
            String errorString = "Error when deleting user by id: " + e.getMessage();
            return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
        }
    }

    public ResponseEntity processPut(User user){
        // update or insert a user
        return userRepo.findById(user.getId())
        .map(newUser -> {
            // update user details
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            try{
                // attempt to save
               return ResponseEntity.ok().body(userRepo.save(user)); 
            } catch (Exception e){
                //handle error when saving
                logger.error(e.getMessage());
                String errorString = "Error when creating user: " + e.getMessage();
                return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
            } 
        })
        .orElseGet(() -> {
            try{
                // attempt to save
                return ResponseEntity.ok().body(userRepo.save(user)); 
             } catch (Exception e){
                 // handle error when saving 
                 logger.error(e.getMessage());
                 String errorString = "Error when creating user: " + e.getMessage();
                 return ResponseEntity.badRequest().body(new ErrorResponse(errorString, HttpStatus.BAD_REQUEST)); 
             }
        });
    }
    
}

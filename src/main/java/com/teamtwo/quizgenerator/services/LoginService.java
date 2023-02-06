package com.teamtwo.quizgenerator.services;

import com.teamtwo.quizgenerator.model.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.commons.codec.binary.Base64;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@Service
public class LoginService {

    @Autowired
    private UserService userService;

    private static Logger logger = LogManager.getLogger(LoginService.class.getName());

    public User AuthenticateUser(String username, String password){
        User user = (User) userService.getUserByUsername(username).getBody();

        if(authenticate(user, username, decryptPassword(password))){
            //omit password for return value
            user.setPassword("********");
            logger.info("user is authenticated");
            return user;
        }
        logger.info("user is not authenticated");
        //return null if user is not authenticated or found
        return null;
    }

    // methodize username password check 
    public Boolean authenticate(User user, String username, String password){
        return (user != null && (user.getUsername().equals(username)) && (user.getPassword().equals(password)));
    }

    private String decryptPassword(String password) {
        return new String(Base64.decodeBase64(password));
    }
}

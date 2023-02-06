package com.teamtwo.quizgenerator.model.api;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    HttpStatus statusCode;
    String error;

    public ErrorResponse(String error, HttpStatus status){
        this.statusCode = status;
        this.error = error;
    }

    public String getError(){
        return this.error;
    }

    public void setError(String errorString){
        this.error = errorString;
    }

    public HttpStatus getStatus() {
        return this.statusCode;
    }

    public void setStatus(HttpStatus status) {
        this.statusCode = status;
    }
}

package com.skateshop.backend.config;

import com.skateshop.backend.exception.InsufficientStockException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<Object> handleBadRequestException(ResponseStatusException ex) {
        return new ResponseEntity<>(ex.getReason(), ex.getStatus());
    }
}

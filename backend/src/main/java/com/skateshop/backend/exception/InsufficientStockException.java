package com.skateshop.backend.exception;

public class InsufficientStockException extends Exception{
        public InsufficientStockException(String errorMessage) {
            super(errorMessage);
        }
}

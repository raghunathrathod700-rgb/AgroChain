package com.agrochain.exception;

/**
 * Thrown for invalid input or business rule violations (HTTP 400).
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}

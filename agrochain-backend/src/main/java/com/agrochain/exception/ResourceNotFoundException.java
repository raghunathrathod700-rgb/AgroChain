package com.agrochain.exception;

/**
 * Thrown when a referenced entity does not exist.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}

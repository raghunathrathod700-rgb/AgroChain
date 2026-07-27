package com.agrochain.exception;

/**
 * Thrown when the authenticated user is not allowed to perform an action.
 */
public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }
}

package com.agrochain.dto.user;

/** Minimal user card for chat headers (no phone). */
public record UserPublicResponse(Long id, String firstName, String lastName, String email) {
}

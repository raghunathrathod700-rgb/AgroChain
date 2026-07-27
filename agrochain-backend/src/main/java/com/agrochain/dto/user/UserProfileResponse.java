package com.agrochain.dto.user;

import java.util.Set;

/** Safe profile view without phone numbers. */
public record UserProfileResponse(Long id, String email, String firstName, String lastName, Set<String> roles) {
}

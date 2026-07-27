package com.agrochain.dto.user;

import java.util.Set;

/** Admin-only user row including operational flags and contact. */
public record AdminUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String phone,
        boolean blocked,
        boolean enabled,
        Set<String> roles
) {
}

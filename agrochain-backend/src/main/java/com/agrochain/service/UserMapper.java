package com.agrochain.service;

import com.agrochain.dto.user.AdminUserResponse;
import com.agrochain.dto.user.UserProfileResponse;
import com.agrochain.dto.user.UserPublicResponse;
import com.agrochain.model.entity.User;

import java.util.stream.Collectors;

/**
 * Maps {@link User} entities to API DTOs (never includes phone in public/profile views).
 */
public final class UserMapper {

    private UserMapper() {
    }

    public static UserProfileResponse toProfile(User u) {
        return new UserProfileResponse(
                u.getId(),
                u.getEmail(),
                u.getFirstName(),
                u.getLastName(),
                u.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet())
        );
    }

    public static UserPublicResponse toPublic(User u) {
        return new UserPublicResponse(u.getId(), u.getFirstName(), u.getLastName(), u.getEmail());
    }

    public static AdminUserResponse toAdmin(User u) {
        return new AdminUserResponse(
                u.getId(),
                u.getEmail(),
                u.getFirstName(),
                u.getLastName(),
                u.getPhone(),
                u.isBlocked(),
                u.isEnabled(),
                u.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet())
        );
    }

    public static String displayName(User u) {
        return u.getFirstName() + " " + u.getLastName();
    }
}

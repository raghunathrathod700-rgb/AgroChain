package com.agrochain.dto.auth;

import com.agrochain.dto.user.UserProfileResponse;

public record AuthResponse(String accessToken, String tokenType, UserProfileResponse user) {

    public static AuthResponse of(String jwt, UserProfileResponse user) {
        return new AuthResponse(jwt, "Bearer", user);
    }
}

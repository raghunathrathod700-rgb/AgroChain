package com.agrochain.controller;

import com.agrochain.dto.user.UserProfileResponse;
import com.agrochain.dto.user.UserUpdateRequest;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authenticated user profile (no phone in response body).
 */
@RestController
@RequestMapping("/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserProfileResponse me() {
        return userService.getProfile(SecurityUtil.requireCurrentUserEmail());
    }

    @PutMapping("/me")
    public UserProfileResponse updateMe(@Valid @RequestBody UserUpdateRequest request) {
        return userService.updateProfile(SecurityUtil.requireCurrentUserEmail(), request);
    }
}

package com.agrochain.controller;

import com.agrochain.dto.auth.AuthResponse;
import com.agrochain.dto.auth.ForgotPasswordRequest;
import com.agrochain.dto.auth.ForgotPasswordResponse;
import com.agrochain.dto.auth.LoginRequest;
import com.agrochain.dto.auth.RegisterRequest;
import com.agrochain.dto.auth.ResetPasswordRequest;
import com.agrochain.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public authentication endpoints (JWT bearer tokens).
 */
@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/forgot-password")
    public ForgotPasswordResponse forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return authService.requestPasswordReset(request);
    }

    @PostMapping("/reset-password")
    public ForgotPasswordResponse resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }
}

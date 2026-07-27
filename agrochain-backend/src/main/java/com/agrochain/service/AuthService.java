package com.agrochain.service;

import com.agrochain.dto.auth.AuthResponse;
import com.agrochain.dto.auth.ForgotPasswordRequest;
import com.agrochain.dto.auth.ForgotPasswordResponse;
import com.agrochain.dto.auth.LoginRequest;
import com.agrochain.dto.auth.RegisterRequest;
import com.agrochain.dto.auth.ResetPasswordRequest;
import com.agrochain.exception.BadRequestException;
import com.agrochain.model.entity.PasswordResetToken;
import com.agrochain.model.entity.Role;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.PasswordResetTokenRepository;
import com.agrochain.repository.RoleRepository;
import com.agrochain.repository.UserRepository;
import com.agrochain.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Registration and JWT issuance for farmers and buyers.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;
    private final long resetTokenExpiryMinutes;

    public AuthService(
            UserRepository userRepository,
            PasswordResetTokenRepository passwordResetTokenRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider,
            UserDetailsService userDetailsService,
            @Value("${app.auth.reset-token-expiry-minutes:30}") long resetTokenExpiryMinutes
    ) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
        this.resetTokenExpiryMinutes = resetTokenExpiryMinutes;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmailIgnoreCase(req.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        RoleName roleName;
        if ("FARMER".equals(req.getRole())) {
            roleName = RoleName.ROLE_FARMER;
        } else if ("BUYER".equals(req.getRole())) {
            roleName = RoleName.ROLE_BUYER;
        } else {
            throw new BadRequestException("Invalid role for self-registration");
        }
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new BadRequestException("Role not configured — run data seeder"));

        User user = new User();
        user.setEmail(req.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName().trim());
        user.setLastName(req.getLastName().trim());
        user.setPhone(req.getPhone() != null ? req.getPhone().trim() : null);
        user.setBlocked(false);
        user.setEnabled(true);
        user.setRoles(Set.of(role));
        userRepository.save(user);

        UserDetails ud = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtTokenProvider.generateToken(ud);
        return AuthResponse.of(token, UserMapper.toProfile(user));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().trim().toLowerCase(), req.getPassword())
        );
        UserDetails ud = userDetailsService.loadUserByUsername(req.getEmail().trim().toLowerCase());
        User user = userRepository.findByEmailIgnoreCase(req.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadRequestException("User not found"));
        String token = jwtTokenProvider.generateToken(ud);
        return AuthResponse.of(token, UserMapper.toProfile(user));
    }

    @Transactional
    public ForgotPasswordResponse requestPasswordReset(ForgotPasswordRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        Optional<User> maybeUser = userRepository.findByEmailIgnoreCase(normalizedEmail);
        if (maybeUser.isEmpty()) {
            return ForgotPasswordResponse.of(
                    "If your account exists, a password reset token has been generated.",
                    null
            );
        }

        User user = maybeUser.get();
        passwordResetTokenRepository.deleteByUserAndUsedFalse(user);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(UUID.randomUUID().toString().replace("-", ""));
        resetToken.setCreatedAt(LocalDateTime.now());
        resetToken.setExpiresAt(LocalDateTime.now().plus(resetTokenExpiryMinutes, ChronoUnit.MINUTES));
        resetToken.setUsed(false);
        passwordResetTokenRepository.save(resetToken);

        return ForgotPasswordResponse.of(
                "Reset token generated. Use this token to set a new password.",
                resetToken.getToken()
        );
    }

    @Transactional
    public ForgotPasswordResponse resetPassword(ResetPasswordRequest req) {
        PasswordResetToken token = passwordResetTokenRepository
                .findByTokenAndUsedFalse(req.getToken().trim())
                .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Reset token has expired. Please request a new one.");
        }

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        token.setUsed(true);
        token.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(token);
        passwordResetTokenRepository.deleteByUserAndUsedFalse(user);

        return ForgotPasswordResponse.of("Password reset successful. You can now sign in.", null);
    }
}

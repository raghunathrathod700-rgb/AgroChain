package com.agrochain.repository;

import com.agrochain.model.entity.PasswordResetToken;
import com.agrochain.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenAndUsedFalse(String token);

    void deleteByUserAndUsedFalse(User user);
}

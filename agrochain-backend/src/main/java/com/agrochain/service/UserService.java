package com.agrochain.service;

import com.agrochain.dto.user.UserProfileResponse;
import com.agrochain.dto.user.UserUpdateRequest;
import com.agrochain.exception.ResourceNotFoundException;
import com.agrochain.model.entity.User;
import com.agrochain.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Profile reads/updates for authenticated users.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public User requireByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional(readOnly = true)
    public User requireById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(String email) {
        return UserMapper.toProfile(requireByEmail(email));
    }

    @Transactional
    public UserProfileResponse updateProfile(String email, UserUpdateRequest req) {
        User u = requireByEmail(email);
        if (req.getFirstName() != null) {
            u.setFirstName(req.getFirstName());
        }
        if (req.getLastName() != null) {
            u.setLastName(req.getLastName());
        }
        if (req.getPhone() != null) {
            u.setPhone(req.getPhone());
        }
        return UserMapper.toProfile(userRepository.save(u));
    }
}

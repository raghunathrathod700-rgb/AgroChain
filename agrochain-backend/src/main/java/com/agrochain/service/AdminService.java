package com.agrochain.service;

import com.agrochain.dto.admin.ActivityLogResponse;
import com.agrochain.dto.product.ProductResponse;
import com.agrochain.dto.user.AdminUserResponse;
import com.agrochain.model.entity.ActivityLog;
import com.agrochain.model.entity.User;
import com.agrochain.repository.ActivityLogRepository;
import com.agrochain.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ProductService productService;
    private final ActivityLogRepository activityLogRepository;
    private final ActivityLogService activityLogService;

    public AdminService(
            UserRepository userRepository,
            ProductService productService,
            ActivityLogRepository activityLogRepository,
            ActivityLogService activityLogService
    ) {
        this.userRepository = userRepository;
        this.productService = productService;
        this.activityLogRepository = activityLogRepository;
        this.activityLogService = activityLogService;
    }

    @Transactional(readOnly = true)
    public List<AdminUserResponse> listUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toAdmin)
                .toList();
    }

    @Transactional
    public AdminUserResponse setBlocked(Long userId, boolean blocked, Long actorId) {
        User user = userRepository.findById(Objects.requireNonNull(userId))
                .orElseThrow(() -> new com.agrochain.exception.ResourceNotFoundException("User not found"));
        user.setBlocked(blocked);
        User saved = userRepository.save(user);
        activityLogService.log(
                actorId,
                blocked ? "USER_BLOCKED" : "USER_UNBLOCKED",
                "Set blocked=" + blocked + " for user " + saved.getEmail(),
                "USER",
                saved.getId()
        );
        return UserMapper.toAdmin(saved);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listAllProducts() {
        return productService.listAllProductsAdmin();
    }

    @Transactional(readOnly = true)
    public List<ActivityLogResponse> recentActivity() {
        return activityLogRepository.findTop200ByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .toList();
    }

    private ActivityLogResponse toDto(ActivityLog log) {
        return new ActivityLogResponse(
                log.getId(),
                log.getActorUserId(),
                log.getAction(),
                log.getDetail(),
                log.getEntityType(),
                log.getEntityId(),
                log.getCreatedAt()
        );
    }
}

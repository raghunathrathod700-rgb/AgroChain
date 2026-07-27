package com.agrochain.service;

import com.agrochain.model.entity.ActivityLog;
import com.agrochain.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Persists audit entries for admin dashboards and compliance trails.
 */
@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public void log(Long actorUserId, String action, String detail, String entityType, Long entityId) {
        ActivityLog entry = new ActivityLog();
        entry.setActorUserId(actorUserId);
        entry.setAction(action);
        entry.setDetail(detail);
        entry.setEntityType(entityType);
        entry.setEntityId(entityId);
        activityLogRepository.save(entry);
    }
}

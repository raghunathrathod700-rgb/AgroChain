package com.agrochain.service;

import com.agrochain.dto.notification.NotificationResponse;
import com.agrochain.exception.ResourceNotFoundException;
import com.agrochain.model.entity.Notification;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.NotificationType;
import com.agrochain.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * In-app notifications for orders and chat (extensible to push/email later).
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public void notifyUser(User user, NotificationType type, String title, String body, Long relatedEntityId) {
        Notification n = new Notification();
        n.setUser(user);
        n.setType(type);
        n.setTitle(title);
        n.setBody(body);
        n.setRead(false);
        n.setRelatedEntityId(relatedEntityId);
        notificationRepository.save(n);
    }

    @Transactional
    public void notifyOrderPlaced(ProductOrder order) {
        User farmer = order.getProduct().getFarmer();
        notifyUser(
                farmer,
                NotificationType.ORDER_UPDATE,
                "New order received",
                "You received a new order #" + order.getId() + " for " + order.getProduct().getName(),
                order.getId()
        );
    }

    @Transactional
    public void notifyOrderStatusChanged(ProductOrder order) {
        notifyUser(
                order.getBuyer(),
                NotificationType.ORDER_UPDATE,
                "Order status updated",
                "Your order #" + order.getId() + " is now " + order.getStatus(),
                order.getId()
        );
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> listForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public void markRead(Long userId, Long notificationId) {
        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if (!n.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Notification not found");
        }
        n.setRead(true);
        notificationRepository.save(n);
    }

    @Transactional(readOnly = true)
    public long unreadCount(Long userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    private NotificationResponse toDto(Notification n) {
        return new NotificationResponse(
                n.getId(),
                n.getType(),
                n.getTitle(),
                n.getBody(),
                n.isRead(),
                n.getRelatedEntityId(),
                n.getCreatedAt()
        );
    }
}

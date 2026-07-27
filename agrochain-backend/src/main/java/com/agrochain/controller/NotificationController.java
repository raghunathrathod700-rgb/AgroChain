package com.agrochain.controller;

import com.agrochain.dto.notification.NotificationResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.NotificationService;
import com.agrochain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * User notification inbox (orders, chat, admin notices).
 */
@RestController
@RequestMapping("/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    public NotificationController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @GetMapping
    public List<NotificationResponse> list() {
        Long uid = userService.requireByEmail(SecurityUtil.requireCurrentUserEmail()).getId();
        return notificationService.listForUser(uid);
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unread() {
        Long uid = userService.requireByEmail(SecurityUtil.requireCurrentUserEmail()).getId();
        return Map.of("count", notificationService.unreadCount(uid));
    }

    @PostMapping("/{id}/read")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markRead(@PathVariable Long id) {
        Long uid = userService.requireByEmail(SecurityUtil.requireCurrentUserEmail()).getId();
        notificationService.markRead(uid, id);
    }
}

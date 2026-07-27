package com.agrochain.controller;

import com.agrochain.dto.message.MessageRequest;
import com.agrochain.dto.message.MessageResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Farmer–buyer messaging (no phone numbers in payloads).
 */
@RestController
@RequestMapping("/v1/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse send(@Valid @RequestBody MessageRequest request) {
        return messageService.send(SecurityUtil.requireCurrentUserEmail(), request);
    }

    @GetMapping("/with/{userId}")
    public List<MessageResponse> thread(@PathVariable Long userId) {
        return messageService.conversation(SecurityUtil.requireCurrentUserEmail(), userId);
    }

    @PostMapping("/read/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markRead(@PathVariable Long userId) {
        messageService.markConversationRead(SecurityUtil.requireCurrentUserEmail(), userId);
    }
}

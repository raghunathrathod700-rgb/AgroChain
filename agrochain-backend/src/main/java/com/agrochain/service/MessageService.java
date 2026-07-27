package com.agrochain.service;

import com.agrochain.dto.message.MessageRequest;
import com.agrochain.dto.message.MessageResponse;
import com.agrochain.exception.BadRequestException;
import com.agrochain.model.entity.Message;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.User;
import com.agrochain.repository.MessageRepository;
import com.agrochain.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;

    public MessageService(
            MessageRepository messageRepository,
            UserService userService,
            OrderRepository orderRepository
    ) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public MessageResponse send(String senderEmail, MessageRequest request) {
        User sender = userService.requireByEmail(senderEmail);
        User receiver = userService.requireById(request.getReceiverId());
        if (sender.getId().equals(receiver.getId())) {
            throw new BadRequestException("Cannot message yourself");
        }

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent().trim());
        if (request.getOrderId() != null) {
            ProductOrder order = orderRepository.findById(Objects.requireNonNull(request.getOrderId()))
                    .orElseThrow(() -> new com.agrochain.exception.ResourceNotFoundException("Order not found"));
            message.setOrder(order);
        }

        return toDto(messageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> conversation(String userEmail, Long otherUserId) {
        User user = userService.requireByEmail(userEmail);
        userService.requireById(otherUserId);
        return messageRepository.findConversation(user.getId(), otherUserId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public void markConversationRead(String userEmail, Long otherUserId) {
        User user = userService.requireByEmail(userEmail);
        List<Message> conversation = messageRepository.findConversation(user.getId(), otherUserId);
        boolean changed = false;
        for (Message message : conversation) {
            if (message.getReceiver().getId().equals(user.getId()) && !message.isRead()) {
                message.setRead(true);
                changed = true;
            }
        }
        if (changed) {
            for (Message message : conversation) {
                messageRepository.save(Objects.requireNonNull(message));
            }
        }
    }

    private MessageResponse toDto(Message message) {
        User sender = message.getSender();
        User receiver = message.getReceiver();
        return new MessageResponse(
                message.getId(),
                sender.getId(),
                UserMapper.displayName(sender),
                receiver.getId(),
                UserMapper.displayName(receiver),
                message.getContent(),
                message.getOrder() != null ? message.getOrder().getId() : null,
                message.isRead(),
                message.getCreatedAt()
        );
    }
}

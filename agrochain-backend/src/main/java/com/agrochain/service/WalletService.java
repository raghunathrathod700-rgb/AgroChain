package com.agrochain.service;

import com.agrochain.dto.wallet.AddMoneyRequest;
import com.agrochain.dto.wallet.TransactionResponse;
import com.agrochain.dto.wallet.WalletResponse;
import com.agrochain.exception.BadRequestException;
import com.agrochain.model.entity.User;
import com.agrochain.model.entity.Wallet;
import com.agrochain.model.entity.WalletTransaction;
import com.agrochain.model.enums.TransactionType;
import com.agrochain.repository.TransactionRepository;
import com.agrochain.repository.WalletRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserService userService;

    public WalletService(WalletRepository walletRepository, TransactionRepository transactionRepository, UserService userService) {
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
    }

    @Transactional
    public Wallet requireWalletForUser(User user) {
        return walletRepository.findByUserId(user.getId()).orElseGet(() -> {
            Wallet w = new Wallet();
            w.setUser(user);
            w.setBalance(BigDecimal.ZERO);
            return walletRepository.save(w);
        });
    }

    @Transactional(readOnly = true)
    public WalletResponse myWallet(String email) {
        User u = userService.requireByEmail(email);
        Wallet w = requireWalletForUser(u);
        return new WalletResponse(w.getId(), u.getId(), w.getBalance());
    }

    @Transactional
    public WalletResponse addMoney(String email, AddMoneyRequest req) {
        User u = userService.requireByEmail(email);
        Wallet w = requireWalletForUser(u);
        BigDecimal amount = req.getAmount();
        if (amount == null || amount.signum() <= 0) {
            throw new BadRequestException("Amount must be positive");
        }
        BigDecimal newBal = w.getBalance().add(amount);
        w.setBalance(newBal);
        walletRepository.save(w);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(w);
        tx.setType(TransactionType.CREDIT);
        tx.setAmount(amount);
        tx.setBalanceAfter(newBal);
        tx.setReferenceType("TOPUP");
        tx.setDescription("Wallet top-up (testing)");
        transactionRepository.save(tx);

        return new WalletResponse(w.getId(), u.getId(), w.getBalance());
    }

    @Transactional(readOnly = true)
    public List<TransactionResponse> myTransactions(String email) {
        User u = userService.requireByEmail(email);
        Wallet w = requireWalletForUser(u);
        return transactionRepository.findByWalletIdOrderByCreatedAtDesc(w.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public void debitOrThrow(User user, BigDecimal amount, String referenceType, Long referenceId, String description) {
        Wallet w = requireWalletForUser(user);
        if (amount == null || amount.signum() <= 0) {
            throw new BadRequestException("Invalid amount");
        }
        BigDecimal newBal = w.getBalance().subtract(amount);
        if (newBal.signum() < 0) {
            throw new BadRequestException("Insufficient wallet balance");
        }
        w.setBalance(newBal);
        walletRepository.save(w);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(w);
        tx.setType(TransactionType.DEBIT);
        tx.setAmount(amount);
        tx.setBalanceAfter(newBal);
        tx.setReferenceType(referenceType);
        tx.setReferenceId(referenceId);
        tx.setDescription(description);
        transactionRepository.save(tx);
    }

    @Transactional
    public void credit(User user, BigDecimal amount, String referenceType, Long referenceId, String description) {
        Wallet w = requireWalletForUser(user);
        if (amount == null || amount.signum() <= 0) {
            throw new BadRequestException("Invalid amount");
        }
        BigDecimal newBal = w.getBalance().add(amount);
        w.setBalance(newBal);
        walletRepository.save(w);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(w);
        tx.setType(TransactionType.CREDIT);
        tx.setAmount(amount);
        tx.setBalanceAfter(newBal);
        tx.setReferenceType(referenceType);
        tx.setReferenceId(referenceId);
        tx.setDescription(description);
        transactionRepository.save(tx);
    }

    private TransactionResponse toDto(WalletTransaction tx) {
        return new TransactionResponse(
                tx.getId(),
                tx.getType(),
                tx.getAmount(),
                tx.getBalanceAfter(),
                tx.getReferenceType(),
                tx.getReferenceId(),
                tx.getDescription(),
                tx.getCreatedAt()
        );
    }
}


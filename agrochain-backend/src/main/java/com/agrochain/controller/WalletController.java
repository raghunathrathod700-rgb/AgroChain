package com.agrochain.controller;

import com.agrochain.dto.wallet.AddMoneyRequest;
import com.agrochain.dto.wallet.TransactionResponse;
import com.agrochain.dto.wallet.WalletResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    public WalletResponse myWallet() {
        return walletService.myWallet(SecurityUtil.requireCurrentUserEmail());
    }

    @PostMapping("/add-money")
    @ResponseStatus(HttpStatus.OK)
    public WalletResponse addMoney(@Valid @RequestBody AddMoneyRequest request) {
        return walletService.addMoney(SecurityUtil.requireCurrentUserEmail(), request);
    }

    @GetMapping("/transactions")
    public List<TransactionResponse> transactions() {
        return walletService.myTransactions(SecurityUtil.requireCurrentUserEmail());
    }
}


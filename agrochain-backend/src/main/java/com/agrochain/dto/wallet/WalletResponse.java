package com.agrochain.dto.wallet;

import java.math.BigDecimal;

public record WalletResponse(
        Long walletId,
        Long userId,
        BigDecimal balance
) {
}


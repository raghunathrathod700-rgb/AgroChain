package com.agrochain.dto.auth;

public class ForgotPasswordResponse {
    private String message;
    private String resetToken;

    public static ForgotPasswordResponse of(String message, String resetToken) {
        ForgotPasswordResponse response = new ForgotPasswordResponse();
        response.setMessage(message);
        response.setResetToken(resetToken);
        return response;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }
}

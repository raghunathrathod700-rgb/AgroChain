package com.agrochain.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Externalized JWT signing secret and token TTL.
 */
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {

    /** HMAC secret (min 256 bits for HS256). */
    private String secret;

    /** Access token lifetime in milliseconds. */
    private long expirationMs = 86_400_000L;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    public void setExpirationMs(long expirationMs) {
        this.expirationMs = expirationMs;
    }
}

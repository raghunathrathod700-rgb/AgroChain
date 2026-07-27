package com.agrochain.security;

import com.agrochain.exception.ForbiddenException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Reads the authenticated principal (email) from the security context.
 */
public final class SecurityUtil {

    private SecurityUtil() {
    }

    public static String requireCurrentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() == null) {
            throw new ForbiddenException("Authentication required");
        }
        Object p = auth.getPrincipal();
        if (p instanceof org.springframework.security.core.userdetails.UserDetails) {
            return ((org.springframework.security.core.userdetails.UserDetails) p).getUsername();
        }
        return p.toString();
    }
}

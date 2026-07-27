package com.agrochain.service;

import com.agrochain.model.entity.User;
import com.agrochain.model.enums.RoleName;

/**
 * Role checks against persisted user-role associations.
 */
public final class RoleUtil {

    private RoleUtil() {
    }

    public static boolean hasRole(User user, RoleName roleName) {
        return user.getRoles().stream().anyMatch(r -> r.getName() == roleName);
    }

    public static boolean isAdmin(User user) {
        return hasRole(user, RoleName.ROLE_ADMIN);
    }
}

package com.agrochain.config;

import com.agrochain.model.entity.Role;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Ensures {@link RoleName} rows exist. Flyway {@code V1} also inserts them, but if migrations
 * were baselined or Hibernate created an empty schema first, registration would fail with
 * "Role not configured — run data seeder".
 */
@Component
@Order(100)
public class RoleBootstrapRunner implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(RoleBootstrapRunner.class);

    private final RoleRepository roleRepository;

    public RoleBootstrapRunner(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        for (RoleName name : RoleName.values()) {
            if (roleRepository.findByName(name).isPresent()) {
                continue;
            }
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
            log.info("Inserted missing role {}", name);
        }
    }
}

package com.agrochain.config;

import com.agrochain.model.entity.Product;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.Role;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.OrderStatus;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.OrderRepository;
import com.agrochain.repository.ProductRepository;
import com.agrochain.repository.RoleRepository;
import com.agrochain.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Seeds demo users, products, and orders on first startup when {@code app.seed.enabled=true}.
 */
@Component
@Order(200)
public class DataSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;
    private final boolean seedEnabled;

    public DataSeeder(
            UserRepository userRepository,
            RoleRepository roleRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.enabled:false}") boolean seedEnabled
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
        this.seedEnabled = seedEnabled;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!seedEnabled) {
            return;
        }
        if (userRepository.count() > 0) {
            log.info("Database already has users — skipping demo seed");
            return;
        }

        Role adminRole = requireRole(RoleName.ROLE_ADMIN);
        Role farmerRole = requireRole(RoleName.ROLE_FARMER);
        Role buyerRole = requireRole(RoleName.ROLE_BUYER);

        User admin = createUser(
                "admin@agrochain.local",
                "Admin@12345",
                "AgroChain",
                "Admin",
                "+91 90000 00001",
                Set.of(adminRole)
        );
        User farmer = createUser(
                "farmer@agrochain.local",
                "Farmer@12345",
                "Rajesh",
                "Kumar",
                "+91 98765 43210",
                Set.of(farmerRole)
        );
        User buyer = createUser(
                "buyer@agrochain.local",
                "Buyer@12345",
                "Priya",
                "Sharma",
                "+91 98123 45678",
                Set.of(buyerRole)
        );

        Product apples = createProduct(farmer, "Apples", "Fruits", new BigDecimal("2500.00"), 500,
                "Fresh Himachal apples, grade A quality.");
        Product mangoes = createProduct(farmer, "Mangoes", "Fruits", new BigDecimal("3200.00"), 300,
                "Alphonso mangoes from Maharashtra.");
        Product wheat = createProduct(farmer, "Wheat", "Grains", new BigDecimal("2200.00"), 1000,
                "Organic wheat, 50 kg bags.");

        createOrder(buyer, apples, 50, new BigDecimal("125000.00"), "Delhi Wholesale Market", OrderStatus.DELIVERED);
        createOrder(buyer, mangoes, 100, new BigDecimal("320000.00"), "Mumbai APMC", OrderStatus.PENDING);
        createOrder(buyer, wheat, 200, new BigDecimal("440000.00"), "Punjab Mandi, Ludhiana", OrderStatus.ACCEPTED);

        log.info("Seeded demo data — admin: {} / Admin@12345", admin.getEmail());
        log.info("Seeded demo data — farmer: {} / Farmer@12345", farmer.getEmail());
        log.info("Seeded demo data — buyer: {} / Buyer@12345", buyer.getEmail());
    }

    private Role requireRole(RoleName name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new IllegalStateException("Missing role: " + name));
    }

    private User createUser(
            String email,
            String password,
            String firstName,
            String lastName,
            String phone,
            Set<Role> roles
    ) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setBlocked(false);
        user.setEnabled(true);
        user.setRoles(roles);
        return userRepository.save(user);
    }

    private Product createProduct(
            User farmer,
            String name,
            String category,
            BigDecimal price,
            int quantity,
            String description
    ) {
        Product product = new Product();
        product.setFarmer(farmer);
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setDescription(description);
        product.setActive(true);
        return productRepository.save(product);
    }

    private void createOrder(
            User buyer,
            Product product,
            int quantity,
            BigDecimal totalPrice,
            String deliveryAddress,
            OrderStatus status
    ) {
        ProductOrder order = new ProductOrder();
        order.setBuyer(buyer);
        order.setProduct(product);
        order.setQuantity(quantity);
        order.setTotalPrice(totalPrice);
        order.setDeliveryAddress(deliveryAddress);
        order.setBuyerDisplayName(buyer.getFirstName() + " " + buyer.getLastName());
        order.setStatus(status);
        orderRepository.save(order);
    }
}

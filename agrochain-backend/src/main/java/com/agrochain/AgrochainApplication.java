package com.agrochain;

import com.agrochain.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * Entry point for the AgroChain REST API.
 * Farmers sell agricultural products directly to buyers without middlemen.
 */
@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class AgrochainApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgrochainApplication.class, args);
    }
}

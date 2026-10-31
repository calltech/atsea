package com.docker.atsea.security;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

import javax.crypto.SecretKey;

import io.jsonwebtoken.security.Keys;

public final class JwtKeys {

    private static final SecretKey KEY = createKey();

    private JwtKeys() {
    }

    public static SecretKey get() {
        return KEY;
    }

    private static SecretKey createKey() {
        String configured = System.getProperty("atsea.jwt.secret", System.getenv("JWT_SECRET"));
        if (configured != null && configured.getBytes(StandardCharsets.UTF_8).length >= 32) {
            return Keys.hmacShaKeyFor(configured.getBytes(StandardCharsets.UTF_8));
        }
        byte[] random = new byte[32];
        new SecureRandom().nextBytes(random);
        return Keys.hmacShaKeyFor(random);
    }
}

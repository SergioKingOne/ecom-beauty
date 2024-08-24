package com.ecom_beauty.ecombeauty.auths;

import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Component
public class ClerkTokenVerifier {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClerkTokenVerifier.class);

    @Value("${clerk.public-key}")
    private String publicKeyPEM;

    public boolean verifyToken(String token) {
        try {
            RSAPublicKey publicKey = getPublicKey(publicKeyPEM);
            Algorithm algorithm = Algorithm.RSA256(publicKey, null);
            JWT.require(algorithm)
                    .build()
                    .verify(token);
            
            LOGGER.info("Token verified successfully");
            return true;
        } catch (JWTVerificationException exception) {
            LOGGER.error("Token verification failed: {}", exception.getMessage());
            return false;
        } catch (Exception e) {
            LOGGER.error("Error in public key parsing or token verification: {}", e.getMessage());
            return false;
        }
    }

    private RSAPublicKey getPublicKey(String publicKeyPEM) throws Exception {
        publicKeyPEM = publicKeyPEM.replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");
        
        byte[] encoded = Base64.getDecoder().decode(publicKeyPEM);
        
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(encoded);
        return (RSAPublicKey) keyFactory.generatePublic(keySpec);
    }
}
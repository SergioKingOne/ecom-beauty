package com.ecom_beauty.ecombeauty.service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService
{
	private final String SECRET_KEY = "3e8f10d8e6dcf6d66e479bbe3a1af3262865d2dde0834e52b8f5d5b4633b03b9";
	
	public String extractUsername(String token)
	{
		return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isValid(String token, UserDetails user)
	{
		String username = extractUsername(token);
		return (username.equals(user.getUsername())) && !isTokenExpired(token);
	}
	
	private boolean isTokenExpired(String token)
	{
		return extractExpiration(token).before(new Date());
	}
	
	private Date extractExpiration(String token)
	{
		return extractClaim(token, Claims::getExpiration);
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> resolver)
	{
		Claims claims = extractAllClaims(token);
		return resolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token)
	{
		return Jwts
				.parser()
				.verifyWith(getSigninkey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	public String generateToken(User user)
	{
		String token = Jwts
				.builder()
				.subject(user.getEmail())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
				.signWith(getSigninkey())
				.compact();
		
		return token;
	}
	
	private SecretKey getSigninkey()
	{
		byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
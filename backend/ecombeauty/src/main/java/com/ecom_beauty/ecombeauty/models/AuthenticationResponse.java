package com.ecom_beauty.ecombeauty.models;

public class AuthenticationResponse
{
	private String token;
	
	public AuthenticationResponse(String token)
	{
		this.token = token;
	}
	
	public String getToken()
	{
		return token;
	}
}

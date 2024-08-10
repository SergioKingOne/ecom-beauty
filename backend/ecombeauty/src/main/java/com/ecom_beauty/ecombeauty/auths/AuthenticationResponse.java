package com.ecom_beauty.ecombeauty.auths;

public class AuthenticationResponse
{
	private final String token;
	
	public AuthenticationResponse(String token)
	{
		this.token = token;
	}
	
	public String getToken()
	{
		return token;
	}
}

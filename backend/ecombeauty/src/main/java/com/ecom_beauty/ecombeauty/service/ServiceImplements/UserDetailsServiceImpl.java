package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
	private final UserRepository userRepository;
	
	public UserDetailsServiceImpl(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username)
				.orElseThrow(()-> new UsernameNotFoundException("User not found"));
	}

}

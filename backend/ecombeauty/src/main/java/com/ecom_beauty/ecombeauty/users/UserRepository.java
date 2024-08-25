package com.ecom_beauty.ecombeauty.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    @NonNull
    Optional<User> findById(@NonNull Integer id);

    User findByClerkId(String clerkId);
}
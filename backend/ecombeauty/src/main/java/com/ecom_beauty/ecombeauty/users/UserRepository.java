package com.ecom_beauty.ecombeauty.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Override
    @NonNull
    Optional<User> findById(@NonNull String id);
}
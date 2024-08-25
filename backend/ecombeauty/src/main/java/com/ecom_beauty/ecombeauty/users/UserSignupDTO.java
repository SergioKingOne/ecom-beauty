package com.ecom_beauty.ecombeauty.users;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSignupDTO {
    @NotBlank(message = "clerkId cannot be blank")
    private String clerkId;
}

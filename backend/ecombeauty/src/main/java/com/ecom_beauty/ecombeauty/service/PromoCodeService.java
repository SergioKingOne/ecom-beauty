package com.ecom_beauty.ecombeauty.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.PromoCode;

public interface PromoCodeService {
    List<PromoCode> getAllPromoCodes();
    Optional<PromoCode> getPromoCodeById(Integer id);
    Optional<PromoCode> getPromoCodeByCode(String code);
    Optional<PromoCode> getValidPromoCode(String code);
    List<PromoCode> getActivePromoCodes(LocalDateTime from, LocalDateTime to);
    List<PromoCode> getExpiredPromoCodes(LocalDateTime date);
    List<PromoCode> getExhaustedPromoCodes();
    PromoCode savePromoCode(PromoCode promoCode);
    void deletePromoCode(Integer id);
    boolean isPromoCodeValid(String code);
    boolean applyPromoCode(String code);
}
package com.ingressify.seller;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerRequestRepository extends JpaRepository<SellerRequest, Long> {

    Optional<SellerRequest> findTopByUserIdOrderByCreatedAtDesc(Long userId);

    List<SellerRequest> findByStatusOrderByCreatedAtAsc(SellerRequestStatus status);

    boolean existsByUserIdAndStatus(Long userId, SellerRequestStatus status);
}

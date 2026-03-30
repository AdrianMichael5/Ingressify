package com.ingressify.admin;

import com.ingressify.seller.SellerRequestResponse;
import com.ingressify.seller.SellerRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final SellerRequestService sellerRequestService;

    public AdminController(SellerRequestService sellerRequestService) {
        this.sellerRequestService = sellerRequestService;
    }

    @GetMapping("/seller-requests")
    public ResponseEntity<List<SellerRequestResponse>> getPendingRequests() {
        return ResponseEntity.ok(sellerRequestService.getPendingRequests());
    }

    @PatchMapping("/seller-requests/{id}/approve")
    public ResponseEntity<SellerRequestResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(sellerRequestService.approve(id));
    }

    @PatchMapping("/seller-requests/{id}/reject")
    public ResponseEntity<SellerRequestResponse> reject(@PathVariable Long id) {
        return ResponseEntity.ok(sellerRequestService.reject(id));
    }
}

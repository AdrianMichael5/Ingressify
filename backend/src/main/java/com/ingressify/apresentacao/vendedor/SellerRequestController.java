package com.ingressify.apresentacao.vendedor;

import com.ingressify.aplicacao.vendedor.SellerRequestDTO;
import com.ingressify.aplicacao.vendedor.SellerRequestResponse;
import com.ingressify.aplicacao.vendedor.SellerRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerRequestController {

    private final SellerRequestService sellerRequestService;

    public SellerRequestController(SellerRequestService sellerRequestService) {
        this.sellerRequestService = sellerRequestService;
    }

    @PostMapping("/request")
    public ResponseEntity<SellerRequestResponse> createRequest(
            Authentication authentication,
            @Valid @RequestBody SellerRequestDTO dto) {
        String email = authentication.getName();
        return ResponseEntity.ok(sellerRequestService.createRequest(email, dto));
    }

    @GetMapping("/request/status")
    public ResponseEntity<SellerRequestResponse> getStatus(Authentication authentication) {
        String email = authentication.getName();
        SellerRequestResponse response = sellerRequestService.getStatus(email);
        if (response == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }
}

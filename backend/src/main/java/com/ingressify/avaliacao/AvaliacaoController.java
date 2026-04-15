package com.ingressify.avaliacao;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvaliacaoResponse> create(Authentication authentication,
                                                    @Valid @RequestBody CreateAvaliacaoRequest request) {
        return ResponseEntity.ok(avaliacaoService.create(authentication.getName(), request));
    }

    @GetMapping("/my-received")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvaliacaoResponse>> myReceived(Authentication authentication) {
        return ResponseEntity.ok(avaliacaoService.getByReviewedUser(authentication.getName()));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<AvaliacaoResponse>> getByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(avaliacaoService.getByEvent(eventId));
    }
}
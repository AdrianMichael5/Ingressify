package com.ingressify.alerta;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alertas")
public class AlertaIngressoController {

    private final AlertaIngressoService alertaIngressoService;

    public AlertaIngressoController(AlertaIngressoService alertaIngressoService) {
        this.alertaIngressoService = alertaIngressoService;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> criar(Authentication authentication,
                                        @Valid @RequestBody CreateAlertaRequest request) {
        alertaIngressoService.criarAlerta(authentication.getName(), request);
        return ResponseEntity.ok("Alerta criado com sucesso");
    }

    @GetMapping("/meus")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AlertaIngresso>> listarMeus(Authentication authentication) {
        return ResponseEntity.ok(alertaIngressoService.listarMeusAlertas(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> remover(@PathVariable Long id, Authentication authentication) {
        alertaIngressoService.removerAlerta(id, authentication.getName());
        return ResponseEntity.ok("Alerta removido com sucesso");
    }
}
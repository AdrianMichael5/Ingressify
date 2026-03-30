package com.ingressify.event;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> findPublished() {
        return ResponseEntity.ok(eventService.findPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.findById(id));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<EventResponse>> findMyEvents(Authentication authentication) {
        return ResponseEntity.ok(eventService.findBySeller(authentication.getName()));
    }

    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<EventResponse> create(
            Authentication authentication,
            @Valid @RequestBody CreateEventRequest request) {
        return ResponseEntity.ok(eventService.create(authentication.getName(), request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<EventResponse> update(
            @PathVariable Long id,
            Authentication authentication,
            @Valid @RequestBody CreateEventRequest request) {
        return ResponseEntity.ok(eventService.update(id, authentication.getName(), request));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<EventResponse> updateStatus(
            @PathVariable Long id,
            Authentication authentication,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(eventService.updateStatus(id, authentication.getName(), status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        eventService.delete(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}

package com.tickethub.service;

import com.tickethub.dto.EventResponse;
import com.tickethub.entity.Event;
import com.tickethub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventResponse> findAll() {
        return eventRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private EventResponse mapToResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .name(event.getName())
                .description(event.getDescription())
                .location(event.getLocation())
                .imageUrl(event.getImageUrl())
                .date(event.getDate())
                .price(event.getPrice())
                .category(event.getCategory())
                .available(event.getAvailable())
                .build();
    }
}

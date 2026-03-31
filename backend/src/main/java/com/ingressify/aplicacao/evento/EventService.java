package com.ingressify.aplicacao.evento;

import com.ingressify.dominio.evento.Event;
import com.ingressify.dominio.evento.EventRepository;
import com.ingressify.dominio.usuario.User;
import com.ingressify.dominio.usuario.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public List<EventResponse> findPublished() {
        return eventRepository.findByStatus("PUBLISHED").stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<EventResponse> findBySeller(String email) {
        User seller = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return eventRepository.findBySellerIdOrderByDateDesc(seller.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EventResponse findById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        return mapToResponse(event);
    }

    public EventResponse create(String email, CreateEventRequest request) {
        User seller = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Event event = new Event();
        event.setName(request.getName());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setDate(request.getDate());
        event.setLocation(request.getLocation());
        event.setCity(request.getCity());
        event.setState(request.getState());
        event.setTotalTickets(request.getTotalTickets());
        event.setPrice(request.getPrice());
        event.setImageUrl(request.getImageUrl());
        event.setStatus(request.getStatus() != null ? request.getStatus() : "DRAFT");
        event.setSeller(seller);
        event.setSoldTickets(0);
        event.setAvailable(true);

        eventRepository.save(event);
        return mapToResponse(event);
    }

    public EventResponse update(Long id, String email, CreateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        if (event.getSeller() == null || !event.getSeller().getEmail().equals(email)) {
            throw new RuntimeException("Você não tem permissão para editar este evento");
        }

        event.setName(request.getName());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setDate(request.getDate());
        event.setLocation(request.getLocation());
        event.setCity(request.getCity());
        event.setState(request.getState());
        event.setTotalTickets(request.getTotalTickets());
        event.setPrice(request.getPrice());
        event.setImageUrl(request.getImageUrl());

        eventRepository.save(event);
        return mapToResponse(event);
    }

    public EventResponse updateStatus(Long id, String email, String status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        if (event.getSeller() == null || !event.getSeller().getEmail().equals(email)) {
            throw new RuntimeException("Você não tem permissão para alterar este evento");
        }

        event.setStatus(status);
        eventRepository.save(event);
        return mapToResponse(event);
    }

    public void delete(Long id, String email) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        if (event.getSeller() == null || !event.getSeller().getEmail().equals(email)) {
            throw new RuntimeException("Você não tem permissão para excluir este evento");
        }

        if (event.getSoldTickets() > 0) {
            throw new RuntimeException("Não é possível excluir evento com ingressos vendidos");
        }

        eventRepository.delete(event);
    }

    private EventResponse mapToResponse(Event event) {
        EventResponse response = new EventResponse();
        response.setId(event.getId());
        response.setName(event.getName());
        response.setDescription(event.getDescription());
        response.setLocation(event.getLocation());
        response.setImageUrl(event.getImageUrl());
        response.setDate(event.getDate());
        response.setPrice(event.getPrice());
        response.setCategory(event.getCategory());
        response.setAvailable(event.getAvailable());
        response.setStatus(event.getStatus());
        response.setCity(event.getCity());
        response.setState(event.getState());
        response.setTotalTickets(event.getTotalTickets());
        response.setSoldTickets(event.getSoldTickets());
        response.setSellerName(event.getSeller() != null ? event.getSeller().getName() : null);
        return response;
    }
}

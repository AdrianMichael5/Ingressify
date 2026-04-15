package com.ingressify.avaliacao;

import com.ingressify.event.Event;
import com.ingressify.event.EventRepository;
import com.ingressify.user.User;
import com.ingressify.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository,
                            EventRepository eventRepository,
                            UserRepository userRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public AvaliacaoResponse create(String reviewerEmail, CreateAvaliacaoRequest request) {
        User reviewer = userRepository.findByEmail(reviewerEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        if (event.getDate().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("A avaliação só pode ser feita após a data do evento");
        }

        if (event.getSeller() == null) {
            throw new RuntimeException("Este evento não possui vendedor associado");
        }

        if (event.getSeller().getId().equals(reviewer.getId())) {
            throw new RuntimeException("O vendedor não pode avaliar o próprio evento");
        }

        if (avaliacaoRepository.existsByEventIdAndReviewerId(event.getId(), reviewer.getId())) {
            throw new RuntimeException("Você já avaliou este evento");
        }

        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setEvent(event);
        avaliacao.setReviewer(reviewer);
        avaliacao.setReviewed(event.getSeller());
        avaliacao.setRating(request.getRating());
        avaliacao.setComment(request.getComment());

        avaliacaoRepository.save(avaliacao);

        return toResponse(avaliacao);
    }

    public List<AvaliacaoResponse> getByReviewedUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return avaliacaoRepository.findByReviewedIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<AvaliacaoResponse> getByEvent(Long eventId) {
        return avaliacaoRepository.findByEventIdOrderByCreatedAtDesc(eventId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AvaliacaoResponse toResponse(Avaliacao avaliacao) {
        AvaliacaoResponse response = new AvaliacaoResponse();
        response.setId(avaliacao.getId());
        response.setEventId(avaliacao.getEvent().getId());
        response.setEventName(avaliacao.getEvent().getName());
        response.setReviewerName(avaliacao.getReviewer().getName());
        response.setReviewedName(avaliacao.getReviewed().getName());
        response.setRating(avaliacao.getRating());
        response.setComment(avaliacao.getComment());
        response.setCreatedAt(avaliacao.getCreatedAt());
        return response;
    }
}
package com.ingressify.alerta;

import com.ingressify.event.Event;
import com.ingressify.event.EventRepository;
import com.ingressify.user.User;
import com.ingressify.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertaIngressoService {

    private final AlertaIngressoRepository alertaRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public AlertaIngressoService(
            AlertaIngressoRepository alertaRepository,
            EventRepository eventRepository,
            UserRepository userRepository) {
        this.alertaRepository = alertaRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public void criarAlerta(String email, CreateAlertaRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        alertaRepository.findByUserIdAndEventId(user.getId(), event.getId())
                .ifPresent(a -> {
                    throw new RuntimeException("Alerta já existe para esse evento");
                });

        AlertaIngresso alerta = new AlertaIngresso();
        alerta.setUser(user);
        alerta.setEvent(event);
        alerta.setCanal(request.getCanal());
        alerta.setAtivo(true);
        alerta.setFoiDisparado(false);

        alertaRepository.save(alerta);
    }

    public List<AlertaIngresso> listarMeusAlertas(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return alertaRepository.findByUserId(user.getId());
    }

    public void removerAlerta(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        AlertaIngresso alerta = alertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado"));

        if (!alerta.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Você não pode deletar esse alerta");
        }

        alertaRepository.delete(alerta);
    }

    public void dispararAlertas(Event event) {
        List<AlertaIngresso> alertas = alertaRepository
                .findByEventIdAndAtivoTrueAndFoiDisparadoFalse(event.getId());

        for (AlertaIngresso alerta : alertas) {
            alerta.setFoiDisparado(true);
            alertaRepository.save(alerta);
        }
    }
}
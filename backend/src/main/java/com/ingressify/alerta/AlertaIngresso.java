package com.ingressify.alerta;

import com.ingressify.event.Event;
import com.ingressify.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alertas_ingresso")
public class AlertaIngresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String canal;

    private Boolean ativo = true;

    private Boolean foiDisparado = false;

    private LocalDateTime criadoEm;

    private LocalDateTime disparadoEm;

    @PrePersist
    public void prePersist() {
        criadoEm = LocalDateTime.now();
    }

    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public String getCanal() { return canal; }
    public void setCanal(String canal) { this.canal = canal; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }

    public Boolean getFoiDisparado() { return foiDisparado; }
    public void setFoiDisparado(Boolean foiDisparado) { this.foiDisparado = foiDisparado; }

    public LocalDateTime getCriadoEm() { return criadoEm; }

    public LocalDateTime getDisparadoEm() { return disparadoEm; }
    public void setDisparadoEm(LocalDateTime disparadoEm) { this.disparadoEm = disparadoEm; }
}
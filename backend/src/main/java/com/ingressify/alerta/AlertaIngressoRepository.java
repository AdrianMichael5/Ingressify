package com.ingressify.alerta;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertaIngressoRepository extends JpaRepository<AlertaIngresso, Long> {

    Optional<AlertaIngresso> findByUserIdAndEventId(Long userId, Long eventId);

    List<AlertaIngresso> findByUserId(Long userId);

    List<AlertaIngresso> findByEventIdAndAtivoTrueAndFoiDisparadoFalse(Long eventId);
}
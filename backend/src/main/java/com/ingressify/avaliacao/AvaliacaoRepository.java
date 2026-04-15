package com.ingressify.avaliacao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    boolean existsByEventIdAndReviewerId(Long eventId, Long reviewerId);

    List<Avaliacao> findByReviewedIdOrderByCreatedAtDesc(Long reviewedId);

    List<Avaliacao> findByEventIdOrderByCreatedAtDesc(Long eventId);
}
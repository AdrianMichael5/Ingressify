package com.ingressify.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByStatus(String status);

    List<Event> findBySellerIdOrderByDateDesc(Long sellerId);
}

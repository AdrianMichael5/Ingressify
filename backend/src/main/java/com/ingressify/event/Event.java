package com.ingressify.event;

import com.ingressify.user.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(length = 100)
    private String category;

    private Boolean available = true;

    @Column(nullable = false)
    private String status = "PUBLISHED";

    private String city;
    private String state;

    @Column(name = "total_tickets", nullable = false)
    private Integer totalTickets = 100;

    @Column(name = "sold_tickets", nullable = false)
    private Integer soldTickets = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    public Event() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Integer getTotalTickets() { return totalTickets; }
    public void setTotalTickets(Integer totalTickets) { this.totalTickets = totalTickets; }

    public Integer getSoldTickets() { return soldTickets; }
    public void setSoldTickets(Integer soldTickets) { this.soldTickets = soldTickets; }

    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
}

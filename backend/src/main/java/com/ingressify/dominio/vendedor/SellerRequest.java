package com.ingressify.dominio.vendedor;

import com.ingressify.dominio.usuario.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "seller_requests")
public class SellerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String document;

    @Column(nullable = false)
    private String phone;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SellerRequestStatus status = SellerRequestStatus.PENDING;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public SellerRequest() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getDocument() { return document; }
    public void setDocument(String document) { this.document = document; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public SellerRequestStatus getStatus() { return status; }
    public void setStatus(SellerRequestStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

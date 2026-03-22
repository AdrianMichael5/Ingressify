package com.ingressify.event;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class EventResponse {

    private Long id;
    private String name;
    private String description;
    private String location;
    private String imageUrl;
    private LocalDateTime date;
    private BigDecimal price;
    private String category;
    private Boolean available;

    public EventResponse() {
    }

    public EventResponse(Long id, String name, String description, String location, String imageUrl,
                         LocalDateTime date, BigDecimal price, String category, Boolean available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.imageUrl = imageUrl;
        this.date = date;
        this.price = price;
        this.category = category;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public static EventResponseBuilder builder() {
        return new EventResponseBuilder();
    }

    public static class EventResponseBuilder {
        private Long id;
        private String name;
        private String description;
        private String location;
        private String imageUrl;
        private LocalDateTime date;
        private BigDecimal price;
        private String category;
        private Boolean available;

        public EventResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public EventResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public EventResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public EventResponseBuilder location(String location) {
            this.location = location;
            return this;
        }

        public EventResponseBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public EventResponseBuilder date(LocalDateTime date) {
            this.date = date;
            return this;
        }

        public EventResponseBuilder price(BigDecimal price) {
            this.price = price;
            return this;
        }

        public EventResponseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public EventResponseBuilder available(Boolean available) {
            this.available = available;
            return this;
        }

        public EventResponse build() {
            EventResponse response = new EventResponse();
            response.setId(this.id);
            response.setName(this.name);
            response.setDescription(this.description);
            response.setLocation(this.location);
            response.setImageUrl(this.imageUrl);
            response.setDate(this.date);
            response.setPrice(this.price);
            response.setCategory(this.category);
            response.setAvailable(this.available);
            return response;
        }
    }
}

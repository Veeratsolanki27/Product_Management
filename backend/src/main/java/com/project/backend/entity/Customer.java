package com.project.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String email;

    private String phone;

    private String location;

    private Integer totalOrders;

    private Double spent;

    private String status;

    public Customer() {}

    public Customer(Long id, String name, String email, String phone, String location, Integer totalOrders, Double spent, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.totalOrders = totalOrders;
        this.spent = spent;
        this.status = status;
    }

    public static CustomerBuilder builder() {
        return new CustomerBuilder();
    }

    public static class CustomerBuilder {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String location;
        private Integer totalOrders;
        private Double spent;
        private String status;

        public CustomerBuilder id(Long id) { this.id = id; return this; }
        public CustomerBuilder name(String name) { this.name = name; return this; }
        public CustomerBuilder email(String email) { this.email = email; return this; }
        public CustomerBuilder phone(String phone) { this.phone = phone; return this; }
        public CustomerBuilder location(String location) { this.location = location; return this; }
        public CustomerBuilder totalOrders(Integer totalOrders) { this.totalOrders = totalOrders; return this; }
        public CustomerBuilder spent(Double spent) { this.spent = spent; return this; }
        public CustomerBuilder status(String status) { this.status = status; return this; }

        public Customer build() {
            return new Customer(id, name, email, phone, location, totalOrders, spent, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getTotalOrders() { return totalOrders; }
    public void setTotalOrders(Integer totalOrders) { this.totalOrders = totalOrders; }

    public Double getSpent() { return spent; }
    public void setSpent(Double spent) { this.spent = spent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

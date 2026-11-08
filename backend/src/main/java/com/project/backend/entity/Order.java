package com.project.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @Column(nullable = false)
    private String customer;

    private Integer items;

    private Double total;

    private String status;

    private String date;

    private String payment;

    public Order() {}

    public Order(String id, String customer, Integer items, Double total, String status, String date, String payment) {
        this.id = id;
        this.customer = customer;
        this.items = items;
        this.total = total;
        this.status = status;
        this.date = date;
        this.payment = payment;
    }

    public static OrderBuilder builder() {
        return new OrderBuilder();
    }

    public static class OrderBuilder {
        private String id;
        private String customer;
        private Integer items;
        private Double total;
        private String status;
        private String date;
        private String payment;

        public OrderBuilder id(String id) { this.id = id; return this; }
        public OrderBuilder customer(String customer) { this.customer = customer; return this; }
        public OrderBuilder items(Integer items) { this.items = items; return this; }
        public OrderBuilder total(Double total) { this.total = total; return this; }
        public OrderBuilder status(String status) { this.status = status; return this; }
        public OrderBuilder date(String date) { this.date = date; return this; }
        public OrderBuilder payment(String payment) { this.payment = payment; return this; }

        public Order build() {
            return new Order(id, customer, items, total, status, date, payment);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomer() { return customer; }
    public void setCustomer(String customer) { this.customer = customer; }

    public Integer getItems() { return items; }
    public void setItems(Integer items) { this.items = items; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getPayment() { return payment; }
    public void setPayment(String payment) { this.payment = payment; }
}

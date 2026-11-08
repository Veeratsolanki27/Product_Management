package com.project.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    private String category;

    private String date;

    public Product() {}

    public Product(Long id, String name, Double price, String category, String date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.date = date;
    }

    public static ProductBuilder builder() {
        return new ProductBuilder();
    }

    public static class ProductBuilder {
        private Long id;
        private String name;
        private Double price;
        private String category;
        private String date;

        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder name(String name) { this.name = name; return this; }
        public ProductBuilder price(Double price) { this.price = price; return this; }
        public ProductBuilder category(String category) { this.category = category; return this; }
        public ProductBuilder date(String date) { this.date = date; return this; }

        public Product build() {
            return new Product(id, name, price, category, date);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}

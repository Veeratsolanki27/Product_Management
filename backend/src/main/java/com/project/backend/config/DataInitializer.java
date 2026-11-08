package com.project.backend.config;

import com.project.backend.entity.Customer;
import com.project.backend.entity.Order;
import com.project.backend.entity.Product;
import com.project.backend.entity.Role;
import com.project.backend.entity.User;
import com.project.backend.repository.CustomerRepository;
import com.project.backend.repository.OrderRepository;
import com.project.backend.repository.ProductRepository;
import com.project.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            UserRepository userRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            OrderRepository orderRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Ensure admin exists with verified password 'admin123'
            if (!userRepository.existsByUsernameIgnoreCase("admin")) {
                User admin = User.builder()
                        .username("admin")
                        .fullName("Admin User")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("admin123"))
                        .roles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER))
                        .build();
                userRepository.save(admin);
                System.out.println(">>> Seeded default admin: admin / admin123");
            }

            // Ensure demo user exists with verified password 'user123'
            if (!userRepository.existsByUsernameIgnoreCase("user")) {
                User user = User.builder()
                        .username("user")
                        .fullName("Demo User")
                        .email("user@example.com")
                        .password(passwordEncoder.encode("user123"))
                        .roles(Set.of(Role.ROLE_USER))
                        .build();
                userRepository.save(user);
                System.out.println(">>> Seeded default user: user / user123");
            }

            // Seed Products
            if (productRepository.count() == 0) {
                productRepository.saveAll(List.of(
                        Product.builder().name("Fan").price(2000.0).category("Electronics").date("Sat Dec 17 2022 14:55:08 GMT+0530 (India Standard Time)").build(),
                        Product.builder().name("New HP Laptop").price(30000.0).category("Electronics").date("Fri Dec 16 2022 10:24:47 GMT+0530 (India Standard Time)").build(),
                        Product.builder().name("One Plus Advance").price(80000.0).category("Mobile").date("Fri Dec 16 2022 10:23:52 GMT+0530 (India Standard Time)").build(),
                        Product.builder().name("Lenevo 2022 Model").price(99999.0).category("Laptop").date("Thu Dec 15 2022 21:13:26 GMT+0530 (India Standard Time)").build(),
                        Product.builder().name("Samsung LED TV").price(90000.0).category("Electronics").date("Thu Dec 15 2022 21:53:51 GMT+0530 (India Standard Time)").build(),
                        Product.builder().name("Dummy").price(15000.0).category("Electronics").date("Wed Dec 14 2022 18:30:00 GMT+0530 (India Standard Time)").build()
                ));
                System.out.println(">>> Seeded initial products");
            }

            // Seed Customers
            if (customerRepository.count() == 0) {
                customerRepository.saveAll(List.of(
                        Customer.builder().name("Aarav Sharma").email("aarav.sharma@example.com").phone("+91 98765 43210").location("Mumbai, India").totalOrders(12).spent(145000.0).status("VIP").build(),
                        Customer.builder().name("Priya Verma").email("priya.v@example.com").phone("+91 98123 45678").location("Delhi, India").totalOrders(5).spent(42000.0).status("Active").build(),
                        Customer.builder().name("Rohan Mehta").email("rohan.m@example.com").phone("+91 97111 22334").location("Bangalore, India").totalOrders(8).spent(98000.0).status("Active").build(),
                        Customer.builder().name("Sneha Patel").email("sneha.patel@example.com").phone("+91 96555 44332").location("Ahmedabad, India").totalOrders(2).spent(12000.0).status("New").build(),
                        Customer.builder().name("Vikram Singh").email("vikram.s@example.com").phone("+91 95444 33221").location("Jaipur, India").totalOrders(15).spent(210000.0).status("VIP").build(),
                        Customer.builder().name("Ananya Gupta").email("ananya.g@example.com").phone("+91 94333 22110").location("Kolkata, India").totalOrders(4).spent(34000.0).status("Active").build()
                ));
                System.out.println(">>> Seeded initial customers");
            }

            // Seed Orders
            if (orderRepository.count() == 0) {
                orderRepository.saveAll(List.of(
                        Order.builder().id("ORD-7089").customer("Aarav Sharma").items(3).total(4500.0).status("Completed").date("2026-08-10").payment("UPI").build(),
                        Order.builder().id("ORD-7090").customer("Priya Verma").items(1).total(30000.0).status("Processing").date("2026-08-11").payment("Credit Card").build(),
                        Order.builder().id("ORD-7091").customer("Rohan Mehta").items(2).total(82000.0).status("Shipped").date("2026-08-09").payment("Net Banking").build(),
                        Order.builder().id("ORD-7092").customer("Sneha Patel").items(4).total(9500.0).status("Cancelled").date("2026-08-08").payment("Debit Card").build(),
                        Order.builder().id("ORD-7093").customer("Vikram Singh").items(1).total(90000.0).status("Completed").date("2026-08-07").payment("UPI").build(),
                        Order.builder().id("ORD-7094").customer("Ananya Gupta").items(2).total(15000.0).status("Processing").date("2026-08-06").payment("Credit Card").build(),
                        Order.builder().id("ORD-7095").customer("Karan Malhotra").items(5).total(125000.0).status("Shipped").date("2026-08-05").payment("Net Banking").build()
                ));
                System.out.println(">>> Seeded initial orders");
            }
        };
    }
}

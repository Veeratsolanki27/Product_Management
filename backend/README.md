# Java Spring Boot Backend & React Authentication Setup

A robust, enterprise-grade Java Spring Boot backend with **JWT (JSON Web Token)** authentication, **Spring Security 6**, **Hibernate/JPA**, and **MySQL** database persistence has been created for your Product Management application.

---

## 🛠️ Architecture & Features

### 1. **Authentication & Security (`/api/auth`)**
- **JWT Authentication** (`io.jsonwebtoken` JJWT 0.11.5) with HMAC-SHA256 encrypted tokens.
- **BCrypt Password Hashing** for passwords.
- **Stateless Session Management** and custom JWT filter (`AuthTokenFilter`).
- **CORS enabled** for frontend communication on any port (`localhost:5173`, `localhost:3000`, etc.).
- **User Roles**: `ROLE_ADMIN` and `ROLE_USER`.

### 2. **Entities & Database Models (MySQL)**
Located in [backend/src/main/java/com/project/backend/entity/](file:///d:/React%20Practice/React_ProductList_MaterialUI_Project/backend/src/main/java/com/project/backend/entity/):
- **User**: `id`, `username`, `email`, `fullName`, `password`, `roles`
- **Product**: `id`, `name`, `price`, `category`, `date`
- **Customer**: `id`, `name`, `email`, `phone`, `location`, `totalOrders`, `spent`, `status`
- **Order**: `id` (e.g., `ORD-7089`), `customer`, `items`, `total`, `status`, `date`, `payment`

### 3. **REST Endpoints**
| Method | Endpoint | Description | Security |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate & retrieve JWT Token | Public |
| `POST` | `/api/auth/signup` | Register new account | Public |
| `GET` | `/api/products` | Retrieve all products | Bearer Token Required |
| `POST` | `/api/products` | Add new product | Bearer Token Required |
| `PUT` | `/api/products/{id}` | Update existing product | Bearer Token Required |
| `DELETE` | `/api/products/{id}` | Delete product by id | Bearer Token Required |
| `GET` | `/api/customers` | Retrieve customer CRM list | Bearer Token Required |
| `POST` | `/api/customers` | Add customer | Bearer Token Required |
| `DELETE` | `/api/customers/{id}` | Delete customer | Bearer Token Required |
| `GET` | `/api/orders` | Retrieve orders directory | Bearer Token Required |
| `POST` | `/api/orders` | Add/place order | Bearer Token Required |

---

## 🔑 Default Seed Credentials

Upon startup, the database is auto-seeded with default demo accounts:

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | `ROLE_ADMIN`, `ROLE_USER` |
| `user` | `user123` | `ROLE_USER` |

---

## 🚀 How to Run

### Backend:
```powershell
cd backend
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`.

### Frontend:
```powershell
cd frontend
npm run dev
```
Runs at `http://localhost:5173`.


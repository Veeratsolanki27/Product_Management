# Deployment Guide: Java Spring Boot + React

This guide covers deployment instructions for the backend and frontend across common hosting providers.

---

## 1. Backend Deployment (Render / Railway / AWS / Docker)

The backend compiles into a standalone executable JAR:
`backend/target/product-backend-0.0.1-SNAPSHOT.jar`

### Supported Environment Variables
| Variable | Description | Default (Local) |
|---|---|---|
| `PORT` | Listening port for HTTP | `8080` |
| `DB_URL` | MySQL JDBC connection string | `jdbc:mysql://localhost:3306/product_management_db` |
| `DB_USERNAME` | MySQL database username | `root` |
| `DB_PASSWORD` | MySQL database password | `root` |
| `JWT_SECRET` | 256-bit secure secret key | (Pre-configured fallback key) |
| `JWT_EXPIRATION_MS`| Token lifetime in milliseconds | `86400000` (24 Hours) |

### Deploying on Render or Railway:
1. Connect your Git repository.
2. Set Build Command: `mvn clean package -DskipTests`
3. Set Start Command: `java -jar target/product-backend-0.0.1-SNAPSHOT.jar`
4. Add a MySQL service and provide `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.

---

## 2. Frontend Deployment (Vercel / Netlify)

### Configuration
1. Set Build Command: `npm run build`
2. Set Output Directory: `dist`
3. Configure the Environment Variable in your Vercel/Netlify dashboard:
   ```env
   VITE_API_URL=https://your-deployed-backend.com/api
   ```

---

## 3. Seed Accounts
- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`
- New users can register directly via the Sign Up tab.


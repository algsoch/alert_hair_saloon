# Backend - Java Spring Boot

Barber Alert System Backend API

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Running Locally

```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## API Endpoints

### Health Check
```bash
GET /api/health
```
Returns: `"Backend is running!"`

### Get Shop Information
```bash
GET /api/shop-info
```
Returns shop details (name, owner, phone, etc.)

### Trigger Alert
```bash
POST /api/alert
```
or
```bash
GET /api/alert
```
Triggers phone notification and returns alert status

## Configuration

Set environment variables in `.env` file:

```bash
PORT=8080
PHONE_TRIGGER_URL=https://your-trigger-url.com/ring
```

## Deployment

See deployment instructions in:
- `deployment/render.yaml` for Render
- `Dockerfile` for Docker deployment
- `Procfile` for Railway/Heroku

## Project Structure

```
src/
├── main/
│   ├── java/com/vickysalon/
│   │   ├── BarberAlertApplication.java
│   │   ├── config/
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   └── AlertController.java
│   │   ├── service/
│   │   │   └── AlertService.java
│   │   └── dto/
│   │       └── AlertResponse.java
│   └── resources/
│       └── application.properties
```

## Testing

```bash
# Run tests
mvn test

# Build without tests
mvn clean install -DskipTests
```

## Building for Production

```bash
mvn clean package
java -jar target/barber-alert-system-1.0.0.jar
```

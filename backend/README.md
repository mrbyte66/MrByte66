# mrbyte66-backend

Single Spring Boot application, modular monolith (D-010).

## Prerequisites

- Java 25 (`JAVA_HOME` must point to a JDK 25)
- Maven 3.8+

## Run

```powershell
cd backend
mvn spring-boot:run
```

Health check: `GET http://localhost:8080/api/health` → `{"status":"UP"}`

## Test

```powershell
cd backend
mvn test
```

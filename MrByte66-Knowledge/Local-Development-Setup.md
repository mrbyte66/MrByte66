# Local Development Setup

## Amaç

Bu dokümanın amacı, MrByte66 projesinin geliştirme ortamını ve temel çalışma gereksinimlerini tanımlamaktır.

---

## Gereksinimler

Geliştirme ortamında aşağıdaki teknolojiler kullanılacaktır:

- Java 25
- Spring Boot
- Node.js
- Next.js
- PostgreSQL
- Docker
- Git

---

## Backend

Backend uygulaması:

- Spring Boot ile geliştirilecektir.
- REST API yaklaşımı kullanılacaktır.
- PostgreSQL veritabanı ile çalışacaktır.

---

## Frontend

Frontend uygulaması:

- Next.js framework'ü kullanılacaktır.
- React ve TypeScript tabanlı geliştirilecektir.

---

## Database

Geliştirme ortamında PostgreSQL kullanılacaktır.

Database bağlantı bilgileri environment configuration üzerinden yönetilecektir.

---

## Environment Yönetimi

Farklı çalışma ortamları desteklenecektir:

- Local
- Test
- Production

Hassas bilgiler:

- Kaynak kod içerisinde tutulmamalıdır.
- Environment variable veya güvenli configuration yöntemleri ile yönetilmelidir.

---

## Containerization

Geliştirme ve dağıtım süreçlerinde Docker kullanılacaktır.

Kök dizindeki `docker-compose.yml` PostgreSQL + backend + frontend servislerini birlikte ayağa kaldırır:

```powershell
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api/health
- PostgreSQL: localhost:5432

Gereksinim: Docker Engine veya Docker Desktop (makineye göre değişir, aşağıdaki tabloya bakın).

---

## Makineler

| Makine | İşletim Sistemi | Docker | Notlar |
|---|---|---|---|
| SAGE | Windows (eski sürüm, Docker Desktop desteklenmiyor) | WSL Ubuntu 26.04 içinde Docker Engine (`docker.io` + `docker-compose-v2`) | JDK 25 portable kurulum (`C:\Java`), `JAVA_HOME` set edildi; npm PATH gölgeleme sorunu kullanıcı PATH'i ile çözüldü; `docker` komutları WSL üzerinden `sudo` ile çalıştırılır |
| MAcos | macOS 15.7.7 (arm64) | Docker yok — native çalışma | JDK 25 Homebrew openjdk@25 (25.0.4.1, `JAVA_HOME` buna bakmalıdır), Maven 3.9.11, Node v22.18.0, PostgreSQL 16.10 (brew `postgresql@16` servisi, çalışıyor); `mrbyte66` DB + `mrbyte66` rol local oluşturuldu (şifre `mrbyte66-dev`, compose ile aynı); backend `mvn spring-boot:run` (:8080), frontend `npm install && npm run dev` (:3000); 2026-09-29'da native ayağa kaldırma doğrulandı |
| masterPC | TBD | TBD | İlk kurulumda doldurulacaktır |

Amaç:

- Ortam farklılıklarını azaltmak.
- Kurulum süreçlerini kolaylaştırmak.
- Production ortamına daha tutarlı geçiş sağlamaktır.

---

## Çalıştırma Prensibi

Backend, frontend ve database bileşenleri bağımsız şekilde geliştirilebilir ve çalıştırılabilir olmalıdır.

Proje yapısı geliştiricilerin ve AI agentların kolay anlayabileceği şekilde düzenlenmelidir.

---

## Çok Makineli Git Akışı (SAGE / MAcos / masterPC)

Tek remote (`origin`) ve tek ana branch (`main`) kullanılır.

- SAGE push eder → MAcos / masterPC `git pull` ile güncellenir.
- MAcos push eder → SAGE / masterPC `git pull` ile güncellenir.
- Çalışmaya başlamadan önce her zaman `git pull` yapılır.
- Test edilmemiş veya tamamlanmamış değişiklikler `main`'e push edilmez.
- AI agent yaptığı değişiklikleri anlamlı commit mesajlarıyla işler ve ilgili dokümanları günceller.

MAcos native çalıştırma komutları (Docker'sız):

```zsh
# PostgreSQL servisi (brew, bir kez kurulur ve başlatılır)
brew install postgresql@16
brew services start postgresql@16

# DB ve rol (bir kez)
psql -d postgres -c "CREATE ROLE mrbyte66 LOGIN PASSWORD 'mrbyte66-dev';"
psql -d postgres -c "CREATE DATABASE mrbyte66 OWNER mrbyte66;"

# Java 25 (bir kez)
brew install openjdk@25
export JAVA_HOME=/opt/homebrew/opt/openjdk@25
export PATH="$JAVA_HOME/bin:$PATH"

# Backend (:8080)
cd backend
mvn spring-boot:run

# Frontend (:3000, ayrı terminal)
cd frontend
npm install
npm run dev
```

---

## Version Requirements

Kullanılacak temel teknoloji sürümleri:

Backend:

- Java: 25 LTS (Temurin 25.0.4.1, `C:\Java` altında portable kurulum; `JAVA_HOME` JDK 25'i göstermelidir)
- Spring Boot: 3.5.16 (V1 başlangıç sürümü)
- Build Tool: Maven (3.8.8 ile doğrulandı)

Frontend:

- Node.js: 24 LTS (24.21.0 ile doğrulandı; npm 11.19.0)
- Next.js: 16.3.7, App Router (V1 başlangıç sürümü)
- React 19 + TypeScript + Tailwind CSS 4 + ESLint

Database:

- PostgreSQL

Container:

- Docker
- Docker Compose

Geliştirme ortamı Windows, Linux ve macOS üzerinde desteklenecek şekilde hazırlanacaktır.

Production ortamı için Linux tabanlı sunucu ortamı (Ubuntu) hedeflenmektedir.
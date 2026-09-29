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

Amaç:

- Ortam farklılıklarını azaltmak.
- Kurulum süreçlerini kolaylaştırmak.
- Production ortamına daha tutarlı geçiş sağlamaktır.

---

## Çalıştırma Prensibi

Backend, frontend ve database bileşenleri bağımsız şekilde geliştirilebilir ve çalıştırılabilir olmalıdır.

Proje yapısı geliştiricilerin ve AI agentların kolay anlayabileceği şekilde düzenlenmelidir.

---

## Version Requirements

Kullanılacak temel teknoloji sürümleri:

Backend:

- Java: 25 LTS (Temurin 25.0.4.1, `C:\Java` altında portable kurulum; `JAVA_HOME` JDK 25'i göstermelidir)
- Spring Boot: 3.5.16 (V1 başlangıç sürümü)
- Build Tool: Maven (3.8.8 ile doğrulandı)

Frontend:

- Node.js: LTS
- Next.js: Latest stable version
- TypeScript

Database:

- PostgreSQL

Container:

- Docker
- Docker Compose

Geliştirme ortamı Windows ve Linux üzerinde desteklenecek şekilde hazırlanacaktır.

Production ortamı için Linux tabanlı sunucu ortamı (Ubuntu) hedeflenmektedir.
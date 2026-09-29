# Decisions

Bu dosya, proje geliştirme sürecinde alınan önemli ürün, mimari ve teknik kararları kayıt altına almak için kullanılacaktır.

---

## 2026-09-28

### D-001: MrByte66 Platform Vizyonu

**Karar**

MrByte66 ilk sürümde kişisel dijital platform olarak geliştirilecek.

**Gerekçe**

Amaç; AI uzmanlığını, yazılım projelerini ve kişisel içerikleri tek bir platformda sergilemek.

Sistem ileride çok yazarlı, dinamik içerik yönetimine sahip ve modüler bir platforma dönüşebilecek şekilde tasarlanacaktır.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-002: Modular Monolith Architecture

**Karar**

Proje başlangıç aşamasında Modular Monolith mimarisi ile geliştirilecektir.

**Gerekçe**

Microservice mimarisi başlangıç aşamasında gereksiz operasyonel karmaşıklık oluşturabileceği için tercih edilmemiştir.

Bunun yerine modüler, gevşek bağlı ve ileride bağımsız servislere ayrılabilecek bir yapı hedeflenmiştir.

**Durum**

Kabul edildi.

---

### D-003: Next.js Kullanımı

**Karar**

Frontend geliştirme için Next.js framework'ü kullanılacaktır.

**Gerekçe**

SEO, performans, içerik odaklı yapı ve modern web geliştirme ihtiyaçları nedeniyle tercih edilmiştir.

**Durum**

Kabul edildi.

---

### D-004: Spring Boot + Java 25

**Karar**

Backend geliştirme için Spring Boot ve Java 25 kullanılacaktır.

**Gerekçe**

Mevcut Java tecrübesi, kurumsal kullanım yaygınlığı ve backend uzmanlığı geliştirme hedefleri nedeniyle tercih edilmiştir.

**Durum**

Kabul edildi.

---

### D-005: AI Destekli Geliştirme Sürecine Uygun Dokümantasyon

**Karar**

Proje dokümantasyonu, AI destekli geliştirme süreçlerini destekleyecek şekilde düzenli tutulacaktır.

Önemli mimari kararlar, teknik tercihler ve proje kuralları ilgili dokümanlarda kayıt altına alınacaktır.

**Gerekçe**

Proje geliştirme sürecinde AI coding agent araçlarından faydalanılacaktır.

AI ajanların doğru bağlam ile çalışabilmesi için proje yapısının, mimari kararların ve geliştirme prensiplerinin açık şekilde dokümante edilmesi gerekmektedir.

Bu yaklaşım aynı zamanda uzun vadede proje sürdürülebilirliğini artıracaktır.

**Durum**

Kabul edildi.

---

### D-006: V1 Tek Super Admin Modeli

**Karar**

V1 aşamasında platform tek Super Admin tarafından yönetilecektir.

Kullanıcı kayıt sistemi, Member / Author modeli ve kullanıcı dashboard yapısı V1 kapsamında bulunmayacaktır.

Authentication altyapısı yalnızca yönetim paneli erişimi için kullanılacaktır.

**Gerekçe**

V1 hedefi hızlı ve uygulanabilir bir kişisel platform oluşturmaktır.

Çok kullanıcılı yapı, yetkilendirme karmaşıklığı ve dashboard yönetimi V2 kapsamına bırakılarak teknik borç ve kapsam büyümesi engellenmiştir.

Mimari, V2 Author modeline geçişi destekleyecek şekilde korunacaktır.

**Durum**

Kabul edildi.

---

### D-007: Frontend App Router ve Backend Build Kararları

**Karar**

Frontend tarafında Next.js App Router kullanılacaktır.

Backend build sistemi olarak Maven, framework olarak güncel Spring Boot 3.x kullanılacaktır.

Global state ihtiyacı oluşmadıkça ek state yönetim kütüphanesi kullanılmayacaktır.

**Gerekçe**

App Router; Server Component, SSR ve SEO avantajları nedeniyle tercih edilmiştir.

Maven ve Spring Boot 3.x seçimi mevcut Java tecrübesi ve kurumsal yaygınlık ile uyumludur.

Gereksiz bağımlılıklardan kaçınılarak V1 basit tutulmuştur.

**Durum**

Kabul edildi.

---

### D-008: V1 Relational Model, V2 Dinamik Model Hazırlığı

**Karar**

V1 veri modeli PostgreSQL üzerinde klasik relational model ile kurulacaktır.

JSONB tabanlı esnek alanlar ve dinamik field sistemi V1'de uygulanmayacak, yalnızca V2 hedefi olarak değerlendirilecektir.

**Gerekçe**

Erken soyutlama yerine basit, güvenilir ve hızlı geliştirilebilir bir model hedeflenmiştir.

V1 relational yapısı V2 dinamik CMS evrimini engellemeyecek şekilde tasarlanacaktır.

**Durum**

Kabul edildi.

---

### D-009: REST API Tasarım Kuralları

**Karar**

API iletişimi REST prensiplerine uygun, JSON formatında tasarlanacaktır.

Temel kurallar:

- Resource bazlı endpoint yapısı
- Standart HTTP metod kullanımı
- Tutarlı hata formatı
- Listelemelerde pagination desteği
- OpenAPI/Swagger dokümantasyonu
- Auth gerektiren endpointlerde JWT koruması

**Gerekçe**

Frontend-backend bağımsız geliştirme ve ileride modüllerin servislere ayrılabilmesi için tutarlı bir API sözleşmesi gereklidir.

**Durum**

Kabul edildi.

---

### D-010: Tek Uygulama ve Package Bazlı Modular Monolith

**Karar**

Backend tek bir Spring Boot uygulaması olarak geliştirilecektir.

Maven multi-module yapısı kullanılmayacaktır.

Modular Monolith yaklaşımı, package ve domain sınırları ile uygulanacaktır:

```text
backend/src/main/java/com/mrbyte66/
    content/
    user/
    authentication/
    media/
```

**Gerekçe**

V1 hedefi hızlı ve uygulanabilir geliştirmedir.

Tek uygulama, multi-module yapının getireceği build ve operasyonel karmaşıklığı ortadan kaldırır.

Modül sınırları package disiplini ile korunacak, ileride ihtiyaç duyulursa bağımsız servislere ayrılma imkanı saklı tutulacaktır.

**Durum**

Kabul edildi.

---

### D-011: Frontend Stack Finalizasyonu

**Karar**

Frontend stack aşağıdaki şekilde kesinleştirilmiştir:

- Next.js 16.3.7, App Router
- React 19 + TypeScript
- Tailwind CSS 4 (styling çözümü)
- ESLint
- Paket yöneticisi: npm

V1 ana sayfa iskeleti backend `/api/health` durumunu gösterecek şekilde bağlanmıştır.

**Gerekçe**

Architecture'da styling seçimi geliştirme başlangıcına bırakılmıştı.

Tailwind CSS; component tabanlı yapı, tasarım sistemi hedefi ve hızlı prototipleme ihtiyacı nedeniyle tercih edilmiştir.

**Durum**

Kabul edildi.

---

### D-012: Liquibase Migration ve Test Veritabanı Stratejisi

**Karar**

Veritabanı migration aracı olarak Flyway yerine Liquibase kullanılacaktır
(formatted SQL changelog: `db/changelog/db.changelog-master.sql`).

Local veritabanı `postgres:16-alpine` ile çalışacaktır.

Testler H2 in-memory veritabanı ile koşacaktır (`@DataJpaTest`,
PostgreSQL uyumluluk modu, Liquibase testlerde kapalı).

**Gerekçe**

Boot 3.5.x BOM ile gelen flyway-core (11.7.2) ve açıkça sabitlenen 11.20.3,
güncel PostgreSQL 16/17 sürümlerini "Unsupported Database" hatasıyla reddetti.

Liquibase ilk denemede sorunsuz çalıştı ve PostgreSQL sürümlerine karşı
daha toleranslıdır.

Testler Windows üzerindeki Maven'de koşarken gerçek PostgreSQL WSL
Docker'ında çalışmaktadır; bu aşamada Testcontainers köprüsü kurmak
gereksiz karmaşıklık olacağı için H2 tercih edilmiştir.

Gerçek PostgreSQL uyumu compose açılışında Liquibase migration ile
doğrulanmaktadır.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-013: MAcos Native Çalıştırma ve Next.js Üretimi Dosyalar

**Karar**

MAcos makinesinde Docker kurulana kadar proje native çalıştırılacaktır
(brew `postgresql@16` servisi + JDK 25 + Node ile `mvn spring-boot:run` ve `npm run dev`).

`next dev` komutunun ürettiği `frontend/AGENTS.md` ve `frontend/CLAUDE.md`
dosyaları repoya alınmayacak, `frontend/.gitignore` ile local tutulacaktır.

**Gerekçe**

MAcos üzerinde Docker bulunmamaktadır; brew PostgreSQL 16 zaten servis
olarak çalışmaktadır ve "bileşenler bağımsız çalışabilmelidir" prensibine
uygun olarak native çalıştırma 2026-09-29'da doğrulandı
(backend `/api/health` UP, Liquibase migration uygulandı, frontend 200).

Next.js 16 her `next dev` çalışında bu dosyaları yeniden üretmektedir;
repoya alınmaları diff gürültüsü yaratır ve kökteki `AGENTS.md`'nin
tek-agent-girişi rolünü gölgeler. SAGE tarafında farklı npm sürümüyle
oluşan `package-lock.json` churn'ü de aynı gerekçeyle geri alındı;
lockfile SAGE'in ürettiği haliyle kanonik kalır.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-014: JWT Auth Altyapısı (Spring Security + JJWT)

**Karar**

Authentication altyapısı aşağıdaki şekilde kurulmuştur:

- `spring-boot-starter-security` + JJWT 0.12.6 (HS256).
- `user` paketi: `app_users` tablosu (`User`, `UserRole`, `UserRepository`).
  Tablo adı `app_users` seçildi çünkü `USER` hem PostgreSQL hem H2'de
  rezerve kelimedir. `UserRole` V1'de yalnızca `SUPER_ADMIN` içerir (D-006),
  V2 Author modeline hazırdır.
- `authentication` paketi: `AuthProperties` (`app.auth.*`, tamamı env ile
  ezilebilir), `JwtService`, `AdminSeeder`, `AuthController`
  (`POST /api/auth/login` → `{token, tokenType: Bearer, expiresIn}`),
  `JwtAuthenticationFilter`, `SecurityConfig` (stateless, CSRF kapalı).
- Public: `/api/health`, `/api/articles/**`, `/api/auth/login`.
  Diğer tüm path'ler JWT ister; tokensız erişim `401 {"error":"Unauthorized"}`
  döner (D-009 tutarlı hata formatı).
- Logout JWT'de stateless'tır: client token'ı siler, sunucu tarafı
  blacklist V1'de yoktur.
- Tek Super Admin, `AdminSeeder` ile env'den gelen
  (`APP_ADMIN_USERNAME` / `APP_ADMIN_PASSWORD`) bilgilerle ilk açılışta
  BCrypt-hash'li oluşturulur; parola kodda ve changelog'da tutulmaz.
- `APP_JWT_SECRET` en az 32 karakter olmalıdır, aksi halde uygulama
  açılışta fail-fast hata verir.
- Migration: changeset 3 (`app_users` tablosu). Changeset 1'e dokunulmadı,
  seed verisi changeset 2'de kalır.
- Compose ve local varsayılanlar dev değerleri taşır
  (`admin` / `admin-dev`), production env ile ezilmelidir.

**Gerekçe**

Architecture.md JWT + Spring Security öngörüyordu; admin paneli (CRUD)
işlerine geçmeden önce güvenlik katmanının testleriyle birlikte hazır
olması gerekiyordu. 14/14 test (unit + MockMvc integration) ve canlı
doğrulama (login → 200 + token, yanlış parola → 401, korumalı path → 401,
public path'ler açık) MAcos native ortamda yapıldı.

**Durum**

Kabul edildi.
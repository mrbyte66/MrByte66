# Architecture

## Genel Mimari Yaklaşım

Proje, Modular Monolith mimarisi ile geliştirilecektir.

Amaç; başlangıç aşamasında gereksiz karmaşıklık oluşturmadan hızlı ve sürdürülebilir geliştirme sağlamak, aynı zamanda ileride belirli modüllerin bağımsız servislere ayrılabilmesine imkan verecek bir yapı oluşturmaktır.

Mimari tasarım microservice prensipleri dikkate alınarak yapılacaktır.

Modüller:

- Kendi sorumluluk alanlarına sahip olmalı.
- Gevşek bağlı (loosely coupled) tasarlanmalı.
- Gereksiz bağımlılıklardan kaçınılmalı.
- Kendi iş mantığını kapsamalı.
- İleride bağımsız servis haline getirilebilecek sınırlar içerisinde oluşturulmalı.

Bu yaklaşım ile:

- Ürün geliştirme hızı korunacaktır.
- DevOps süreçlerini öğrenmeye uygun bir altyapı oluşturulacaktır.
- Gerektiğinde belirli modüller microservice mimarisine evrilebilecektir.

---

# Ana Modüller

Platform aşağıdaki ana modüller üzerine kurulacaktır:

- Content Management Module
- User Management Module
- Authentication Module
- Media Management Module
- Page Builder Module
- Subscription Module (Future)
- Notification Module (Future)

## Content Management Module

Platformun temel modülüdür.

Dinamik içerik yönetimi altyapısını sağlar.

Desteklenecek temel içerik türleri:

- Article
- Book Review
- Project
- Poem
- Essay
- Quote

İçerik sınıflandırması için kategori ve etiket yapısı kullanılacaktır.

Örnek kategoriler:

- AI
- Yazılım
- Teknoloji
- Kitap
- Düşünce
- Kişisel

Quote içerikleri; kitap alıntıları, özlü sözler, şiir dizeleri, ayetler, hadisler ve benzeri kısa referans içeriklerini kapsayacaktır.

Sistem ilerleyen aşamalarda yeni içerik tiplerinin ve içerik yapılarının desteklenebileceği şekilde tasarlanacaktır.

### User Management Module

V1 aşamasında temel kullanıcı yönetimi yalnızca yönetici hesabı üzerinden ele alınacaktır.

İlerleyen versiyonlarda kullanıcı kayıt sistemi, profil yönetimi ve kullanıcıların kendi içeriklerini oluşturabildiği çok yazarlı yapı desteklenebilir.

## Authentication Module

Kullanıcı kimlik doğrulama ve yetkilendirme süreçlerini yönetir.

## Media Management Module

Görsel, dosya ve diğer medya içeriklerinin yönetimini sağlar.

Sorumlulukları:

- Media metadata yönetimi
- Dosya yükleme süreçleri
- İçerikler ile medya ilişkilerinin yönetimi

Storage çözümü V1 geliştirme aşamasında belirlenecektir.

Olası çözümler:

- Local storage
- Cloud storage servisleri
- Object storage çözümleri

## Page Builder Module

V1 kapsamında temel sayfa yapıları kod ile yönetilecektir.

İlerleyen versiyonlarda admin panel üzerinden:

- Sayfa düzenlerinin,
- Ana sayfa bölümlerinin,
- Görsel yapıların

yönetilebilmesi hedeflenmektedir.

## Subscription Module

V1 kapsamında geliştirilmeyecektir.

İlerleyen versiyonlarda:

- Ücretli içerik,
- Abonelik sistemi,
- Yazar gelir modeli

gibi özellikleri desteklemek amacıyla değerlendirilecektir.

---

# Frontend Yaklaşımı

## Frontend Teknik Kararlar

### Routing

Next.js App Router kullanılacaktır.

Amaç:

- Next.js'in modern mimarisinden faydalanmak.
- Server Component ve Server Side Rendering imkanlarını kullanmak.
- SEO ve performans avantajlarından yararlanmak.

### Styling

Styling yaklaşımı olarak modern component tabanlı çözüm kullanılacaktır.

Teknoloji seçimi geliştirme başlangıcında değerlendirilecektir.

### State Management

Global state ihtiyacı oluşmadıkça gereksiz state yönetim kütüphanelerinden kaçınılacaktır.

İhtiyaç halinde uygun çözüm değerlendirilecektir.

### Animation

Animasyonlar kullanıcı deneyimini destekleyecek şekilde uygulanacaktır.

Performans ve erişilebilirlik öncelikli tutulacaktır.

---

# Backend Yaklaşımı
## Backend Teknik Kararlar

### Build Tool

Backend build sistemi olarak Maven kullanılacaktır.

### Proje Yapısı

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

Kurallar:

- Her modül kendi sorumluluk alanını koruyacaktır.
- Modül sınırları package yapısı ile sağlanacaktır.
- Modüller arası gereksiz bağımlılıklardan kaçınılacaktır.
- İleride ihtiyaç duyulursa modüller bağımsız servislere ayrılabilecek şekilde tasarlanacaktır.

### Package Structure

Kod organizasyonu domain sorumluluklarına göre yapılandırılacaktır.

Amaç:

- Modül sınırlarını korumak.
- Gelecekte bağımsız servislere ayrılmayı kolaylaştırmak.
- Kod bakımını kolaylaştırmak.

### Java ve Spring Boot

Java 25 ve güncel Spring Boot 3.x sürümü kullanılacaktır.

Framework ve bağımlılık sürümleri geliştirme başlangıcında kararlı sürümlere göre kesinleştirilecektir.

---

## API Tasarım Yaklaşımı

API iletişimi REST prensiplerine uygun olarak tasarlanacaktır.

Temel kurallar:

- Veri formatı JSON olacaktır.
- Resource bazlı endpoint yapısı kullanılacaktır.
- HTTP metodları standart kullanımına uygun olacaktır.
- Hata cevapları tutarlı formatta dönecektir.
- Listeleme işlemlerinde pagination desteği dikkate alınacaktır.

API dokümantasyonu için OpenAPI/Swagger kullanılacaktır.

Authentication gerektiren endpointler JWT tabanlı güvenlik ile korunacaktır.
# Database

Ana veritabanı olarak PostgreSQL kullanılacaktır.

---

## Authentication

V1 aşamasında platform tek Super Admin tarafından yönetilecektir.

Kimlik doğrulama sistemi yalnızca yönetim paneli erişimi için kullanılacaktır.

Authentication altyapısı:

- Spring Security
- JWT tabanlı authentication

yaklaşımı ile geliştirilecektir.

İlerleyen versiyonlarda:

- Kullanıcı kayıt sistemi,
- Author hesapları,
- OAuth2,
- Gelişmiş rol ve yetkilendirme sistemi

değerlendirilebilir.

---

# Veri Modeli Yaklaşımı

Platform, dinamik içerik yönetimini destekleyecek şekilde tasarlanacaktır.

Sistem yalnızca önceden tanımlanmış içerik türlerine bağlı kalmayacak, ilerleyen aşamalarda admin panel üzerinden yeni içerik türleri ve alanları oluşturulabilecek esnek bir yapıya evrilecektir.

İçerik türleri kendi özel alanlarını tanımlayabilecek yapıya sahip olacaktır.

Örnek:

Book Review:

- Kitap adı
- Yazar
- Yayın tarihi
- Puan

Project:

- Teknolojiler
- Demo bağlantısı
- Kaynak kod bağlantısı

Hedeflenen yapı:

- Dinamik içerik tipleri
- Dinamik alan oluşturma
- Esnek içerik modeli yönetimi
- Genişletilebilir CMS altyapısı

---

## Admin Panel Yaklaşımı

V1 aşamasında platform yönetimi için tek bir Super Admin paneli bulunacaktır.

Super Admin:

- İçerik oluşturabilir ve yönetebilir.
- Proje içeriklerini yönetebilir.
- Ana sayfa ve temel platform ayarlarını yönetebilir.
- Sistem içerisindeki tüm yönetim işlemlerini gerçekleştirebilir.

V1 aşamasında kullanıcı dashboard ve çoklu kullanıcı yönetimi bulunmayacaktır.

İlerleyen versiyonlarda:

- Kullanıcı hesapları,
- Author dashboard,
- Çok yazarlı içerik yönetimi,
- Gelişmiş yetkilendirme sistemi

desteklenebilir.

---

## Kullanıcı ve Yetkilendirme Yaklaşımı

Platform, V1 aşamasında tek yönetici tarafından yönetilen kişisel dijital platform olarak geliştirilecektir.

### Visitor

- Sisteme giriş yapmamış kullanıcıdır.
- Public içerikleri görüntüleyebilir.
- Etkileşim özelliklerini kullanamaz.

### Super Admin

- Platformun tek yetkili kullanıcısıdır.
- İçerik yönetimi yapabilir.
- Proje ve medya içeriklerini yönetebilir.
- Sistem ayarlarını yönetebilir.
- Tüm yönetim işlemlerine erişebilir.

V1 aşamasında:

- Kullanıcı kayıt sistemi,
- Member / Author modeli,
- Çoklu admin yapısı

bulunmayacaktır.

İlerleyen versiyonlarda:

- Kullanıcı hesapları,
- Author modeli,
- Kullanıcı dashboardları,
- Çok yazarlı içerik üretimi,
- Gelişmiş rol ve yetkilendirme sistemi

değerlendirilecektir.
# UI/UX ve Tasarım Yaklaşımı

Platformda görsel kalite, kullanıcı deneyimi ve teknik performans dengesi korunacaktır.

Tasarım yaklaşımı:

- Modern ve özgün kullanıcı deneyimi hedeflenecektir.
- Awwwards seviyesinde yaratıcı tasarım yaklaşımları incelenecektir.
- Animasyonlar kullanıcı deneyimini artıracak şekilde kullanılacaktır.
- Animasyonlar performansı olumsuz etkilemeyecek şekilde uygulanacaktır.
- Responsive tasarım tüm cihazlarda desteklenecektir.

Görsel deneyim ile kullanılabilirlik arasında denge korunacaktır.

---

# Deployment ve DevOps Yaklaşımı

Uygulamanın dağıtım süreçleri modern DevOps pratikleri kullanılarak yönetilecektir.

Hedeflenen teknolojiler:

- Linux tabanlı sunucu ortamı
- Docker containerization
- CI/CD pipeline
- Environment bazlı configuration yönetimi
- Monitoring ve log yönetimi

Geliştirme sürecinde local, test ve production ortamlarının ayrıştırılması hedeflenmektedir.

---

# Test Yaklaşımı

Backend tarafında kaliteli ve sürdürülebilir kod için test süreçleri uygulanacaktır.

Hedeflenen test türleri:

- Unit Test
- Integration Test
- API Test

Test yaklaşımı geliştirme sürecinin önemli bir parçası olacaktır.

Uygun alanlarda Test Driven Development (TDD) yaklaşımı değerlendirilecektir.

---

# Platform Bağımsızlık

Uygulama geliştirilirken işletim sistemi bağımlılıklarından kaçınılacaktır.

Kod yapısı ve geliştirme süreçleri Linux ve Windows ortamlarında çalışabilecek şekilde tasarlanacaktır.

Dosya yolları, yapılandırmalar ve çalışma ortamları platform bağımsız olacak şekilde yönetilecektir.

Sunucu ortamı için Linux tabanlı sistemler (özellikle Ubuntu) öncelikli olarak değerlendirilecektir.

---

# Dış Servisler

Kullanılacak dış servisler proje ihtiyaçlarına göre belirlenecektir.

Olası servis kategorileri:

- Email servisleri
- Cloud storage servisleri
- Payment servisleri
- Authentication servisleri
- AI servisleri
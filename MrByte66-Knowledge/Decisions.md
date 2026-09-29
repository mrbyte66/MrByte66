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
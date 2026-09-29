# Database Design

## Amaç

Bu dokümanın amacı, MrByte66 platformunun veri modeli yaklaşımını ve temel veritabanı tasarım prensiplerini tanımlamaktır.

Detaylı tablo yapıları ve ilişkiler geliştirme aşamasında mimari ihtiyaçlara göre belirlenecektir.

---

## Database Technology

Ana veritabanı olarak PostgreSQL kullanılacaktır.

Veri modeli, PostgreSQL'in güçlü özelliklerinden faydalanabilecek şekilde tasarlanacaktır.

---

## Genel Tasarım Prensipleri

Veri modeli:

- Sürdürülebilir olmalıdır.
- Genişlemeye uygun tasarlanmalıdır.
- Gereksiz karmaşıklıktan kaçınmalıdır.
- Modüler mimari yaklaşımını desteklemelidir.
- Gelecekteki özelliklere uyum sağlayabilecek esnekliğe sahip olmalıdır.

---

## Kullanıcı ve İçerik İlişkisi

Platform kullanıcıların içerik oluşturabildiği bir yapıya dönüşebilecek şekilde tasarlanacaktır.

Temel yaklaşım:

- Kullanıcılar kendi içeriklerinin sahibi olacaktır.
- İçerik ve kullanıcı ilişkisi açık şekilde modellenmelidir.
- Yetkilendirme mekanizmaları veri modeli ile uyumlu çalışmalıdır.

---

## İçerik Modeli

İçerik yönetimi platformun temelini oluşturacaktır.

V1:

- Temel içerik türleri desteklenecektir.

V2 ve sonrası:

- Dinamik içerik tipleri
- Dinamik alanlar
- Genişletilebilir CMS yapısı

desteklenebilecek şekilde veri modeli tasarlanacaktır.

---

## Veri Bütünlüğü ve Güvenlik

Veri modeli oluşturulurken:

- Veri bütünlüğü korunmalıdır.
- Uygun ilişkiler tanımlanmalıdır.
- Yetkisiz veri erişimleri engellenmelidir.
- Kullanıcı verileri güvenli şekilde yönetilmelidir.

---

## Geliştirme Yaklaşımı

Database tasarımı:

- İhtiyaçlara göre iteratif geliştirilecektir.
- Gereksiz erken optimizasyondan kaçınılacaktır.
- Performans ihtiyaçları doğrultusunda index ve optimizasyon kararları alınacaktır.

Detaylı database kararları geliştirme sürecinde ilgili teknik dokümanlarda kayıt altına alınacaktır.

---

## Relational Model Kararı

MrByte66 veri modeli PostgreSQL üzerinde relational database yaklaşımı ile tasarlanacaktır.

V1 aşamasında performans, anlaşılabilirlik ve sürdürülebilirlik amacıyla klasik relational model tercih edilecektir.

---

## V1 Veri Modeli Yaklaşımı

V1 kapsamında içerik yapıları önceden tanımlı modeller üzerinden geliştirilecektir.

Örneğin:

- Article
- Project
- Book Review
- Essay
- Poem
- Quote

Her içerik tipi kendi ihtiyacına uygun alanlara sahip olacaktır.

Amaç:

- Basit ve güvenilir bir veri modeli oluşturmak.
- Gereksiz erken soyutlamadan kaçınmak.
- Hızlı geliştirme sağlamak.

---

## V2 Veri Modeli Yaklaşımı

İlerleyen versiyonlarda dinamik içerik yönetimi değerlendirilecektir.

Olası yaklaşımlar:

- JSONB tabanlı esnek alanlar
- Dinamik field sistemi
- CMS benzeri içerik modeli

Bu yapı V1 geliştirme sürecinde uygulanmayacaktır.

---

## Temel Veri Alanları

İlerleyen aşamalarda detaylandırılacaktır.

Beklenen temel alan grupları:

- User (V1: yalnızca Super Admin, V2+: Author modeli)
- Content
- Media
- Category
- Tag
- Comment (V2+ etkileşim özellikleri ile birlikte değerlendirilecektir; V1'de ziyaretçi etkileşimi bulunmayacaktır)
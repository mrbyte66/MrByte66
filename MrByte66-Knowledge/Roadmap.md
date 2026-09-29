# Roadmap

Bu dosya, MrByte66 platformunun geliştirme aşamalarını, hedeflerini ve versiyonlar arasındaki dönüşüm planını tanımlamak amacıyla oluşturulmuştur.

Roadmap hazırlanırken temel prensip:

- V1 hızlı ve uygulanabilir olmalıdır.
- Ancak alınan teknik kararlar V2 ve sonraki versiyonlara geçişi desteklemelidir.
- Gereksiz teknik borç oluşturacak çözümlerden kaçınılmalıdır.

---

# Version 1 - Personal Digital Platform (MVP)

## Amaç

MrByte66 platformunun ilk çalışan sürümünü oluşturmak.

Ana hedef:

- Kişisel marka oluşturmak.
- Yazılım ve AI yetkinliklerini sergilemek.
- Teknik yazılar ve kişisel içerikler yayınlamak.
- Modern web geliştirme teknolojilerini uygulayarak güçlü bir portfolyo oluşturmak.

## İçerik Yapısı

V1 içerisinde temel içerik yönetimi sağlanacaktır.

Desteklenecek içerik türleri:

- Article
- Project
- Book Review
- Essay
- Poem
- Quote

İçerik modeli ilerleyen versiyonlarda dinamik içerik yönetimini destekleyecek şekilde tasarlanacaktır.

## Public Website

- Ana sayfa
- Hakkımda
- Blog
- Projeler
- Kitap incelemeleri
- Kişisel yazılar
- CV / Portfolio alanı
- İletişim sayfası

## Yönetim Sistemi

V1 içerisinde temel yönetim alanı oluşturulacaktır.

Super Admin:

- İçerik oluşturabilir.
- İçerik düzenleyebilir.
- İçerik silebilir.
- Platform temel ayarlarını yönetebilir.

## Kullanıcı Sistemi

V1 aşamasında platform tek Super Admin tarafından yönetilecektir.

Kullanıcı kayıt sistemi, Author modeli ve kullanıcı dashboard yapısı bulunmayacaktır.

Amaç:

İlerleyen versiyonlarda kullanıcıların kendi içeriklerini oluşturabileceği Author modeline hazır bir mimariyi korumaktır.

V1 kapsamında yalnızca admin girişi (login/logout) desteklenecektir.

## Teknik Hedefler

- Next.js frontend
- Spring Boot backend
- PostgreSQL database
- REST API
- JWT authentication
- Docker altyapısı
- Unit Test
- Integration Test
- CI/CD altyapısına hazırlık

---

# Version 2 - Dynamic CMS Platform

## Amaç

MrByte66 platformunu kişisel web sitesinden genişletilebilir bir içerik yönetim sistemine dönüştürmek.

## Dynamic Content System

Desteklenecek özellikler:

- Admin panel üzerinden yeni içerik tipleri oluşturma
- Dinamik alan tanımlama
- İçerik şablonları oluşturma
- Esnek içerik modeli yönetimi

Örnek:

Book Review:

- Kitap adı
- Yazar
- Yayın tarihi
- Puan

Yeni içerik tipleri:

- Podcast
- Film incelemesi
- Eğitim içeriği
- Araştırma yazısı

## Advanced Dashboard

Kullanıcılar:

- Kendi içeriklerini oluşturabilir.
- Kendi içeriklerini düzenleyebilir.
- İçerik performanslarını takip edebilir.

## Page Builder

Desteklenecek özellikler:

- Ana sayfa düzenleme
- Sayfa bölümleri oluşturma
- Component tabanlı sayfa tasarlama

## Monetization Hazırlığı

Değerlendirilecek özellikler:

- Premium içerik
- Ücretli üyelik
- Abonelik sistemi

---

# Version 3 - Multi Author Platform

## Amaç

Platformu çok yazarlı içerik üretim sistemine dönüştürmek.

## Özellikler

- Çoklu Author sistemi
- Gelişmiş kullanıcı profilleri
- Yazar sayfaları
- Topluluk özellikleri
- İçerik gelir modeli
- Gelişmiş yetkilendirme sistemi

---

# Long Term Vision

MrByte66 platformunun uzun vadeli hedefi:

Kişisel marka, teknik bilgi paylaşımı, yazılım projeleri, yaratıcı içerikler ve topluluk özelliklerini tek bir çatı altında birleştiren modern ve genişletilebilir bir dijital platform oluşturmaktır.

Platform başlangıçta kişisel bir teknoloji ve içerik platformu olarak başlayacak, ilerleyen dönemlerde içerik üreticilerinin kendi alanlarını oluşturabileceği esnek bir sisteme dönüşebilecektir.
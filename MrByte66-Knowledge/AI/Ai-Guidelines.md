# AI Guidelines

## Amaç

Bu dokümanın amacı, MrByte66 projesinde görev alan AI ajanlarının çalışma prensiplerini, karar alma süreçlerini ve geliştirme standartlarını tanımlamaktır.

MrByte66, AI destekli geliştirme yaklaşımıyla geliştirilen uzun vadeli bir projedir.

AI ajanlarının görevi yalnızca verilen görevleri tamamlamak değildir. Ajanlar; ürün vizyonunu, teknik kaliteyi, mimari bütünlüğü ve proje hafızasını koruyarak geliştirme yapmalıdır.

---

# AI Rolü

AI ajanı projede aşağıdaki rolleri üstlenebilir:

- Yazılım geliştirici
- Teknik analiz asistanı
- Mimari danışman
- Kod kalite kontrolcüsü
- Dokümantasyon destekçisi
- Test destekçisi

Ancak AI ajanı ürün sahibinin yerine geçmez.

Ürün vizyonunu değiştiren, büyük mimari kararlar gerektiren veya uzun vadeli etkisi olan konularda kullanıcı ile karar alınmalıdır.

---

# Genel Çalışma Prensipleri

## 1. Bağlamı Anlamadan Kod Yazma

AI ajanı herhangi bir geliştirme yapmadan önce:

- İlgili dokümanları okumalı.
- Mevcut kod yapısını incelemeli.
- Var olan mimari kararları anlamalı.
- Benzer mevcut çözümleri kontrol etmeli.

Amaç hızlı kod üretmek değil, doğru çözümü üretmektir.

---
## 2. Proje Dokümanlarını Okuma Sırası

AI ajanı geliştirme yapmadan önce aşağıdaki dokümanları ilgili sırayla incelemelidir:

1. Vision.md
2. Requirements.md
3. Architecture.md
4. Roadmap.md
5. Decisions.md
6. AI-Guidelines.md

Görevin kapsamına göre ilgili dokümanlara öncelik verilmelidir.

Amaç; kod yazmadan önce ürün hedeflerinin, teknik mimarinin ve mevcut kararların anlaşılmasıdır.
## 3. Proje Hafızasını Koru

MrByte66 projesindeki önemli bilgiler sohbet geçmişinde veya AI hafızasında tutulmamalıdır.

Kalıcı bilgiler ilgili Markdown dosyalarında tutulmalıdır.

Güncellenmesi gereken belgeler:

- Project.md → Projenin genel tanımı
- Vision.md → Uzun vadeli hedefler
- Requirements.md → Ürün gereksinimleri
- Architecture.md → Teknik yapı
- Decisions.md → Alınan teknik kararlar
- Ideas.md → Gelecek fikirleri

---

## 4. Önce Analiz, Sonra Uygulama

Bir görev geldiğinde AI ajanı:

1. Problemi anlamalı.
2. Mevcut yapıyı analiz etmeli.
3. Alternatif çözümleri değerlendirmeli.
4. En uygun yaklaşımı seçmeli.
5. Değişiklik yapmalı.
6. Test etmeli.
7. Gerekli dokümantasyonu güncellemelidir.
8. Yapılan önemli teknik kararları Decisions.md içerisine kaydetmelidir.

---

# Kod Kalitesi Standartları

- Yazılan kod okunabilir ve sürdürülebilir olmalıdır.
- Basit çözümler tercih edilmelidir.
- Gereksiz abstraction oluşturulmamalıdır.
- Mevcut kod tekrar kullanılabiliyorsa yeniden yazılmamalıdır.
- SOLID prensipleri uygun yerlerde uygulanmalıdır.
- Teknik borç oluşturabilecek çözümler belirtilmelidir.
- Büyük değişikliklerde önce planlama yapılmalıdır.

---

# Mimari Kurallar

- Mimari kararlar rastgele alınmamalıdır.
- Yeni modüller mevcut genişleme hedeflerini desteklemelidir.
- Modüller mümkün olduğunca bağımsız tasarlanmalıdır.
- Gelecekteki geliştirmeler dikkate alınmalıdır.
- Kısa vadeli kolaylık için uzun vadeli mimari bozulmamalıdır.

---

# Test ve Kalite Güvencesi

- Backend iş mantıkları için unit test yazılmalıdır.
- Kritik akışlarda integration test kullanılmalıdır.
- Yeni özellikler mevcut sistemi bozmadığını gösterecek şekilde test edilmelidir.
- Bug düzeltmeleri mümkün olduğunca test ile desteklenmelidir.

---

# Dokümantasyon Kuralları

AI ajanı proje geliştirme sürecinde uzun vadeli etkisi olan kararları Markdown dokümanlarında takip etmelidir.

Aşağıdaki durumlarda ilgili dokümanlar güncellenmelidir:

Yeni mimari karar:
→ Decisions.md

Mimari yapı değişikliği:
→ Architecture.md

Yeni veya değişen ürün gereksinimi:
→ Requirements.md

Yeni fikir veya gelecek özellik:
→ Ideas.md

Proje vizyonunda değişiklik:
→ Vision.md

Roadmap değişikliği:
→ Roadmap.md

Önemli teknik kararlar dokümante edilmeden kalıcı kabul edilmemelidir.

---
# Project Analysis Tools

Projede AI destekli geliştirme sürecinde kod analiz araçları kullanılabilir.

## Graphify Kullanımı

Graphify, mevcut kod tabanının yapısını analiz etmek ve AI agentların projeyi daha hızlı anlamasını sağlamak amacıyla kullanılacaktır.

Kurallar:

- İlk geliştirme aşamasında temel kaynak proje dokümantasyonlarıdır.
- Anlamlı bir kod yapısı oluşmadan Graphify analizi gerekli değildir.
- Proje büyüdükçe Graphify çıktıları güncellenebilir.
- AI agent geliştirme yapmadan önce uygun durumlarda mevcut kod yapısını analiz etmelidir.
- Graphify çıktıları tek başına karar kaynağı değildir; Architecture.md ve Decisions.md ile birlikte değerlendirilmelidir.
# AI Agent Çalışma Prensipleri

Projede birden fazla AI agent görev alabilir.

Agent'lar:

- Bu dokümanda belirtilen genel kurallara uymalıdır.
- Ortak proje hafızasını kullanmalıdır.
- Yaptıkları önemli değişiklikleri dokümante etmelidir.
- Diğer agent'ların anlayabileceği düzenli bir yapı bırakmalıdır.
- Modüler geliştirme prensiplerine uygun hareket etmelidir.

Agent rolleri ve sorumlulukları ayrı olarak Agent-Roles.md içerisinde tanımlanır.

## Agent Sorumlulukları

Birden fazla AI agent kullanılması durumunda:

- Her agent belirlenen sorumluluk alanı içerisinde çalışmalıdır.
- Aynı dosya veya modül üzerinde eş zamanlı değişikliklerden kaçınılmalıdır.
- Büyük değişikliklerde entegrasyon öncesi kontrol yapılmalıdır.
- Agent'lar birbirinden bağımsız karar almamalı, proje dokümantasyonunu referans almalıdır.

---

# Kullanıcı İletişim Kuralları

AI ajanı:

- Emin olmadığı durumlarda varsayım yapmamalıdır.
- Alternatif çözümleri açıklamalıdır.
- Büyük kararları kullanıcıya danışmalıdır.
- Riskleri belirtmelidir.
- Sadece çalışan değil, doğru çözümü önermelidir.

---

# Tamamlanmış Görev Kriterleri

Bir görev tamamlanmış sayılmadan önce:

- Kod çalışmalı.
- Testler geçmeli.
- Gerekli dokümantasyon güncellenmeli.
- Mevcut mimari ile uyum kontrol edilmeli.
- Gereksiz teknik borç oluşturulmadığından emin olunmalıdır.

---

# Version Control Rules

AI tarafından yapılan değişiklikler:

- Anlamlı commit mesajları ile takip edilmelidir.
- Büyük değişiklikler küçük ve kontrol edilebilir parçalara ayrılmalıdır.
- Tamamlanmamış veya test edilmemiş değişiklikler ana branch'e aktarılmamalıdır.

Commit geçmişi, yapılan geliştirmelerin anlaşılabilir bir kaydı olarak tutulmalıdır.
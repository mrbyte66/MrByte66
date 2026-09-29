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

---

## 2026-09-29

### D-015: Admin Article CRUD API Sözleşmesi

**Karar**

Super Admin makale yönetimi `ArticleAdminController` ile
`/api/admin/articles` altında toplanmıştır:

- `POST` → `201` + ArticleDetail, `PUT /{id}` → `200`, `DELETE /{id}` → `204`.
- Kayıp kayıt → `404`; başkasına ait kullanılmış slug → `409`
  (DB unique-constraint 500'ü yerine erken kontrol).
- Geçersiz body → `400` (Bean Validation).
- `/api/admin/**` yalnızca `SUPER_ADMIN` rolü ister (D-006);
  rol kontrolü URL tabanlıdır, metod seviyesi anotasyon yoktur.
- Public okuma (`ArticleController`) ve admin yazma ayrı controller'dır;
  public taraf değişmeden kalır.
- `/error` permitAll'dir: controller'ın fırlattığı statüler (örn. 404),
  Spring Boot'un internal ERROR dispatch'i Security zincirinden tekrar
  geçtiği için 401'e dönüşüyordu (canlıda yakalandı, düzeltildi).
  Bu olmadan silinmiş/taslak slug istekleri 404 yerine 401 dönüyordu.

**Gerekçe**

Admin yazma ve public okuma sorumlulukları karışmamalıdır
(Modular Monolith sınırları, D-010). 409/404 ayrımı frontend'in doğru
geri bildirim vermesi için gereklidir. 23/23 test ve canlı uçtan uca
doğrulama (oluştur → 201 → frontend detay 200 → sil → 204 → 404) yapıldı.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-016: Project İçerik Tipi ve Ortak ContentStatus

**Karar**

- `ArticleStatus` → `ContentStatus` olarak yeniden adlandırıldı;
  tüm V1 içerik tipleri (Article, Project, sonra BookReview/Essay/Poem/Quote)
  aynı statü enum'unu paylaşır. DB değerleri değişmediği için migration
  gerekmedi.
- `Project`: slug/title/summary/content + `technologies`
  (`@ElementCollection`, `project_technologies` tablosu) + demoUrl/sourceUrl
  + status. Teknolojiler virgüllü string yerine ayrı tabloda tutulur
  (gerçek relational model, D-008).
- `technologies` EAGER fetch: koleksiyon küçüktür ve `open-in-view=false`
  ile controller'da DTO mapping yapılırken `LazyInitializationException`
  veriyordu (canlıda yakalandı, düzeltildi).
- Article ile aynı API sözleşmesi: public `GET /api/projects`,
  `GET /api/projects/{slug}` (yalnızca PUBLISHED); admin
  `GET/POST /api/admin/projects`, `PUT/DELETE /api/admin/projects/{id}`
  (201/200/204/404/409).
- Migration: changeset 4 (tablolar) + changeset 5 (1 örnek PUBLISHED proje
  + `setval` ile sequence düzeltmesi).
- Frontend: `/projects` liste, `/projects/[slug]` detay (demo/source
  linkleri), anasayfada Projects nav'i; admin panelde Articles/Projects
  sekmeleri. Tarayıcı→backend çağrıları same-origin proxy route'larla
  (`app/api/...`) yapılır, böylece docker (`backend:8080`) ve local
  (`localhost:8080`) farkı UI koduna yansımaz.

**Gerekçe**

Portföy vitrini kişisel marka hedefinin çekirdeğidir (Requirements).
Article'da kanıtlanan dikey kalıp birebir tekrar kullanıldı; yeni soyutlama
yok. 32/32 test ve canlı uçtan uca doğrulama yapıldı.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-017: Tasarım Sistemi V1 (Dark Editorial + TR)

**Karar**

Arayüz vasat iskeletten dark-first editorial tasarıma geçirildi:

- Fontlar (hepsi `latin-ext` alt kümeli, TR karakterler için):
  Space Grotesk (display) + Inter (body) + JetBrains Mono (etiketler).
- Renkler: `ink #0B0C0E` zemin, `surface #14161A` kartlar,
  `paper #EDEDEF` metin, `muted/faint` ikincil metin,
  accent lime `#C6F135` (ölçülü: etiket, hover, CTA).
- Ortak `SiteHeader` (sticky, blur, mono logo) + `SiteFooter`;
  tüm sayfalar `max-w-5xl/3xl` ritmini paylaşır.
- Hareket: CSS-only (`rise` staggered giriş, `card-lift` hover,
  nav underline, nabız veren API noktası). JS animasyon kütüphanesi yok
  (performans, Requirements).
- Dil: UI Türkçeye çevrildi (`lang="tr"`), içerik zaten Türkçe idi.
- Yeni bağımlılık yok; `npm run build` temiz.

**Gerekçe**

Requirements premium/ödüllük hissiyat, tutarlı tasarım dili ve Türkçe
içerik desteği istiyordu. Tek seferde tüm sayfalar (anasayfa hero,
liste/detay, admin) aynı dile geçirildi ki tutarsızlık borcu kalmasın.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-019: Ölçülü Motion (Sayfa Geçişleri + Smooth Scroll)

**Karar**

D-018 motion sistemi kalabalık bulunduğu için geri alındı (`ff387e7`).
Yerine görsel gürültü yaratmayan üç öğe kondu:

- `template.tsx` ile route değişimlerinde sayfa girişi
  (0.45s fade + 12px rise, `usePathname` key'li, Suspense sarmallı).
- `lenis` smooth scroll (+ anchor desteği). Görünmez altyapı, tek bağımlılık.
- `Reveal`: scroll'da kademeli kart/başlık girişleri (sessiz, 0.8s).
- Geri gelmeyenler: custom cursor, canvas hero, marquee, magnetic,
  progress bar.
- `prefers-reduced-motion` hepsini kapatır; lint + build temiz.

**Gerekçe**

Kullanıcı "daha animasyonlu geçişli ama kalabalık olmayan" site istedi.
Hareket, ortamın parçası değil geçişlerin dili olarak tutuldu.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-022: Gradient Descent 3B Teması (Loss Landscape Journey)

**Karar**

Kullanıcı özgün 3B tema istedi; ana motif yapay zekâdaki gradient
descent. Three.js (tek yeni bağımlılık, R3F yok) ile scrollytelling:

- `LossLandscape`: sabit full-screen canvas. Kayıp yüzeyi (128+ segment
  plane, yükseklik-renkli vertex'ler + wireframe), sayısal gradient
  descent ile hesaplanan amber iniş patikası, vadide nabız gibi atan
  marker, yıldız alanı, fog derinliği.
- Kamera scroll ile vadiye süzülür (CatmullRom eğrisi, lerp yumuşatmalı);
  marker patika üzerinde ilerler — ziyaretçi optimizer'ın ta kendisidir.
- HUD: sol altta canlı `iter/loss` okuması + ilerleme çizgisi.
- İçerik cam panellerde (01 Yazılar, 02 Projeler, final "Vadiye ulaştın").
- Tema uzay koyusu (`#05070D`, sky accent); header/footer blur cam.
- Mobil: düşük segment + DPR cap; reduced-motion: tek statik kare;
  WebGL yoksa canvas gizlenir, içerik okunur kalır.
- lint + build temiz.

**Gerekçe**

Kullanıcının tarifi birebir uygulandı: grafiği içerikle beraber 3
boyutlu gezmek, pürüzsüz geçiş. CSS 3D bu derinliği veremezdi; tam WebGL
gerekti. Detay/admin sayfalar sakin koyu editorial çizgide kaldı.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-023: Bilgi Takımyıldızı (Gezilebilir Graf Hero)

**Karar**

Kullanıcı loss temasından sonra başka özgün deneme istedi. Anasayfa
hero'su el yapımı force-directed bilgi grafiğine çevrildi (Three.js
kaldırıldı, bağımlılık yok):

- `Constellation`: canvas 2D fizik (itme + yay + merkez çekimi, sönüm).
  Düğümler = hub + yazılar (mavi) + projeler (amber); kenarlar hub'a ve
  zincir içi. Sürükle-bırak, hover'da komşu vurgulama + etiket, tıklamada
  detay sayfasına git (sürükleme ile ayırt edilir).
- Arka planda süzülen yıldız tozu; sağ altta renk lejantı.
- İçerik bölümleri cam paneller olarak korundu; HUD ve loss sahnesi silindi.
- Mobil: dokunmatikte tap çalışır, drag yok; reduced-motion: tek
  dengelenmiş kare. lint + build temiz.

**Gerekçe**

Navigasyonun kendisi deneyim olmalı: site haritası yerine yaşayan graf.
Ağır WebGL yerine hafif canvas — aynı özgünlük, daha az maliyet.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-024: LISA Çizgisi (Monokrom + Kinetik Tipografi + Persona)

**Karar**

Kullanıcı LISA (Locomotive) ve Dropbox'ı referans verdi; takımyıldız
denemesi başarısız bulundu. Yeni dil:

- Monokrom zemin + tek mavi vurgu (`#5B9DFF`); beyaz hap butonlar.
- `ShuffleText`: harf karıştırma ile oturan dev başlık
  (ÖĞREN. / ÜRET. / PAYLAŞ.).
- `Typewriter`: sitenin personeli Byte'ın konuşma satırı + yanıp sönen imleç.
- Takımyıldız canvas'ı silindi; cam içerik bölümleri, sayfa geçişleri,
  smooth scroll ve reveal'lar korundu.
- Referanslar Requirements.md'ye işlendi (lisa, chicago.com; dropbox
  doğrulandı). lint + build temiz.

**Gerekçe**

Kullanıcının verdiği örneklerin ortak dili birebir uygulandı: tipografi
konuşur, sahne yok, hareket az ama karakterli.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-021: Apple-Tarzı Aydınlık Tema

**Karar**

Kullanıcı Apple sitesi estetiği istedi; lime yeşili tamamen çıktı:

- Tokenlar aynı isimle aydınlığa döndü: zemin `#FBFBFD`, kart
  `#F5F5F7`/`#FFFFFF`, metin `#1D1D1F`, ikincil `#6E6E73`,
  accent mavi `#0071E3` (buton + link `#0066CC`).
- Header: ince, yarı saydam blur bar; footer: gri dipnot şeridi.
- Anasayfa Apple ritminde: ortalı hero (büyük başlık + mavi hap CTA +
  `>` linkleri), siyah feature tile (öne çıkan proje), gri bantta
  beyaz yazı kartları, ardından proje grid'i.
- 3B sahne/tilt/paralaks kaldırıldı (dosyalar silindi); sayfa geçişleri,
  smooth scroll, reveal ve progress çizgisi korundu.
- `dark:` class kalıntısı temizlendi; `font-display` Inter'e bağlandı.
- lint + build temiz.

**Gerekçe**

Kullanıcı traditional-dışı denemeden sonra net referans verdi: Apple.
Yeşil kimlikten maviye geçildi; sade, bol nefes alan, ürün-odaklı dil.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-020: 3B Derinlik Dili (Traditional-Dışı Tema)

**Karar**

Kullanıcı traditional-dışı, 3 boyutlu hisseden tema istedi. CSS 3D ile
(WebGL yok, yeni bağımlılık yok):

- `Scene3D`: hero'da mouse-paralaks sahne; katmanlar `data-depth` ile
  ekran düzleminde, sahne `rotateX/rotateY` ile döner. Dev outline "66",
  glow'lar, cam efektli yüzen yazı/proje kartları, önde API rozeti.
  3B küme yalnızca `lg` ve üstünde gösterilir, mobilde sade hero kalır.
- `Tilt`: kartlarda hover ile 3B eğilme (max 9°).
- `Parallax`: bölüm başlıklarındaki dev outline kelimeler (YAZILAR,
  PROJELER) scroll ile farklı hızda sürüklenir.
- D-019 öğeleri (sayfa geçişleri, smooth scroll, reveal) korunur;
  cursor/canvas/marquee geri gelmez.
- `prefers-reduced-motion` + `pointer:coarse` guard'ları; lint + build temiz.

**Gerekçe**

Kullanıcı net istedi: normal website görünümünün dışına çık, 3B hisset.
CSS 3D, WebGL ağırlığı olmadan bu hissi verir ve detaysayfalar/admin
sakin kalır (okunabilirlik korunur).

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-025: Minimalist Anasayfa

**Karar**

Kullanıcı sadeleşme istedi. Anasayfa dar kolona çekildi: isim + tek
paragraf + linkler; Yazılar ve Projeler ince çizgili liste satırları
(başlık + tarih / teknolojiler). Kart yok, hero yok, kinetik tipografi
silindi (dosyalar kaldırıldı). Detay ve admin sayfalar zaten sakindi,
aynen korundu.

**Gerekçe**

Bir dizi denemeden sonra net istek: süssüz, içerik-odaklı giriş.
Az öğe, çok nefes.

**Durum**

Kabul edildi.

---

## 2026-09-29

### D-026: Topografik İniş Hero'su + Görsel Doğrulama Döngüsü

**Karar**

- Hero'ya gerçek loss fonksiyonunun marching-squares izo-eğrileri
  (`TopoMap`, server-render SVG): akan konturlar, animasyonlu amber iniş
  patikası, nabız minimum noktası. Üstünde shuffle başlık + daktilo
  persona + CTA'lar. Liste satırlarına ok-animasyonlu hover.
- Süreç dersi: headless Chrome screenshot döngüsü kuruldu
  (`--user-data-dir` taze profil şart; default profil bayat cache sunar).
  Bu sayede kör ilerleme bitti; hero ve detay ekran görüntüleriyle
  doğrulandı (prod build dahil).
- Font paniği asılsız çıktı: next/font latin-ext blokları doğru servis
  ediliyor, Türkçe glifler prod ve dev'de düzgün. `@theme` değişken
  isimleri çakışma ihtimaline karşı netleştirildi (`--font-inter` vb.).
- lint + build temiz.

**Gerekçe**

Kullanıcı wow istedi; wow, gözle doğrulama gerektirir. Topo hero hem
özgün (matematiksel olarak gerçek yüzey) hem hafif (JS animasyon
kütüphanesi yok, saf SVG+CSS).

**Durum**

Kabul edildi.
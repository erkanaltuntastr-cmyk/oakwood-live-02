# Oakwood Learning Hub — Marka, Stil ve Uygulama Stratejisi

## 1. Amaç

Bu doküman, **Oakwood Learning Hub** için seçilen görsel stilin, logo sisteminin, ikon ailesinin, arka plan yaklaşımının ve uygulama içi tasarım kurallarının tek kaynak altında toplanması için hazırlanmıştır.

Bu dokümanın amacı Claude, Copilot, Stitch, Gemini veya başka bir geliştirme/tasarım aracının aynı görsel dili takip etmesini sağlamaktır. Ana hedef, yeni tasarım üretmek değil; seçilen Oakwood stilini uygulama boyunca tutarlı şekilde kullanmaktır.

---

## 2. Marka Adı ve Motto

## Marka adı

**Oakwood Learning Hub**

## Motto

**Supporting families, empowering students, advancing education.**

## Marka anlamı

Oakwood Learning Hub; ailelerin, öğrencilerin ve eğitim sürecinin aynı merkezde birleştiği, sakin, güvenilir ve akıllı bir öğrenme platformudur. Ürün yalnızca quiz veya ders takip sistemi değildir; aile merkezli, AI destekli, yerel çalışan ve ileride web/desktop/mobil uyumlu hale gelecek bir öğrenme yönetim sistemidir.

---

## 3. Marka Hissi

Oakwood Learning Hub şu duyguları vermelidir:

* Güven
* Sakinlik
* Aile desteği
* Öğrenci gelişimi
* Eğitim disiplini
* Modern ama abartısız teknoloji
* UK okul/veli pazarına uygun ciddiyet
* Premium ama soğuk olmayan bir deneyim

Bu marka hiçbir zaman fazla çocukça, oyunlaştırılmış, parlak, çizgi film gibi veya sert kurumsal görünmemelidir.

---

## 4. Görsel DNA

Oakwood stilinin ana görsel DNA’sı şudur:

* Organik akan çizgiler
* Ağaç, dal, kök ve yaprak motifleri
* Soft green / sage / beige renk paleti
* Sakin, açık ve ferah arka planlar
* Serif başlık estetiği
* Modern sans-serif gövde metni
* Hafif botanical / root-network hissi
* Aile, öğrenci ve eğitim temasını doğrudan ama zarif biçimde anlatan çizgisel ikonlar

Ana fikir:

```text
Ağaç = büyüme ve eğitim
Kökler = aile desteği
Ağ / bağlantılar = hub ve AI destekli sistem
Dallar = öğrencinin öğrenme yolculuğu
Yumuşak çizgiler = güven ve sakinlik
```

---

## 5. Kullanılmayacak Görsel Diller

Aşağıdaki yönlere kesinlikle gidilmemelidir:

* Cartoon / çocuk çizgi film tarzı
* Çok parlak primary renkler
* Robot, beyin, sci-fi AI sembolleri
* Shield / badge / crest / okul arması tarzı
* Gerçekçi ağaç illüstrasyonu
* Fotoğrafik veya 3D render tarzı
* Çok detaylı yaprak, kök ve dallar
* Sert circuit-board / teknoloji ağı görünümü
* Rastgele icon pack kullanımı
* Farklı ikonların farklı görsel dillerde olması

Özellikle Claude veya Copilot yeni ikon üretirken **Lucide gibi hazır ikonlar yalnızca küçük yardımcı aksiyonlarda kullanılmalı**, ana marka ikonları özel Oakwood SVG ikonları olmalıdır.

---

## 6. Logo Sistemi

Seçilen logo sistemi artık değiştirilmeyecek ana görsel referanstır.

Claude, Copilot veya başka bir araç şu kuralı takip etmelidir:

```text
Use this exact logo system and style as the visual source of truth. Do not redesign.
```

## 6.1 Master Logo

**Kullanım alanları:**

* Landing page hero
* Giriş / tanıtım ekranı
* Pitch deck
* Sunumlar
* Marka dokümanları
* Büyük format tanıtımlar

**İçerik:**

* Organik akan ağaç formu
* Oakwood Learning Hub yazısı
* Motto
* Alt tarafta root/network hissi veren bağlantılı kök motifi

Master logo bozulmamalı, yeniden çizilmemeli ve farklı bir stile taşınmamalıdır.

## 6.2 Compact Horizontal Logo

**Kullanım alanları:**

* Web app header
* Dashboard topbar
* Sidebar üst alanı
* Navigasyon çubuğu

**Yapı:**

```text
[Tree Icon] Oakwood Learning Hub
```

Tagline kullanılmaz. Ağaç daha küçük, yazı daha okunabilir olmalıdır. Header yüksekliği yaklaşık 40–48px aralığında çalışmalıdır.

## 6.3 Compact Stacked Logo

**Kullanım alanları:**

* Login ekranı
* Profile selection ekranı
* Empty state ekranları
* Onboarding alanları

**Yapı:**

```text
[Tree Icon]
Oakwood Learning Hub
```

Bu versiyon master logodan daha sade olmalı ama aynı marka hissini taşımalıdır.

## 6.4 Icon Version

**Kullanım alanları:**

* App icon
* Profil avatarı
* Sosyal medya avatarı
* Sidebar büyük ikon
* Mobile launcher icon

**Kurallar:**

* Sadece ağaç sembolü
* Yazı yok
* Tagline yok
* Master logoya göre %40–50 sadeleştirilmiş
* Daha kalın stroke
* Daha az dal
* Daha az küçük detay
* Square ve circle crop içinde çalışmalı

## 6.5 Micro Icon

**Kullanım alanları:**

* Favicon
* Browser tab
* Çok küçük UI alanları
* 16px / 32px kullanımlar

**Kurallar:**

* 1 trunk
* 3 ana dal
* 3 kök/bağlantı hissi
* Tek renk
* Küçük yaprak yok
* İnce detay yok
* Tanınabilirlik güzellikten daha önemlidir

---

## 7. Renk Paleti

Mevcut uygulamadaki tokenlar korunmalıdır.

## Ana renkler

```css
--oakwood-green-primary: #769a7c;
--oakwood-green-dark: #4a5d4d;
--oakwood-neutral-bg: #fdfbf7;
--oakwood-text: #333333;
--oakwood-sage: #a8bfa6;
--oakwood-beige: #d8cbb2;
```

## Repoda mevcut ana tokenlar

```css
--background: #fff8f5;
--foreground: #2D2926;
--primary: #4A6741;
--secondary: #EAE4D9;
--muted: #F9F7F4;
--muted-foreground: #7C766C;
--accent: #F2F4EF;
--border: #EAE4D9;
```

## Tailwind oak tokenları

```js
oak: {
  green: '#4A6741',
  'green-light': '#F2F4EF',
  'green-hover': '#3d5836',
  beige: '#EAE4D9',
  'beige-light': '#F9F7F4',
  warm: '#FFF8F5',
  text: '#2D2926',
  muted: '#7C766C'
}
```

## Renk kullanım stratejisi

* Primary aksiyonlarda forest green kullanılmalı.
* Arka planlarda warm off-white / soft beige kullanılmalı.
* Kartlarda beyaz veya white/70 blur yüzeyler kullanılabilir.
* Borderlar sert gri değil, sıcak beige olmalı.
* Vurgu için sage / soft green kullanılmalı.
* Dark mode’da neon veya parlak yeşil kullanılmamalı.

---

## 8. Tipografi

## Başlık fontu

**Playfair Display**

Kullanım:

* Logo wordmark
* Ana başlıklar
* Premium / editorial his gereken yerler
* Login ve onboarding başlıkları

## Gövde fontu

**Inter**

Kullanım:

* Uygulama metinleri
* Kartlar
* Formlar
* Butonlar
* Navigation
* Dashboard içerikleri

## Tipografi hissi

Başlıklar sakin ve premium olmalı. Gövde metinleri çok okunaklı, modern ve pratik olmalı. Aşırı ince, aşırı dekoratif veya çocukça fontlardan kaçınılmalıdır.

---

## 9. İkon Stratejisi

Oakwood ikon ailesi özel üretilmiş çizgisel SVG ikonlardan oluşmalıdır. Tüm ikonlar aynı çizgi kalınlığı, yuvarlak uçlar, soft green / sage / beige renkleri ve botanical detaylar taşımalıdır.

## Genel ikon kuralları

* SVG React component olmalı
* Stroke `currentColor` desteklemeli
* `className`, `size`, `strokeWidth`, `variant` alabilmeli
* Round linecap ve round linejoin kullanılmalı
* Ana ikonlarda Lucide kullanılmamalı
* Gereksiz yüz detayı, göz/mimik aşırılığı ve cartoon hissinden kaçınılmalı

## Önerilen dosya

```text
src/components/brand/OakwoodIcons.tsx
```

## Önerilen exportlar

```ts
ParentMaleIcon
ParentFemaleIcon
StudentGirlJuniorIcon
StudentGirlSeniorIcon
StudentBoyJuniorIcon
StudentBoySeniorIcon
FamilyHubIcon
LessonsIcon
QuizIcon
HomeworkIcon
ReportIcon
AIIcon
ResourcesIcon
MessagesIcon
SettingsIcon
PinIcon
```

---

## 10. Rol İkonları

## 10.1 Veli — Erkek

**Anlam:**

* Rehberlik
* Güven
* Sorumluluk
* Aile içi destek

**Görsel tarif:**

Erkek veli ikonu, yüz detayları minimal olan, sakin ve güven veren çizgisel bir portre olmalıdır. Saç ve gövde çizgileri Oakwood ağacındaki akışkan dal çizgilerini hatırlatmalı, göğüs veya omuz bölgesinde küçük branch/leaf accent bulunabilir. Sert takım elbise, fazla corporate görünüm veya agresif maskülen ifade kullanılmamalıdır.

## 10.2 Veli — Kadın

**Anlam:**

* Şefkat
* Düzen
* Rehberlik
* Sakin güven

**Görsel tarif:**

Kadın veli ikonu, yumuşak saç çizgileri ve sade yüz formu ile çizilmelidir. Saç çizgileri doğal dal akışı gibi olmalı, küçük beige veya sage highlight kullanılabilir. İkon fazla güzellik/portre odaklı değil, aile ve rehberlik odaklı olmalıdır.

## 10.3 Öğrenci — Kız 0–6. Sınıf

**Anlam:**

* Merak
* Güvenli öğrenme
* Başlangıç seviyesi gelişim

**Görsel tarif:**

Daha küçük yaş grubu için ikon daha sıcak, daha basit ve daha yuvarlak olmalıdır. Pigtail veya kısa saç gibi çocukluğu anlatan ama cartoon olmayan sade bir form kullanılabilir. Yüz ifadesi hafif gülümseyen, sakin ve güven verici olmalıdır; küçük yaprak motifleri öğrenme büyümesini temsil edebilir.

## 10.4 Öğrenci — Kız 7+ Sınıf

**Anlam:**

* Bağımsızlık
* Olgunlaşan öğrenme
* Akademik gelişim

**Görsel tarif:**

Daha büyük kız öğrenci ikonu, junior versiyona göre daha olgun, daha sade ve daha az çocukça olmalıdır. Saç ve gövde çizgileri daha düzenli, yüz ifadesi daha sakin ve kendinden emin olmalıdır. School uniform çağrışımı hafif tutulabilir ama aşırı okul rozeti, kravat veya klişe kullanılmamalıdır.

## 10.5 Öğrenci — Erkek 0–6. Sınıf

**Anlam:**

* Başlangıç
* Oyunla öğrenmeden ciddi öğrenmeye geçiş
* Merak

**Görsel tarif:**

Junior erkek öğrenci ikonu kısa saçlı, sade yüzlü, yuvarlak ve sıcak bir çizgisel portre olmalıdır. Kıyafet basit tutulmalı, küçük leaf/branch detayları gövde çevresinde kullanılabilir. İkon çocuksu olabilir ama çizgi film karakteri gibi olmamalıdır.

## 10.6 Öğrenci — Erkek 7+ Sınıf

**Anlam:**

* Akademik ilerleme
* Daha bağımsız çalışma
* Hedef odaklı gelişim

**Görsel tarif:**

Senior erkek öğrenci ikonu junior versiyona göre daha olgun, daha düz ve sakin olmalıdır. Saç, yüz ve omuz çizgileri daha kontrollü olmalı, ifade gülümseyen ama fazla çocukça olmayan bir karakter vermelidir. Botanical çizgiler kıyafet veya arka aksan olarak eklenebilir.

---

## 11. Ürün İkonları

## Family Hub Icon

Aile hub’ı ikonu; iki veli, iki çocuk ve merkezde küçük ağaç/kök bağlantısı hissini vermelidir. Bu ikon sosyal medya network sembolü gibi teknik görünmemeli, aile birliği ve öğrenme merkezi fikrini aynı anda taşımalıdır. Node bağlantıları soft ve organik olmalı.

## Lessons Icon

Dersler ikonu, açık kitap veya lesson card formunu Oakwood dal/yaprak çizgileriyle birleştirmelidir. Kitap çok literal olmamalı, bilgi akışı ve öğrenme yolu hissi vermelidir.

## Quiz Icon

Quiz ikonu, soru işareti veya assessment card ile küçük branch/check accent kullanabilir. Sınav hissi stresli değil, ölçme ve gelişim odaklı olmalıdır.

## Homework Icon

Homework ikonu, checklist veya task card üstüne küçük leaf/check detayıyla tasarlanmalıdır. Hissiyat kurumsal iş takibi değil, sakin pratik ve tekrar çalışması olmalıdır.

## Report Icon

Rapor ikonu, chart barların stem/leaf gibi yükseldiği bir formda olabilir. Soğuk analytics hissinden kaçınılmalı; gelişim, insight ve yönlendirme hissi öne çıkmalıdır.

## AI Icon

AI ikonu robot veya beyin olmamalıdır. Chat bubble, sparkle ve küçük leaf/root motifleriyle “yardımcı zeka” hissi verilmeli. Yapay zeka ürünün içinde sakin bir yardımcı gibi görünmelidir.

## Resources Icon

Kaynakça ikonu, folder, bookmark veya card stack formuna soft leaf accent eklenerek oluşturulmalıdır. PDF, link, image ve text kaynaklarının tek yerde toplandığı hissi vermelidir.

## Messages Icon

Mesajlar ikonu, speech bubble ile küçük connected node/leaf motifini birleştirmelidir. Chat app gibi değil, aile-öğretmen-öğrenci iletişim panosu gibi hissettirmelidir.

## Settings Icon

Settings ikonu sert endüstriyel gear gibi olmamalıdır. Gear formu yumuşatılmalı, içine küçük circular leaf veya root connection detayı eklenmelidir.

## PIN / Security Icon

PIN ikonu, küçük lock ve user/tree accent ile tasarlanmalıdır. Güvenlik hissi vermeli ama tehditkâr veya kurumsal güvenlik ürünü gibi durmamalıdır.

---

## 12. Background Sistemi

## 12.1 Ana Uygulama Background’u

Ana uygulama background’u warm off-white tonunda olmalıdır. Çok hafif botanical/root pattern kullanılabilir ama opacity 3–5% civarında kalmalıdır. İçerik kartlarının okunabilirliği asla bozulmamalıdır.

```css
.oak-bg-app {
  background-color: #fff8f5;
  background-image:
    radial-gradient(circle at 20% 10%, rgba(168,191,166,0.12), transparent 24%),
    radial-gradient(circle at 80% 90%, rgba(216,203,178,0.16), transparent 28%);
}
```

## 12.2 Family Hub Background

Aile hub’ı arka planı, aile figürleri ve kök/network motiflerini çok hafif şekilde taşımalıdır. Sağ alt veya alt bölgeye doğru aile silüeti ve kök bağlantıları kullanılabilir. Orta alan boş ve okunabilir kalmalıdır.

**Görsel tarif:**

* Warm off-white temel
* Sol üstte çok hafif yaprak/dal motifi
* Sağ altta aile figürü
* Aile figüründen çıkan yumuşak root/network çizgileri
* Çok düşük kontrast
* UI kartlarını engellemeyecek boşluk

## 12.3 Öğrenci Sayfası Background

Öğrenci sayfası arka planı daha hafif, daha ferah ve öğrenme yolculuğu hissi vermelidir. Dotted learning path, küçük book/sprout/achievement iconları ve soft root çizgileri kullanılabilir.

**Görsel tarif:**

* Açık warm background
* Köşelerde ince dallar
* Alt sağdan çıkan root/learning path çizgileri
* Çok hafif ders simgeleri: kitap, filiz, graduation değil daha soft öğrenme sembolleri
* Çocuğu bunaltmayan sakin görünüm

## 12.4 Dashboard Background

Dashboard background daha sade olmalıdır. Kartların yoğun olduğu alanlarda pattern minimumda kalmalı. Köşe motifleri veya radial warmth yeterlidir.

## 12.5 Dark Mode Background

Dark mode arka planı koyu forest green veya charcoal-green olmalıdır. Sage line pattern çok düşük opacity ile kullanılabilir. Neon, glow veya yüksek kontrastlı çizgiler kullanılmamalıdır.

```css
.oak-bg-dark {
  background-color: #1f2a22;
  background-image:
    radial-gradient(circle at 15% 20%, rgba(168,191,166,0.08), transparent 26%),
    radial-gradient(circle at 90% 80%, rgba(118,154,124,0.08), transparent 30%);
}
```

---

## 13. Component Stil Kuralları

## Kartlar

Kartlar yumuşak, yuvarlak, açık renkli ve hafif gölgeli olmalıdır.

```css
.oak-card {
  background: rgba(255,255,255,0.70);
  backdrop-filter: blur(8px);
  border: 1px solid #EAE4D9;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(74,103,65,0.06);
}
```

## Butonlar

Primary butonlar forest green olmalı. Hover’da daha koyu yeşile geçmeli. Butonlar sert köşeli değil, rounded-xl olmalıdır.

```css
.oak-btn-primary {
  background: #4A6741;
  color: white;
  border-radius: 0.75rem;
}
```

## Profile Cards

Profile cards özellikle önemlidir. Veli ve öğrenci ayrımı ikonlarla net verilmelidir. Kartlarda başlangıçta initials yerine Oakwood rol ikonları kullanılabilir veya initials küçük secondary bilgi olarak kalabilir.

## Navigation

Sidebar ve topbar ikonları aynı Oakwood icon setinden gelmelidir. Lucide iconlar yalnızca “close”, “chevron”, “more”, “search” gibi utility aksiyonlarda kullanılmalıdır.

---

## 14. Claude İçin Uygulama Talimatı

Aşağıdaki metin Claude’a doğrudan verilebilir:

```text
Use the Oakwood brand system as the visual source of truth.
Do not redesign the logo.
Do not invent a new style.
Do not use random icon packs for core brand icons.

Apply this visual system across the app:
- organic flowing line icons
- soft green, sage, beige, warm white palette
- Playfair Display for headings / brand moments
- Inter for UI text
- rounded cards, soft borders, calm spacing
- subtle botanical/root backgrounds

Create or update:
1. src/components/brand/OakwoodIcons.tsx
2. Parent male/female icons
3. Student junior/senior girl/boy icons
4. FamilyHub icon
5. Lessons, Quiz, Homework, Reports, AI, Resources, Messages, Settings, PIN icons
6. Background utility classes in src/index.css
7. Update sidebar/topbar/profile cards to use Oakwood icons
8. Keep Lucide only for minor utility actions

Everything must feel like one brand family.
Consistency matters more than creativity.
```

---

## 15. Dosya ve Klasör Önerisi

```text
src/
├── assets/
│   └── brand/
│       ├── logo/
│       │   ├── master-logo.svg
│       │   ├── compact-horizontal.svg
│       │   ├── compact-stacked.svg
│       │   ├── icon.svg
│       │   ├── icon-dark.svg
│       │   ├── micro-16.svg
│       │   └── micro-32.svg
│       └── backgrounds/
│           ├── family-hub-bg.svg
│           ├── student-bg.svg
│           └── app-bg-pattern.svg
│
├── components/
│   └── brand/
│       ├── OakwoodLogo.tsx
│       ├── OakwoodIcons.tsx
│       └── OakwoodBackground.tsx
```

---

## 16. React Component Yaklaşımı

## OakwoodLogo

```tsx
type OakwoodLogoVariant = 'master' | 'compact-horizontal' | 'compact-stacked' | 'icon' | 'micro';

type OakwoodLogoProps = {
  variant?: OakwoodLogoVariant;
  theme?: 'light' | 'dark';
  className?: string;
};
```

## OakwoodIcon

```tsx
type OakwoodIconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  variant?: 'line' | 'filled' | 'soft';
};
```

Tüm ikonlar aynı prop yapısını desteklemelidir.

---

## 17. MVP İçin Önceliklendirme

İlk uygulanacak görsel öğeler:

1. Master logo assetleri
2. Compact header logo
3. Profile selector için veli/öğrenci ikonları
4. Family Hub background
5. Student page background
6. Sidebar navigation ikonları
7. Dashboard kart stilleri
8. Dark mode logo varyantı

Daha sonra:

* Advanced report ikonları
* Kaynakça illüstrasyonları
* Empty state görselleri
* AI chat illustration seti
* Print / PDF rapor tasarım sistemi

---

## 18. Karar Özeti

Oakwood Learning Hub için nihai görsel karar şudur:

```text
Ana marka = organik akan ağaç + aile kökleri + öğrenme bağlantıları
Ürün hissi = sakin, güvenilir, premium, aile dostu, UK eğitim pazarına uygun
Teknoloji hissi = var ama sessiz; robotik değil, yardımcı ve bağlamsal
UI yaklaşımı = warm minimal + botanical intelligence
```

Bu doküman güncel görsel stratejinin temel referansıdır. Yeni ekran, ikon veya component üretirken bu dokümandaki sistem korunmalıdır.

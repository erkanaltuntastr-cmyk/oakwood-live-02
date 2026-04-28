# OAKWOOD ASSET AUDIT

## 1) PNG Asset Copy Status

15 PNG asset `C:\DEV\Projects\Parent_app\Stil\Mapped` klasöründen
`C:\DEV\Projects\Parent_app\live_02\src\assets\brand\icons` klasörüne birebir kopyalandı:

1. `src/assets/brand/icons/parent-male.png`
2. `src/assets/brand/icons/parent-female.png`
3. `src/assets/brand/icons/student-primary.png`
4. `src/assets/brand/icons/student-year7.png`
5. `src/assets/brand/icons/student-secondary.png`
6. `src/assets/brand/icons/family-hub-icon.png`
7. `src/assets/brand/icons/lessons-icon.png`
8. `src/assets/brand/icons/quiz-icon.png`
9. `src/assets/brand/icons/homework-icon.png`
10. `src/assets/brand/icons/report-icon.png`
11. `src/assets/brand/icons/ai-icon.png`
12. `src/assets/brand/icons/resources-icon.png`
13. `src/assets/brand/icons/messages-icon.png`
14. `src/assets/brand/icons/settings-icon.png`
15. `src/assets/brand/icons/pin-icon.png`

Dosya varlığı komutla doğrulandı.

## 2) OakwoodAssetIcon Component

Yeni component: `src/components/brand/OakwoodAssetIcon.tsx`

- SVG çizmez.
- Sadece `<img>` render eder.
- `object-contain` uygular.
- `draggable={false}` kullanır.
- `type`, `className`, `size`, `alt` destekler.
- 15 tip için birebir dosya mapping içerir.

## 3) Role/Profile Icon Migration

### Güncellenen dosyalar

- `src/components/Avatar.tsx`
- `src/features/auth/ProfileSelect.tsx`

### Son durum

- Ana role/profile ikonları artık generated/custom SVG değil, PNG asset kullanıyor.
- Mapping:
  - parent male -> `parent-male`
  - parent female -> `parent-female`
  - student primary -> `student-primary`
  - student year 7+ -> `student-year7`
  - student secondary -> `student-secondary`
- Gender/year belirsizliğinde mevcut profil alanları ile karar veriliyor; karar verilemeyen parent için deterministic fallback uygulanıyor.
- `ProfileSelect` kartları büyütüldü, içerik merkez eksene alındı, ikon alanı minimum 112px korunuyor.

## 4) Core Navigation Migration

### Güncellenen dosyalar

- `src/app/shell/Sidebar.tsx`
- `src/features/command/CommandPalette.tsx`
- `src/app/shell/Topbar.tsx` (AI butonu)

### Son durum

Core navigation/brand ikonları PNG asset kullanıyor:

- family hub -> `family-hub`
- lessons/subjects -> `lessons`
- quiz/assessments -> `quiz`
- homework/assignments -> `homework`
- reports -> `report`
- ai -> `ai`
- messages -> `messages`
- settings -> `settings`
- pin/security -> `pin`

## 5) Feature Screen Migration

### Güncellenen dosyalar

- `src/features/dashboard/Dashboard.tsx`
- `src/features/children/ChildrenHub.tsx`
- `src/features/subjects/Subjects.tsx`
- `src/features/homework/Homework.tsx`
- `src/features/quiz/QuizWizard.tsx`
- `src/features/quiz/QuizSession.tsx`
- `src/features/quiz/QuizResultShell.tsx`
- `src/features/quiz/QuizSessionShell.tsx`
- `src/features/reports/Reports.tsx`
- `src/features/messages/Messages.tsx`
- `src/features/settings/Settings.tsx`
- `src/app/shell/AiPanel.tsx`
- `src/features/auth/LoginForm.tsx`
- `src/features/auth/PinEntry.tsx`

Bu dosyalardaki başlık/empty/action/feature alanlarındaki brand ikonlar PNG asset katmanına taşındı.

## 6) OakwoodIcons.tsx Policy Status

`src/components/brand/OakwoodIcons.tsx` silinmedi.

Bypass edilen generated/custom SVG alanları:

- Role/profile ikonları (`Avatar` ve profile kartları)
- Core navigation ikonları (`Sidebar`, `CommandPalette`, `Topbar`)
- Feature ekranlarındaki ana brand ikonları

Hala `OakwoodIcons.tsx` kullanan yerler:

1. `src/features/auth/Welcome.tsx`
   - Neden: landing sayfası özel kompozisyonunda çok sayıda dekoratif/tematik ikon kullanımı var.
   - Durum: manual review ile asset-only standardına geçirilebilir.
2. `src/components/brand/OakwoodLogo.tsx`
   - Neden: compact logo varyantı içinde `OakTreeIcon` kullanımı var.
   - Durum: mevcut davranış korunmuş durumda.

## 7) Lucide Usage Audit

Lucide kalan kullanımlar utility amaçlıdır:

- close, back, edit, delete, plus, chevron, send, keyboard, menu benzeri aksiyon ikonları
- trend/check/status gibi yardımcı semantik göstergeler

Core brand navigation ikonu olarak Lucide kullanılmıyor.

## 8) Missing Asset / Manual Review

- Eksik PNG asset: yok
- Manual review gereken alanlar:
  1. `src/features/auth/Welcome.tsx` (asset-only policy’ye tam çekim)
  2. `src/components/brand/OakwoodLogo.tsx` (compact tree icon politikası doğrulaması)


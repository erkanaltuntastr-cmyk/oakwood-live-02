# OAKWOOD ASSET AUDIT (LATEST)

## PNG Icon Assets

`src/assets/brand/icons` altında 15 PNG asset mevcut ve kullanılabilir durumda:

- `parent-male.png`
- `parent-female.png`
- `student-primary.png`
- `student-year7.png`
- `student-secondary.png`
- `family-hub-icon.png`
- `lessons-icon.png`
- `quiz-icon.png`
- `homework-icon.png`
- `report-icon.png`
- `ai-icon.png`
- `resources-icon.png`
- `messages-icon.png`
- `settings-icon.png`
- `pin-icon.png`

## Welcome.tsx Status

- `src/features/auth/Welcome.tsx` artık brand ikonlarını `OakwoodAssetIcon` üzerinden PNG asset ile render ediyor.
- `Welcome.tsx` artık `src/components/brand/OakwoodIcons.tsx` import etmiyor.
- Role preview ve learner preview de PNG asset mapping kullanıyor:
  - `parent-male`
  - `parent-female`
  - `student-primary`
  - `student-year7`
  - `student-secondary`

## OakwoodIcons.tsx Status

Core brand icon kullanımından çıkarıldı (nav/profile/feature ekranlarında PNG’ye geçildi).

Kalan kullanım:

1. `src/components/brand/OakwoodLogo.tsx`
   - `OakTreeIcon` fallback olarak kullanılıyor (compact/icon/micro varyantlar için).

## OakwoodLogo.tsx / Logo Crop Assets

`C:\DEV\Projects\Parent_app\Stil\MappedLogo` klasörü bulundu ancak logo varyant PNG dosyaları yok (klasör boş).

Bu nedenle `src/components/brand/OakwoodLogo.tsx` için durum:

- master logo PNG var (`src/assets/brand/oakwood-logo.png`)
- compact/icon/micro varyantları halen SVG fallback (`OakTreeIcon`)
- bu alan **waiting for logo crop assets** durumunda

Waiting list (MappedLogo assetleri geldikten sonra bağlanacak):

- `master-logo.png`
- `compact-logo-horizontal.png`
- `compact-logo-stacked.png`
- `icon-full-colour.png`
- `micro-icon-16.png`
- `micro-icon-32.png`

## Lucide Usage

Lucide kullanımları utility aksiyonlar için bırakıldı:

- back
- close
- plus
- delete
- edit
- chevron
- send
- keyboard

Core brand icon olarak Lucide kullanılmıyor.


# CBAP Mock Exam System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cbap-mock-exam)

## 🎯 Özellikler

- **5 Kapsamlı Mock Exam** - Her birinde 120 özenle seçilmiş soru
- **600 Toplam Soru** - CBAP sertifikasyon sınavına tam hazırlık
- **Türkçe Arayüz** - Tam Türkçe dil desteği
- **Canlı Timer** - 300 dakikalık gerçek sınav süresi
- **İlerleme Takibi** - localStorage ile otomatik kaydetme
- **Soru İşaretleme** - İnceleme için soruları işaretleme
- **Detaylı Analiz** - Sınav sonucu ve performans analizi
- **Responsive Tasarım** - Tüm cihazlarda mükemmel çalışır

## 🚀 Hızlı Başlangıç

### Vercel'e Deploy (Önerilen)

1. Bu repo'yu fork edin veya kopyalayın
2. [Vercel](https://vercel.com) hesabınızla giriş yapın
3. "Add New Project" → Repository'yi import edin
4. Ayarlar:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Deploy butonuna tıklayın!

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build'i önizle
npm run preview
```

## 📁 Proje Yapısı

```
├── client/                 # Frontend kaynak kodları
│   ├── components/         # React bileşenleri
│   ├── contexts/          # React Context API
│   ├── pages/             # Sayfa bileşenleri
│   └── lib/               # Yardımcı fonksiyonlar
├── public/
│   └── data/              # Mock exam JSON dosyaları
├── dist/                  # Build çıktısı
└── package.json           # Dependencies ve scripts
```

## 🎮 Kullanım

1. Ana sayfada 5 farklı mock exam'dan birini seçin
2. Sınavı başlatın - 300 dakika süreniz var
3. Soruları cevaplayın, işaretleyebilirsiniz
4. İstediğiniz zaman bırakıp devam edebilirsiniz
5. Bitirdiğinizde detaylı analiz görün

## 🛠️ Teknolojiler

- **React 18** - Modern React hooks ve features
- **TypeScript** - Type safety
- **Vite** - Hızlı build tool
- **TailwindCSS** - Utility-first CSS
- **React Router** - SPA routing
- **Lucide React** - Beautiful icons

## 📊 Mock Exam İçeriği

| Exam        | Sorular | Durum         |
| ----------- | ------- | ------------- |
| Mock Exam 1 | 120     | ✅ Hazır      |
| Mock Exam 2 | 120     | ✅ Hazır      |
| Mock Exam 3 | 120     | ✅ Hazır      |
| Mock Exam 4 | 120     | ✅ Hazır      |
| Mock Exam 5 | 120     | ✅ Hazır      |
| **Toplam**  | **600** | **✅ Komple** |

## 🔧 Konfigürasyon

### Environment Variables

Hiçbir environment variable gerekmez - tamamen statik.

### Vercel Settings

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## 📱 Browser Desteği

- Chrome/Edge (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Mobil browsers (iOS Safari, Chrome Mobile)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🎓 CBAP Hakkında

CBAP (Certified Business Analysis Professional), IIBA tarafından verilen prestijli bir iş analisti sertifikasıdır. Bu mock exam sistemi, gerçek sınava hazırlananlar için kapsamlı pratik imkanı sağlar.

---

**Not**: Bu sistem eğitim amaçlıdır ve IIBA ile resmi bir bağlantısı yoktur.

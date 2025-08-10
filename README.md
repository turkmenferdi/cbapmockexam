# CBAP Mock Exam System

CBAP (Certified Business Analysis Professional) sertifikasına hazırlık için kapsamlı mock exam sistemi.

## 🎯 Özellikler

- **5 Kapsamlı Mock Exam** - Her birinde 120 soru (Toplam 600 soru)
- **Türkçe Arayüz** - Tam Türkçe dil desteği
- **Gerçek Sınav Deneyimi** - 300 dakika süre limiti
- **İlerleme Takibi** - Otomatik kaydetme ve devam etme
- **Soru İşaretleme** - İnceleme için soruları işaretleme
- **Detaylı Analiz** - Sınav sonrası performans analizi
- **Responsive Tasarım** - Mobil ve desktop uyumlu

## 🚀 Demo

[Canlı Demo'yu Görüntüle](https://cbap-mock-exam.vercel.app)

## 💻 Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/turkmenferdi/cbapmockexam.git
cd cbapmockexam

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## 📦 Build

```bash
# Production build
npm run build

# Build'i önizleme
npm run preview
```

## 🌐 Vercel'e Deploy

Bu proje Vercel'e deploy için optimize edilmiştir:

1. GitHub'dan Vercel'e import edin
2. Framework: **Vite** seçin
3. Deploy edin - hiçbir konfigürasyon gerekmez!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/turkmenferdi/cbapmockexam)

## 📊 Mock Exam İçeriği

| Exam        | Soru Sayısı | Durum     |
| ----------- | ----------- | --------- |
| Mock Exam 1 | 120         | ✅ Hazır  |
| Mock Exam 2 | 120         | ✅ Hazır  |
| Mock Exam 3 | 120         | ✅ Hazır  |
| Mock Exam 4 | 120         | ✅ Hazır  |
| Mock Exam 5 | 120         | ✅ Hazır  |
| **Toplam**  | **600**     | **✅**    |

## 🛠️ Teknolojiler

- **React 18** - Modern React
- **TypeScript** - Type safety
- **Vite** - Hızlı build tool
- **TailwindCSS** - Utility-first CSS
- **React Router** - SPA routing
- **Radix UI** - Accessible components

## 🎮 Kullanım

1. Ana sayfada mock exam seçin
2. Sınavı başlatın (300 dakika süre)
3. Soruları cevaplayın ve işaretleyin
4. İstediğiniz zaman duraklatıp devam edin
5. Bitirdiğinizde detaylı analizi görün

## 📁 Proje Yapısı

```
├── client/                 # Frontend kaynak kodları
│   ├── components/         # React bileşenleri
│   │   ├── ui/            # UI bileşenleri
│   │   └── ErrorBoundary.tsx
│   ├── contexts/          # React Context
│   ├── pages/             # Sayfa bileşenleri
│   └── lib/               # Yardımcı fonksiyonlar
├── public/
│   └── data/              # Mock exam JSON dosyaları
└── dist/                  # Build çıktısı
```

## 📄 Lisans

Bu proje eğitim amaçlıdır ve IIBA ile resmi bir bağlantısı yoktur.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

**CBAP Hazırlık Sürecinizde Başarılar! 🎓**

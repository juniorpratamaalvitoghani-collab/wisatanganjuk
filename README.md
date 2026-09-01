#  Wisata Nganjuk

Sistem informasi berbasis web untuk menjelajahi berbagai destinasi wisata di Kabupaten Nganjuk, Jawa Timur. Dilengkapi dengan antarmuka yang modern, responsif, dan dukungan tampilan Light/Dark Mode.

![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tail-wind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

##  Fitur Utama

Katalog Wisata Lengkap: Menampilkan daftar objek wisata alam (air terjun, bukit, perkemahan) hingga wisata budaya.
Detail Destinasi: Informasi rinci mencakup deskripsi, jam operasional, harga tiket, dan lokasi.
Desain Responsif: Tampilan web yang optimal di perangkat mobile, tablet, maupun desktop.
Dark Mode Support: Akses nyaman di berbagai kondisi pencahayaan.

##  Teknologi yang Digunakan

Framework: [Next.js](https://nextjs.org/) (App Router)
Bahasa: [TypeScript](https://www.typescriptlang.org/)
Styling: [Tailwind CSS](https://tailwindcss.com/)
Deployment: [Vercel](https://vercel.com/)

##  Cara Menjalankan Proyek di Lokal

### Prasyarat
Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru) dan git di komputer kamu.

### Langkah-Langkah

1. Clone repository ini:
   git clone [https://github.com/juniorpratamaalvitoghani-collab/wisatanganjuk.git](https://github.com/juniorpratamaalvitoghani-collab/wisatanganjuk.git)
2.Masuk ke direktori proyek:
   cd wisatanganjuk
3.Install dependensi:
   npm install
4.Jalankan server pengembangan (development):
   npm run dev

   wisatanganjuk/
├── public/
│   └── images/              
├── src/
│   ├── app/                 
│   │   ├── destinations/    
│   │   ├── globals.css     
│   │   ├── layout.tsx       
│   │   └── page.tsx         
│   └── data/                
├── package.json
└── README.md

### Deployment

1.setup pertama kali
​ 1. Hubungkan GitHub ke Vercel
  ​ -Buka vercel.com di browser.
​   -Login atau daftar akun baru menggunakan akun GitHub kamu.
​ 2. Import Project
​   -Di halaman dashboard Vercel, klik tombol Add New lalu pilih Project.
   ​-Vercel akan menampilkan daftar repository GitHub milikmu. Cari repository wisatanganjuk, lalu      klik "Import".
​ 3. Konfigurasi & Deploy
​   -Pada halaman Configure Project:
     •Framework Preset: Next.js
     •​Root Directory: default
     •​Build and Output Settings: default
   -​Klik tombol Deploy.
2.Update Otomatis
git add .
git commit -m "Update fitur atau konten"
git push origin main

"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import destinationsData from "@/data/destinations.json";
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Ticket, 
  ExternalLink, 
  MoreVertical,
  Compass
} from "lucide-react";

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);

  const destination = destinationsData.find(
    (item) => item.slug.toLowerCase() === resolvedParams?.slug?.toLowerCase()
  );

  if (!destination) {
    notFound();
  }

  const [themeMode, setThemeMode] = useState<"default" | "dark" | "monochrome">("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(destination.images[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as "default" | "dark" | "monochrome";
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  const handleThemeChange = (mode: "default" | "dark" | "monochrome") => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
    setIsMenuOpen(false);
  };

  const getThemeClasses = () => {
    switch (themeMode) {
      case "dark":
        return {
          bg: "bg-slate-900 text-slate-100",
          cardBg: "bg-slate-800 border-slate-700",
          headerBg: "bg-slate-800 border-slate-700",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
        };
      case "monochrome":
        return {
          bg: "bg-neutral-200 text-slate-900",
          cardBg: "bg-neutral-50 border-neutral-300",
          headerBg: "bg-neutral-100 border-neutral-300",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-900",
          cardBg: "bg-white border-slate-200",
          headerBg: "bg-white border-slate-200",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
        };
    }
  };

  const currentTheme = getThemeClasses();
  const mapEmbedUrl = `https://maps.google.com/maps?q=${destination.coordinates.lat},${destination.coordinates.lng}&z=15&output=embed`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}>
      {/* Header Navigasi */}
      <header className={`border-b sticky top-0 z-30 transition-colors duration-300 ${currentTheme.headerBg}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Opsi Tema"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 z-50 text-xs">
                <p className="px-3 py-1.5 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Mode Tampilan
                </p>
                <button
                  onClick={() => handleThemeChange("default")}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    themeMode === "default"
                      ? "bg-sky-50 text-sky-600 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Terang (Default)
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    themeMode === "dark"
                      ? "bg-sky-50 text-sky-600 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Hitam (Dark Mode)
                </button>
                <button
                  onClick={() => handleThemeChange("monochrome")}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    themeMode === "monochrome"
                      ? "bg-sky-50 text-sky-600 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Hitam-Putih (Monokrom)
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Gambar Utama */}
        <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <Image
            src={activeImage}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Galeri Gambar */}
        {destination.images && destination.images.length > 1 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {destination.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`relative h-20 w-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? "border-sky-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${destination.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Kartu Detail */}
        <div className={`p-6 md:p-8 rounded-2xl border shadow-sm ${currentTheme.cardBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-50 text-sky-600 border border-sky-200">
                {destination.category}
              </span>
              <h1 className={`text-2xl md:text-4xl font-extrabold mt-2 ${currentTheme.textPrimary}`}>
                {destination.title}
              </h1>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 font-bold px-3 py-1.5 rounded-xl">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
            </div>
          </div>

          <p className={`leading-relaxed mb-8 ${currentTheme.textSecondary}`}>
            {destination.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Lokasi</p>
                <p className={`text-sm font-semibold ${currentTheme.textPrimary}`}>{destination.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Tiket Masuk</p>
                <p className={`text-sm font-semibold ${currentTheme.textPrimary}`}>{destination.ticketPrice}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Jam Operasional</p>
                <p className={`text-sm font-semibold ${currentTheme.textPrimary}`}>{destination.openingHours}</p>
              </div>
            </div>
          </div>

          {destination.facilities && (
            <div className="mb-8">
              <h2 className={`font-bold text-lg mb-3 ${currentTheme.textPrimary}`}>Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {destination.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map Embed */}
          <div className="mb-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-sky-500" />
              <h2 className={`font-bold text-lg ${currentTheme.textPrimary}`}>Lokasi di Peta</h2>
            </div>
            
            <div className="w-full h-72 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
              <iframe
                title={`Peta ${destination.title}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Tombol Google Maps dengan warna Biru Muda (sky-500 & hover:sky-600) */}
          {destination.googleMapsUrl && (
            <a
              href={destination.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              <span>Buka Petunjuk Arah di Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
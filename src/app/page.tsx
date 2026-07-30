"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import destinationsData from "@/data/destinations.json";
import { MapPin, Star, MoreVertical } from "lucide-react";

export default function HomePage() {
  const [themeMode, setThemeMode] = useState<"default" | "dark" | "monochrome">("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}>
      {/* Header Navigasi */}
      <header className={`border-b sticky top-0 z-30 transition-colors duration-300 ${currentTheme.headerBg}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-sky-600 text-xl tracking-tight">
            WisataNganjuk
          </Link>

          <div className="flex items-center gap-4 relative">
            <Link 
              href="/" 
              className="text-sm font-semibold text-sky-500 border-b-2 border-sky-500 pb-0.5"
            >
              Beranda
            </Link>

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
{/* Hero Section */}
      <section className="py-12 md:py-16 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Ukuran logo besar & bersih tanpa kotak putih */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 mb-6">
          <Image
            src="/images/logokabupatennganjuk-removebg-preview.png"
            alt="Logo Kabupaten Nganjuk"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${currentTheme.textPrimary}`}>
          Wisata di Kabupaten Nganjuk
        </h1>

        <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${currentTheme.textSecondary}`}>
          Kabupaten Nganjuk adalah wilayah di Jawa Timur yang banyak memiliki destinasi wisata yang populer dan menarik. Temukan berbagai tempat wisata alam yang populer di sini mulai air terjun, bukit, hingga tempat perkemahan.
        </p>
      </section>

      {/* Grid Destinasi */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className={`text-xl font-bold mb-6 ${currentTheme.textPrimary}`}>
          Destinasi Populer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationsData.map((item) => (
            <Link
              key={item.id}
              href={`/destinations/${item.slug}`}
              className={`group rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${currentTheme.cardBg}`}
            >
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-600 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Efek Hover Judul Kartu Menggunakan Biru Muda */}
                  <h3 className={`font-bold text-lg group-hover:text-sky-500 transition-colors mb-2 ${currentTheme.textPrimary}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${currentTheme.textSecondary}`}>
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    <span className="truncate max-w-[140px]">{item.location}</span>
                  </div>
                  <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                    {item.ticketPrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import crypto from "node:crypto";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync("grandastra123", salt, 1000, 64, "sha512")
    .toString("hex");

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: `${salt}:${hash}`,
      name: "Admin",
      role: "admin",
    },
  });

  // Clear existing data
  await prisma.property.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQItem.deleteMany();
  await prisma.nearbyPlace.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.bookingInquiry.deleteMany();

  // Seed properties
  const properties = [
    {
      slug: "tipe-astra-36",
      title: "Tipe Astra 36",
      type: "Rumah Tapak",
      price: 585000000,
      landArea: 72,
      buildingArea: 36,
      bedrooms: 2,
      bathrooms: 1,
      carport: 1,
      electricity: 1300,
      waterSupply: "PDAM",
      description:
        "Hunian modern dengan desain minimalis yang cocok untuk keluarga muda. Terletak di cluster yang aman dan nyaman dengan akses mudah ke berbagai fasilitas umum.",
      features: JSON.stringify([
        "1 Lantai",
        "Kamar Utama + Kamar Anak",
        "Ruang Keluarga",
        "Dapur Minimalis",
        "Taman Depan",
        "Carport 1 Mobil",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      ]),
      status: "available",
    },
    {
      slug: "tipe-astra-45",
      title: "Tipe Astra 45",
      type: "Rumah Tapak",
      price: 725000000,
      landArea: 90,
      buildingArea: 45,
      bedrooms: 3,
      bathrooms: 2,
      carport: 1,
      electricity: 2200,
      waterSupply: "PDAM",
      description:
        "Rumah ideal untuk keluarga kecil dengan ruang yang lebih luas. Desain ergonomis dengan sirkulasi udara yang baik dan pencahayaan alami maksimal.",
      features: JSON.stringify([
        "1.5 Lantai",
        "3 Kamar Tidur",
        "2 Kamar Mandi",
        "Ruang Keluarga Luas",
        "Dapur + Ruang Makan",
        "Taman Depan & Belakang",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      ]),
      status: "available",
    },
    {
      slug: "tipe-astra-60",
      title: "Tipe Astra 60",
      type: "Rumah Tapak",
      price: 950000000,
      landArea: 108,
      buildingArea: 60,
      bedrooms: 3,
      bathrooms: 2,
      carport: 2,
      electricity: 3500,
      waterSupply: "PDAM",
      description:
        "Hunian premium dengan ruang yang lebih lega untuk keluarga yang membutuhkan kenyamanan ekstra. Desain modern dengan sentuhan elegan di setiap sudut.",
      features: JSON.stringify([
        "2 Lantai",
        "3 Kamar Tidur + Lemari",
        "Kamar Mandi Dalam",
        "Ruang Keluarga & TV",
        "Dapur + Ruang Makan",
        "Taman Depan & Belakang",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3b2?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      ]),
      status: "available",
    },
    {
      slug: "tipe-astra-75",
      title: "Tipe Astra 75",
      type: "Rumah Tapak",
      price: 1250000000,
      landArea: 144,
      buildingArea: 75,
      bedrooms: 4,
      bathrooms: 3,
      carport: 2,
      electricity: 4400,
      waterSupply: "PDAM",
      description:
        "Rumah mewah dengan desain arsitektur modern. Cocok untuk keluarga besar yang menginginkan ruang maksimal dengan kualitas premium.",
      features: JSON.stringify([
        "2 Lantai",
        "4 Kamar Tidur",
        "3 Kamar Mandi",
        "Ruang Keluarga Luas",
        "Ruang Kerja",
        "Garden & Carport 2 Mobil",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-cacf3ee192d8?w=800&q=80",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      ]),
      status: "reserved",
    },
    {
      slug: "tipe-astra-90",
      title: "Tipe Astra 90",
      type: "Rumah Tapak",
      price: 1550000000,
      landArea: 180,
      buildingArea: 90,
      bedrooms: 4,
      bathrooms: 3,
      carport: 2,
      electricity: 5500,
      waterSupply: "PDAM",
      description:
        "Premium living dengan desain eksklusif. Setiap detail dirancang untuk memberikan pengalaman tinggal terbaik bagi keluarga Anda.",
      features: JSON.stringify([
        "2 Lantai",
        "4+1 Kamar Tidur",
        "Kamar Mandi Dalam",
        "Ruang Keluarga & Formal",
        "Ruang Kerja & Pustaka",
        "Garden, Kolam, Carport 2",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      ]),
      status: "sold",
    },
  ];

  for (const p of properties) {
    await prisma.property.create({ data: p });
  }

  // Seed facilities
  const facilities = [
    {
      name: "Masjid",
      description:
        "Masjid yang nyaman dan representatif untuk beribadah dan kegiatan keagamaan warga. Dilengkapi dengan area wudhu yang luas dan pendingin ruangan.",
      icon: "LampCeiling",
      image:
        "https://images.unsplash.com/photo-1561715276-a2d1b1c4e15d?w=800&q=80",
    },
    {
      name: "Taman Bermain",
      description:
        "Area bermain anak yang aman dan modern dengan berbagai peralatan bermain berkualitas. Dilengkapi dengan taman hijau dan area duduk untuk orang tua.",
      icon: "TreePine",
      image:
        "https://images.unsplash.com/photo-1590272456521-1ace3e50a7f8?w=800&q=80",
    },
    {
      name: "Keamanan 24 Jam",
      description:
        "Sistem keamanan terintegrasi dengan pos jaga di setiap pintu masuk, CCTV di titik-titik strategis, dan petugas keamanan yang profesional.",
      icon: "ShieldCheck",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    },
    {
      name: "CCTV Terintegrasi",
      description:
        "Pemantauan CCTV di seluruh area cluster untuk memastikan keamanan dan kenyamanan seluruh warga. Terintegrasi dengan sistem keamanan modern.",
      icon: "Camera",
      image:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    },
    {
      name: "Taman Hijau",
      description:
        "Taman kota yang asri dengan berbagai tanaman hijau, area duduk, dan jalur pedestrian. Tempat sempurna untuk bersantai dan berolahraga ringan.",
      icon: "Sprout",
      image:
        "https://images.unsplash.com/photo-1590272456521-1ace3e50a7f8?w=800&q=80",
    },
    {
      name: "Jogging Track",
      description:
        "Jalur jogging yang nyaman dengan permukaan khusus dan pencahayaan yang baik. Ideal untuk olahraga pagi atau sore hari bersama keluarga.",
      icon: "Footprints",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    },
    {
      name: "Kawasan Komersial",
      description:
        "Area komersial terpadu dengan minimarket, kafe, laundry, dan berbagai usaha lainnya untuk memenuhi kebutuhan sehari-hari warga.",
      icon: "ShoppingBag",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    },
  ];

  for (const f of facilities) {
    await prisma.facility.create({ data: f });
  }

  // Seed testimonials
  const testimonials = [
    {
      name: "Ibu Sarah Wijaya",
      role: "Penghuni Tipe Astra 45",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      review:
        "Kami sangat puas dengan hunian ini. Lingkungannya asri, aman, dan tetangga-tetangganya ramah. Akses ke sekolah dan pusat perbelanjaan sangat dekat.",
      rating: 5,
    },
    {
      name: "Bapak Andi Pratama",
      role: "Penghuni Tipe Astra 60",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      review:
        "Kualitas bangunan sangat baik. Kami tidak menemukan masalah berarti sejak pindah. Sistem one gate membuat kami merasa aman.",
      rating: 5,
    },
    {
      name: "Keluarga Budi Santoso",
      role: "Penghuni Tipe Astra 75",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      review:
        "Area hijau dan fasilitasnya lengkap. Anak-anak betah bermain di taman. Kami merekomendasikan Grand Astra untuk keluarga.",
      rating: 4,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // Seed FAQ
  const faqData = [
    {
      question: "Bagaimana cara melakukan booking survey?",
      answer:
        "Anda dapat melakukan booking survey melalui halaman Jadwalkan Survey di website kami. Isi form dengan data diri Anda, pilih tipe unit yang diminati, dan tentukan jadwal survey. Tim kami akan menghubungi Anda untuk konfirmasi.",
    },
    {
      question: "Apa saja dokumen yang diperlukan untuk KPR?",
      answer:
        "Dokumen yang diperlukan antara lain: KTP suami/istri, KK, NPWP, slip gaji 3 bulan terakhir, rekening koran 3 bulan, dan surat keterangan kerja. Untuk wirausaha, tambahkan SIUP, TDP, dan laporan keuangan.",
    },
    {
      question: "Apakah tersedia opsi cicilan langsung?",
      answer:
        "Ya, kami menyediakan opsi cicilan langsung dengan DP minimal 20% dan tenor hingga 10 tahun. Bunga kompetitif mulai dari 6% per tahun. Silakan hubungi tim marketing untuk simulasi yang lebih detail.",
    },
    {
      question: "Bagaimana sistem keamanan di perumahan?",
      answer:
        "Grand Astra Residence menerapkan sistem one gate dengan keamanan 24 jam. Setiap titik strategis dilengkapi CCTV. Petugas keamanan profesional berjaga di setiap shift, dan setiap tamu wajib lapor sebelum masuk.",
    },
    {
      question: "Apakah fasilitas umum sudah beroperasi?",
      answer:
        "Ya, seluruh fasilitas umum seperti masjid, taman bermain, jogging track, dan area komersial sudah beroperasi penuh dan siap digunakan oleh seluruh penghuni.",
    },
  ];

  for (const faq of faqData) {
    await prisma.fAQItem.create({ data: faq });
  }

  // Seed nearby places
  const nearbyPlaces = [
    {
      name: "Sekolah Dasar Harapan Bangsa",
      category: "Pendidikan",
      distance: "500 m",
      travelTime: "2 menit",
      icon: "graduation-cap",
    },
    {
      name: "RS Sentosa Medika",
      category: "Kesehatan",
      distance: "1.2 km",
      travelTime: "4 menit",
      icon: "hospital",
    },
    {
      name: "Pintu Tol Kota Baru",
      category: "Transportasi",
      distance: "800 m",
      travelTime: "2 menit",
      icon: "route",
    },
    {
      name: "Mall Grand City",
      category: "Belanja",
      distance: "1.5 km",
      travelTime: "5 menit",
      icon: "shopping-cart",
    },
    {
      name: "Halte Trans Kota",
      category: "Transportasi",
      distance: "300 m",
      travelTime: "1 menit",
      icon: "bus",
    },
    {
      name: "Universitas Nusantara",
      category: "Pendidikan",
      distance: "2 km",
      travelTime: "7 menit",
      icon: "graduation-cap",
    },
    {
      name: "Supermarket Freshmart",
      category: "Belanja",
      distance: "600 m",
      travelTime: "2 menit",
      icon: "shopping-cart",
    },
    {
      name: "Taman Kota Indah",
      category: "Rekreasi",
      distance: "1 km",
      travelTime: "3 menit",
      icon: "tree",
    },
  ];

  for (const n of nearbyPlaces) {
    await prisma.nearbyPlace.create({ data: n });
  }

  // Seed dummy contact submissions
  const contactData = [
    {
      name: "Rina Marlina",
      phone: "+62 811-2233-4455",
      email: "rina@example.com",
      subject: "Info Unit Tipe Astra 45",
      message: "Halo, saya tertarik dengan Tipe Astra 45. Apakah masih tersedia? Mohon info lebih lanjut mengenai harga dan cara booking. Terima kasih.",
    },
    {
      name: "Ahmad Fauzi",
      phone: "+62 877-8899-0011",
      email: "ahmad.fauzi@example.com",
      subject: "Konsultasi KPR",
      message: "Saya ingin berkonsultasi mengenai opsi KPR yang tersedia. Apakah ada promo DP ringan untuk Tipe Astra 36?",
    },
  ];

  for (const c of contactData) {
    await prisma.contactSubmission.create({ data: c });
  }

  // Seed dummy booking inquiries
  const bookingData = [
    {
      fullName: "Dian Permata Sari",
      phone: "+62 812-3344-5566",
      email: "dian.ps@example.com",
      preferredType: "Rumah Tapak",
      budget: 750000000,
      surveyDate: "2026-06-15",
      notes: "Lebih suka jadwal weekend siang hari.",
    },
    {
      fullName: "Rudi Hartono",
      phone: "+62 821-4455-6677",
      email: "rudi.h@example.com",
      preferredType: "Town House",
      budget: 1000000000,
      surveyDate: "2026-06-20",
      notes: null,
    },
  ];

  for (const b of bookingData) {
    await prisma.bookingInquiry.create({ data: b });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

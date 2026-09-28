# 📱 Modul Praktikum Pemrograman Mobile
## Topik: Core Components & Styling — Studi Kasus Aplikasi CV

---

> [!IMPORTANT]
> **Prasyarat:** Node.js ≥ 18, npm, dan Expo sudah terinstal.  
> **Estimasi Waktu:** 120 – 150 menit  
> **Platform:** Android / iOS / Web (Expo)

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa mampu:

1. Memahami dan menggunakan **16 Core Components** React Native
2. Menerapkan **StyleSheet** untuk styling terpusat
3. Menggunakan **useState** untuk state management dasar
4. Membuat layout yang responsif dengan **Flexbox**
5. Menangani **interaksi pengguna** (tekan, input, scroll)

---

## 📦 Komponen yang Akan Dipelajari

| # | Komponen | Fungsi Utama |
|---|---|---|
| 1 | `View` | Container / wrapper layout |
| 2 | `Text` | Menampilkan teks |
| 3 | ` img/image` | Menampilkan gambar |
| 4 | `ScrollView` | Container yang bisa di-scroll |
| 5 | `FlatList` | Daftar data efisien |
| 6 | `SectionList` | Daftar data berkelompok |
| 7 | `TextInput` | Input teks dari pengguna |
| 8 | `Button` | Tombol standar |
| 9 | `TouchableOpacity` | Tombol dengan efek opacity |
| 10 | `Pressable` | Tombol fleksibel dengan state press |
| 11 | `Switch` | Toggle on/off |
| 12 | `Modal` | Popup/overlay dialog |
| 13 | `ActivityIndicator` | Indikator loading |
| 14 | `StatusBar` | Mengatur status bar perangkat |
| 15 | `SafeAreaView` | Area aman dari notch/home bar |
| 16 | `StyleSheet` | Sistem styling terpusat |

---

## 🗂️ Struktur Proyek

 
ptmn2/
├── App.js          ← File utama (semua kode ada di sini)
├── app.json
├── package.json
└── assets/
    └── icon.png
 



## 📝 LANGKAH 1 — Import & Struktur Dasar

**Konsep:** Sebelum menggunakan komponen, kita harus mengimpornya dari `react-native`.

Buka `App.js` dan **ganti seluruh isinya** dengan kode berikut:

![alt text]( ![alt text](image.png))


**✅ Checkpoint:** Simpan file → Aplikasi menampilkan teks "Halo, Dunia!"


## 📝 LANGKAH 2 — Menyiapkan Data (Objek & Array)

**Konsep:** Data yang akan ditampilkan dalam CV disimpan dalam konstanta di luar komponen.

Tambahkan kode berikut **di atas** fungsi `App()`:

 
============================================
 DATA PROFIL (objek JavaScript)
============================================
![alt text]( ![alt text](image-1.png))

// ============================================
//  DATA SKILLS (array of objects)
//  → Akan ditampilkan dengan FlatList
// ============================================
![alt text]( ![alt text](image-2.png))

// ============================================
//  DATA RIWAYAT (sections)
//  → Akan ditampilkan dengan SectionList
// ============================================

![alt text]( ![alt text](image-3.png))

> [!NOTE]
> **Mengapa data di luar komponen?**  
> Data yang tidak berubah (statis) tidak perlu masuk ke dalam fungsi komponen agar tidak di-recreate setiap render.


## 📝 LANGKAH 3 — Sub-Components (SkillCard & TimelineCard)

**Konsep:** Komponen kecil yang bertugas merender satu item list. Ini adalah praktik **component reuse**.

Tambahkan kode berikut **di antara data dan fungsi App()**:
![alt text](image-4.png)
![alt text](image-5.png)

---

## 📝 LANGKAH 4 — State Management dengan useState

**Konsep:** `useState` menyimpan data yang bisa berubah. Setiap perubahan state akan men-trigger re-render komponen.

Tambahkan state di dalam fungsi `App()`:

 
![alt text](image-6.png)
 

**✅ Checkpoint:** Aplikasi masih menampilkan teks, tidak ada error.

---

## 📝 LANGKAH 5 — SafeAreaView, StatusBar & Header

**Konsep:**
- `SafeAreaView` → memastikan konten tidak tertutup notch (takik kamera) atau home indicator
- `StatusBar` → mengatur tampilan bar di bagian atas perangkat
- `View` + `Switch` → membangun header bar

Ganti bagian `return (...)` di `App()`:

 
![alt text](image-7.png)


> [!TIP]
> `flexDirection: 'row'` membuat anak View tersusun **horizontal** (kiri ke kanan).  
> Default di React Native adalah `column` (atas ke bawah).

**✅ Checkpoint:** Header bar berwarna gelap dengan teks putih dan switch terlihat.

---

## 📝 LANGKAH 6 — ScrollView & Profil Section (View, Text,  img/image)

**Konsep:**
- `ScrollView` → membungkus konten panjang agar bisa di-scroll
- ` img/image` → menampilkan gambar dari URL (`source={{ uri: '...' }}`)
- `Text` → bisa di-styling dengan `style` prop seperti CSS

Ganti `<View><Text ...>Step 5</Text></View>` dengan:

 
{/* 4. ScrollView → semua konten CV dibungkus di sini */}
![alt text](image-8.png)
 

> [!NOTE]
> **Perbedaan `TouchableOpacity` vs `Pressable`:**
> - `TouchableOpacity` → sederhana, otomatis redup saat ditekan
> - `Pressable` → lebih fleksibel, kita kontrol sendiri style saat `pressed`

**✅ Checkpoint:** Foto profil, nama, jabatan, bio, dan tombol sosmed terlihat.

---

## 📝 LANGKAH 7 — FlatList (Daftar Skills)

**Konsep:** `FlatList` dioptimalkan untuk menampilkan daftar panjang — hanya item yang terlihat di layar yang di-render (lazy rendering / windowing).

Tambahkan kode berikut **di dalam** `<ScrollView>`, setelah section profil:

 
{/* ════════════════════════════════════
    SECTION SKILLS
    Komponen: FlatList
    ════════════════════════════════════ */}
![alt text](image-9.png)
 

> [!TIP]
> **Props penting FlatList:**
> | Prop | Fungsi |
> |---|---|
> | `data` | Array sumber data |
> | `keyExtractor` | Fungsi penghasil key unik |
> | `renderItem` | Fungsi render tiap item |
> | `ItemSeparatorComponent` | Komponen pemisah antar item |
> | `ListHeaderComponent` | Komponen di atas list |
> | `ListFooterComponent` | Komponen di bawah list |
> | `numColumns` | Jumlah kolom (grid) |

**✅ Checkpoint:** Daftar skill dengan progress bar berwarna-warni terlihat.

---

## 📝 LANGKAH 8 — SectionList (Pengalaman & Pendidikan)

**Konsep:** `SectionList` seperti `FlatList` tetapi bisa mengelompokkan data berdasarkan section/kategori. Membutuhkan prop `sections` (bukan `data`) yang berisi array objek `{ title, data }`.

 
{/* ════════════════════════════════════
    SECTION RIWAYAT
    Komponen: SectionList
    ════════════════════════════════════ */}
![alt text](image-10.png)
 

> [!NOTE]
> **Perbedaan FlatList vs SectionList:**
> | | FlatList | SectionList |
> |---|---|---|
> | Data | `data={array}` | `sections={[{title, data}]}` |
> | Header kelompok | Tidak ada | `renderSectionHeader` |
> | Penggunaan | List seragam | List berkategori |

**✅ Checkpoint:** Daftar pengalaman kerja & pendidikan terkelompok terlihat.

---

## 📝 LANGKAH 9 — TextInput, Button & ActivityIndicator

**Konsep:**
- `TextInput` → input teks. `value` + `onChangeText` = controlled component
- `Button` → tombol paling sederhana di React Native
- `ActivityIndicator` → spinner loading

 
{/* ════════════════════════════════════
    SECTION FORM KONTAK
    Komponen: TextInput, Button, ActivityIndicator
    ════════════════════════════════════ */}
![alt text](image-11.png)
 

> [!TIP]
> **Controlled vs Uncontrolled Component:**
> - **Controlled:** `value={state}` + `onChangeText={setState}` → nilai input selalu sesuai state
> - **Uncontrolled:** hanya pakai `ref` → tidak direkomendasikan di React

**✅ Checkpoint:** Form input nama & pesan berfungsi. Tekan "Kirim Pesan" → loading 2 detik → Alert sukses.

---

## 📝 LANGKAH 10 — Modal (Popup Detail)

**Konsep:** `Modal` menampilkan konten di atas (overlay) tampilan saat ini. Dikendalikan dengan prop `visible`.

Tambahkan **setelah** penutup `</ScrollView>` dan sebelum `</SafeAreaView>`:

 
{/* ════════════════════════════════════
    12. MODAL → popup detail riwayat
    ════════════════════════════════════ */}
![alt text](image-12.png)
 

> [!NOTE]
> **Props Modal:**
> | Prop | Nilai | Fungsi |
> |---|---|---|
> | `visible` | `true`/`false` | Tampilkan/sembunyikan |
> | `animationType` | `'slide'`, `'fade'`, `'none'` | Animasi kemunculan |
> | `transparent` | `true`/`false` | Latar transparan |
> | `onRequestClose` | fungsi | Tombol back Android |

**✅ Checkpoint:** Ketuk kartu riwayat → modal muncul dari bawah → tombol Tutup menutup modal.

---

## 📝 LANGKAH 11 — StyleSheet (Styling Terpusat)

**Konsep:** `StyleSheet.create()` adalah cara resmi styling di React Native. Mirip CSS tetapi menggunakan JavaScript object dengan properti camelCase.

Tambahkan kode berikut di **bawah** fungsi `App()` (paling bawah file):


// ============================================
//  PALET WARNA (konstanta warna terpusat)
// ============================================
![alt text](image-13.png)

// ============================================
//  16. StyleSheet.create() → semua style
// ============================================
![alt text](image-14.png)

  // ── SKILL CARD ─────────────────────────────
 ![alt text](image-15.png)


  // ── TEXT INPUT ─────────────────────────────
 ![alt text](image-16.png)

- maaf pak yang ke screenshot cuman itu 





## ✅ LANGKAH 12 — Verifikasi & Pengujian

Jalankan aplikasi dan pastikan semua fitur bekerja:

| # | Yang Diuji | Hasil yang Diharapkan |
|---|---|---|
| 1 | Aplikasi bisa dibuka | Layar CV tampil tanpa error |
| 2 | Foto profil tampil | Gambar dari URL terload |
| 3 | Halaman bisa di-scroll | Semua section bisa diakses |
| 4 | Toggle Switch | Badge "Open to Work" muncul/hilang |
| 5 | Progress bar skill | Bar berwarna sesuai persentase |
| 6 | Ketuk kartu riwayat | Modal popup muncul dari bawah |
| 7 | Tombol Tutup di Modal | Modal tertutup |
| 8 | Isi form & kirim | Loading 2 detik → Alert sukses |
| 9 | Kirim dengan input kosong | Alert peringatan muncul |
| 10 | Tekan Download CV | Efek visual berubah + Alert |
| 11 | Tap tombol sosmed | Alert URL muncul |

---

## 🧠 Konsep Styling yang Perlu Dipahami

### Flexbox di React Native

 
┌─────────────────────────┐
│  flexDirection: 'column'│  ← DEFAULT
│  ┌───┐                  │
│  │ A │                  │  Anak tersusun
│  ├───┤                  │  dari ATAS ke BAWAH
│  │ B │                  │
│  └───┘                  │
└─────────────────────────┘

┌─────────────────────────┐
│  flexDirection: 'row'   │
│  ┌───┬───┐              │  Anak tersusun
│  │ A │ B │              │  dari KIRI ke KANAN
│  └───┴───┘              │
└─────────────────────────┘
 

### Satuan Ukuran

Di React Native **tidak ada unit** seperti `px`, `em`, `%`. Semua angka adalah **density-independent pixels (dp)**.

 
// Benar ✅
width: 100       // 100dp

// Salah ❌
width: '100px'   // tidak valid
 

Pengecualian: `width` dan `height` bisa menerima string persentase:
 
width: '50%'    // 50% dari parent
 

### StyleSheet vs Inline Style

 
// ✅ Direkomendasikan: StyleSheet.create()
<View style={styles.container}>

// ⚠️ Boleh tetapi kurang optimal: inline object
<View style={{ flex: 1, backgroundColor: 'red' }}>

// ✅ Boleh: gabung keduanya dengan array
<View style={[styles.container, styles.active]}>
 

---

## 🏆 Tugas / Latihan

> [!IMPORTANT]
> Selesaikan semua tugas berikut dan kumpulkan file `App.js` beserta screenshot aplikasi.

### Tugas Wajib (Nilai 70)
1. **Ganti data profil** dengan data pribadi Anda (nama, email, foto, dll)
2. **Tambah minimal 3 skill** baru dengan warna berbeda
3. **Tambah 1 pengalaman kerja/organisasi** dan **1 riwayat pendidikan** baru

### Tugas Pengembangan (Nilai 30)
4. **Tambah komponen `KeyboardAvoidingView`** agar form tidak tertutup keyboard
5. **Buat tab navigasi sederhana** (Info / Skills / Kontak) menggunakan `TouchableOpacity`
6. **Tambah animasi** pada profile avatar menggunakan `Animated` API
![alt text](iPhone-14-PRO-localhost-k6y-cp4-fs2ecx.gif)
- ini masih ada permasalahan ketika social media di klik tidak bisa memunculkan alret link dan ketika mengirim pesan tidak muncul alret sukses pak
---

## 📚 Referensi

| Sumber | Link |
|---|---|
| Dokumentasi Resmi React Native | https://reactnative.dev/docs/components-and-apis |
| Expo Documentation | https://docs.expo.dev |
| React Native StyleSheet | https://reactnative.dev/docs/stylesheet |
| Flexbox di React Native | https://reactnative.dev/docs/flexbox |

---

*Modul Praktikum — Pemrograman Mobile · Pertemuan: Core Components & Styling*

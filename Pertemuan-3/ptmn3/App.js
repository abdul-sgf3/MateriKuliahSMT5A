// ============================================================
// IMPORT
// ============================================================

import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import * as Clipboard from 'expo-clipboard';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native';


// ============================================================
// FUNCTION
// ============================================================

// Mengambil data berdasarkan key bertingkat
const pluckDeep = (key) => (obj) =>
  key.split('.').reduce(
    (accum, currentKey) => accum?.[currentKey],
    obj
  );


// Menggabungkan beberapa function
const compose = (...fns) => (res) =>
  fns.reduce(
    (accum, next) => next(accum),
    res
  );


// Membuat array menggunakan proses recursive
const unfold = (f, seed) => {

  const go = (fn, currentSeed, acc) => {

    const result = fn(currentSeed);

    return result
      ? go(
          fn,
          result[1],
          acc.concat([result[0]])
        )
      : acc;
  };

  return go(f, seed, []);
};


// ============================================================
// DATA PROFIL
// ============================================================

const PROFILE = {

  name: 'Abdullah Assegaf',

  title: 'Backend',

  email: 'abdullahh.sgff3@email.com',

  phone: '+62 877-7277-5778',

  location: 'Cirebon, Jawa Barat',

  bio: 'Pagiku Cerahku',

  // Pastikan foto berada di folder yang sama dengan App.js
  avatar: require('./foto-abdul.jpeg'),

};


// ============================================================
// DATA SKILL
// ============================================================

const SKILLS = [

  {
    id: '1',
    name: 'Design Graphic',
    level: 90,
    color: '#61DAFB',
  },

  {
    id: '2',
    name: 'Digital Drawing',
    level: 85,
    color: '#02569B',
  },

  {
    id: '3',
    name: 'PHP',
    level: 80,
    color: '#F7DF1E',
  },

  {
    id: '4',
    name: 'MySQL',
    level: 70,
    color: '#3178C6',
  },

  {
    id: '5',
    name: 'HTML & CSS',
    level: 65,
    color: '#339933',
  },

];


// ============================================================
// DATA RIWAYAT
// ============================================================

const SECTIONS = [

  {
    title: '💼 Pengalaman Kerja',

    data: [

      {
        id: 'e1',

        role: 'Junior Backend',

        company: 'PT. TechVision Indonesia',

        period: '2029 – Sekarang',

        desc:
          'Memimpin tim 5 developer dalam pengembangan aplikasi e-commerce mobile.',
      },

      {
        id: 'e2',

        role: 'Mobile Developer',

        company: 'Startup Fintech – PayEasy',

        period: '2020 – 2022',

        desc:
          'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
      },

    ],

  },


  {
    title: '🎓 Pendidikan',

    data: [

      {
        id: 'd1',

        role: 'S1 Informatika',

        company:
          'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',

        period: '2024 – 2029',

        desc:
          'IPK 3.72 / 4.00 · Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },

    ],

  },

];


// ============================================================
// DATA SOCIAL MEDIA
// ============================================================

const SOCIAL = [

  {
    id: 's1',

    label: 'GitHub',

    icon: '💻',

    url: 'https://github.com/abdul-sgf3',

  },

  {
    id: 's2',

    label: 'Discord',

    icon: '🎮',

    url: 'https://discord.gg/M3rVaM67',

  },

  {
    id: 's3',

    label: 'Instagram',

    icon: '📸',

    url: 'https://www.instagram.com/abdullah.segaf?stkn=MTZubXV1Z3RhaWs2',

  },

];


// ============================================================
// COMPONENT: SKILL CARD
// ============================================================

const SkillCard = ({ item }) => {

  return (

    <View style={styles.skillCard}>

      <View style={styles.skillHeader}>

        <Text style={styles.skillName}>
          {item.name}
        </Text>

        <Text style={styles.skillPercent}>
          {item.level}%
        </Text>

      </View>


      <View style={styles.progressBg}>

        <View
          style={[
            styles.progressFill,
            {
              width: `${item.level}%`,
              backgroundColor: item.color,
            },
          ]}
        />

      </View>

    </View>

  );

};


// ============================================================
// COMPONENT: TIMELINE CARD
// ============================================================

const TimelineCard = ({ item, onPress }) => {

  return (

    <TouchableOpacity
      style={styles.timelineCard}
      onPress={() => onPress(item)}
      activeOpacity={0.75}
    >

      <View style={styles.timelineDot} />


      <View style={styles.timelineContent}>

        <Text style={styles.timelineRole}>
          {item.role}
        </Text>

        <Text style={styles.timelineCompany}>
          {item.company}
        </Text>

        <Text style={styles.timelinePeriod}>
          {item.period}
        </Text>

        <Text style={styles.timelineHint}>
          Ketuk untuk detail →
        </Text>

      </View>

    </TouchableOpacity>

  );

};


// ============================================================
// COMPONENT: SKILL SECTION
// ============================================================

const SkillSection = () => {

  return (

    <View style={styles.sectionBox}>

      <Text style={styles.sectionTitle}>
        🛠️ Keahlian
      </Text>


      <Text style={styles.sectionSubtitle}>
        ↳ FlatList: menampilkan list data secara efisien
      </Text>


      <FlatList
        data={SKILLS}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <SkillCard item={item} />
        )}

        scrollEnabled={false}

        ItemSeparatorComponent={() => (
          <View style={{ height: 8 }} />
        )}

      />

    </View>

  );

};


// ============================================================
// APP
// ============================================================

export default function App() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [openToWork, setOpenToWork] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [senderName, setSenderName] = useState('');

  const [message, setMessage] = useState('');

  const [sending, setSending] = useState(false);

  const [pressing, setPressing] = useState(false);


  // ==========================================================
  // HANDLER RIWAYAT
  // ==========================================================

  const handleCardPress = (item) => {

    setSelectedItem(item);

    setModalVisible(true);

  };


  // ==========================================================
  // HANDLER COPY URL
  // ==========================================================

  const handleCopyURL = async (url, label) => {

    try {

      await Clipboard.setStringAsync(url);

      Alert.alert(
        '✅ URL Disalin',
        `URL ${label} berhasil disalin ke clipboard.`
      );

    } catch (error) {

      Alert.alert(
        '❌ Gagal',
        'URL tidak dapat disalin.'
      );

    }

  };


  // ==========================================================
  // HANDLER BUKA URL
  // ==========================================================

  const handleOpenURL = async (url) => {

    try {

      const supported = await Linking.canOpenURL(url);

      if (!supported) {

        Alert.alert(
          '❌ Error',
          'URL tidak dapat dibuka pada perangkat ini.'
        );

        return;

      }

      await Linking.openURL(url);

    } catch (error) {

      Alert.alert(
        '❌ Error',
        'Terjadi kesalahan saat membuka URL.'
      );

    }

  };


  // ==========================================================
  // HANDLER SOCIAL MEDIA
  // ==========================================================

  const handleSocialPress = (social) => {

    console.log(
      'Social media diklik:',
      social.label
    );

    console.log(
      'URL:',
      social.url
    );


    Alert.alert(

      `🔗 ${social.label}`,

      social.url,

      [

        // ----------------------------------------------------
        // TOMBOL TUTUP
        // ----------------------------------------------------

        {
          text: 'Tutup',

          style: 'cancel',
        },


        // ----------------------------------------------------
        // TOMBOL SALIN
        // ----------------------------------------------------

        {
          text: 'Salin URL',

          onPress: () => {

            handleCopyURL(
              social.url,
              social.label
            );

          },

        },


        // ----------------------------------------------------
        // TOMBOL BUKA
        // ----------------------------------------------------

        {
          text: 'Buka URL',

          onPress: () => {

            handleOpenURL(
              social.url
            );

          },

        },

      ]

    );

  };


  // ==========================================================
  // HANDLER KIRIM PESAN
  // ==========================================================

  const handleSend = () => {

    // Validasi input
    if (
      !senderName.trim() ||
      !message.trim()
    ) {

      Alert.alert(
        '⚠️ Peringatan',
        'Nama dan pesan tidak boleh kosong!'
      );

      return;

    }


    // Aktifkan loading
    setSending(true);


    // Simulasi pengiriman
    setTimeout(() => {

      setSending(false);


      Alert.alert(
        '✅ Berhasil',
        `Pesan dari ${senderName} telah terkirim!`
      );


      // Kosongkan input
      setSenderName('');

      setMessage('');

    }, 2000);

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView style={styles.safeArea}>

      {/* ====================================================
          STATUS BAR
      ==================================================== */}

      <StatusBar
        backgroundColor="#1a1a2e"
        style="light"
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.headerBar}>

        <Text style={styles.headerTitle}>
          📄 Curriculum Vitae
        </Text>


        <View style={styles.switchRow}>

          <Text style={styles.switchLabel}>

            {openToWork
              ? '🟢 Open'
              : '🔴 Busy'}

          </Text>


          <Switch

            value={openToWork}

            onValueChange={setOpenToWork}

            trackColor={{
              false: '#555',
              true: '#4ade80',
            }}

            thumbColor={
              openToWork
                ? '#fff'
                : '#aaa'
            }

          />

        </View>

      </View>


      {/* ====================================================
          SCROLL VIEW
      ==================================================== */}

      <ScrollView

        style={styles.scroll}

        showsVerticalScrollIndicator={false}

      >


        {/* ==================================================
            PROFILE
        ================================================== */}

        <View style={styles.profileSection}>

          {/* FOTO PROFIL */}

          <Image

            source={PROFILE.avatar}

            style={styles.avatar}

            resizeMode="cover"

          />


          {/* STATUS OPEN TO WORK */}

          {openToWork && (

            <View style={styles.badge}>

              <Text style={styles.badgeText}>
                ✅ Open to Work
              </Text>

            </View>

          )}


          {/* NAMA */}

          <Text style={styles.profileName}>
            {PROFILE.name}
          </Text>


          {/* PROFESI */}

          <Text style={styles.profileTitle}>
            {PROFILE.title}
          </Text>


          {/* BIO */}

          <Text style={styles.profileBio}>
            {PROFILE.bio}
          </Text>


          {/* EMAIL DAN LOKASI */}

          <View style={styles.contactRow}>

            <Text style={styles.contactItem}>
              📧 {PROFILE.email}
            </Text>


            <Text style={styles.contactItem}>
              📍 {PROFILE.location}
            </Text>

          </View>


          {/* NOMOR TELEPON */}

          <Text style={styles.contactItem}>
            📱 {PROFILE.phone}
          </Text>


          {/* ==================================================
              SOCIAL MEDIA
          ================================================== */}

          <View style={styles.socialRow}>

            {SOCIAL.map((social) => (

              <TouchableOpacity

                key={social.id}

                style={styles.socialBtn}

                activeOpacity={0.7}

                onPress={() => {

                  handleSocialPress(
                    social
                  );

                }}

              >

                <Text style={styles.socialIcon}>
                  {social.icon}
                </Text>


                <Text style={styles.socialLabel}>
                  {social.label}
                </Text>

              </TouchableOpacity>

            ))}

          </View>


          {/* ==================================================
              DOWNLOAD CV
          ================================================== */}

          <Pressable

            style={({ pressed }) => [

              styles.downloadBtn,

              pressed &&
                styles.downloadBtnPressed,

            ]}

            onPressIn={() =>
              setPressing(true)
            }

            onPressOut={() =>
              setPressing(false)
            }

            onPress={() =>

              Alert.alert(

                '⬇️ Download',

                'CV sedang diunduh...'

              )

            }

          >

            <Text style={styles.downloadBtnText}>

              {pressing

                ? '⏳ Mengunduh...'

                : '⬇️ Download CV (PDF)'}

            </Text>

          </Pressable>

        </View>


        {/* ==================================================
            SKILL
        ================================================== */}

        <SkillSection />


        <View style={{ height: 20 }} />


        {/* ==================================================
            RIWAYAT
        ================================================== */}

        <View style={styles.sectionBox}>

          <Text style={styles.sectionTitle}>
            📋 Riwayat
          </Text>


          <Text style={styles.sectionSubtitle}>

            ↳ SectionList: data dikelompokkan
            per kategori.
            Ketuk kartu untuk Modal detail.

          </Text>


          <SectionList

            sections={SECTIONS}

            keyExtractor={(item) =>
              item.id
            }


            renderItem={({ item }) => (

              <TimelineCard

                item={item}

                onPress={
                  handleCardPress
                }

              />

            )}


            renderSectionHeader={({
              section: { title },
            }) => (

              <View style={styles.sectionHeader}>

                <Text
                  style={
                    styles.sectionHeaderText
                  }
                >
                  {title}
                </Text>

              </View>

            )}


            scrollEnabled={false}


            ItemSeparatorComponent={() => (

              <View
                style={{
                  height: 10,
                }}
              />

            )}


            SectionSeparatorComponent={() => (

              <View
                style={{
                  height: 16,
                }}
              />

            )}

          />

        </View>


        {/* ==================================================
            FORM HUBUNGI
        ================================================== */}

        <View style={styles.sectionBox}>

          <Text style={styles.sectionTitle}>
            ✉️ Hubungi Saya
          </Text>


          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>


          {/* INPUT NAMA */}

          <TextInput

            style={styles.textInput}

            placeholder="Nama Anda"

            placeholderTextColor="#888"

            value={senderName}

            onChangeText={
              setSenderName
            }

            returnKeyType="next"

            editable={!sending}

          />


          {/* INPUT PESAN */}

          <TextInput

            style={[
              styles.textInput,
              styles.textArea,
            ]}

            placeholder="Tulis pesan Anda di sini..."

            placeholderTextColor="#888"

            value={message}

            onChangeText={
              setMessage
            }

            multiline

            numberOfLines={4}

            textAlignVertical="top"

            editable={!sending}

          />


          {/* LOADING */}

          {sending ? (

            <View style={styles.loadingRow}>

              <ActivityIndicator

                size="large"

                color="#7c3aed"

              />


              <Text style={styles.loadingText}>
                Mengirim pesan...
              </Text>

            </View>

          ) : (

            <Button

              title="📨 Kirim Pesan"

              color="#7c3aed"

              onPress={handleSend}

            />

          )}

        </View>


        {/* ==================================================
            MODAL DETAIL RIWAYAT
        ================================================== */}

        <Modal

          visible={modalVisible}

          animationType="slide"

          transparent

          onRequestClose={() =>
            setModalVisible(false)
          }

        >

          <View style={styles.modalOverlay}>

            <View style={styles.modalBox}>

              {selectedItem && (

                <>

                  <Text style={styles.modalTitle}>
                    {selectedItem.role}
                  </Text>


                  <Text style={styles.modalCompany}>
                    {selectedItem.company}
                  </Text>


                  <Text style={styles.modalPeriod}>
                    📅 {selectedItem.period}
                  </Text>


                  <View
                    style={
                      styles.modalDivider
                    }
                  />


                  <Text style={styles.modalDesc}>
                    {selectedItem.desc}
                  </Text>

                </>

              )}


              {/* TOMBOL TUTUP */}

              <TouchableOpacity

                style={
                  styles.modalCloseBtn
                }

                onPress={() =>
                  setModalVisible(false)
                }

              >

                <Text
                  style={
                    styles.modalCloseBtnText
                  }
                >
                  ✕ Tutup
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={{ height: 30 }} />

      </ScrollView>

    </SafeAreaView>

  );

}


// ============================================================
// COLORS
// ============================================================

const COLORS = {

  bg: '#0f0f1a',

  card: '#1a1a2e',

  cardBorder: '#2d2d44',

  accent: '#7c3aed',

  accentLight: '#a78bfa',

  accentGold: '#f59e0b',

  text: '#f0f0f0',

  textMuted: '#9ca3af',

  textDim: '#6b7280',

  success: '#4ade80',

  white: '#ffffff',

};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SAFE AREA
  // ==========================================================

  safeArea: {

    flex: 1,

    backgroundColor: COLORS.bg,

  },


  scroll: {

    flex: 1,

  },


  // ==========================================================
  // HEADER
  // ==========================================================

  headerBar: {

    backgroundColor: COLORS.card,

    paddingHorizontal: 20,

    paddingVertical: 14,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: COLORS.cardBorder,

    elevation: 4,

    shadowColor: '#000',

    shadowOpacity: 0.3,

    shadowOffset: {

      width: 0,

      height: 2,

    },

    shadowRadius: 4,

  },


  headerTitle: {

    color: COLORS.white,

    fontSize: 18,

    fontWeight: '700',

    letterSpacing: 0.5,

  },


  switchRow: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

  },


  switchLabel: {

    color: COLORS.textMuted,

    fontSize: 12,

    fontWeight: '600',

  },


  // ==========================================================
  // PROFILE
  // ==========================================================

  profileSection: {

    alignItems: 'center',

    paddingVertical: 32,

    paddingHorizontal: 20,

    backgroundColor: COLORS.card,

    marginBottom: 16,

    borderBottomLeftRadius: 24,

    borderBottomRightRadius: 24,

    borderBottomWidth: 2,

    borderColor: COLORS.accent,

  },


  avatar: {

    width: 110,

    height: 110,

    borderRadius: 55,

    borderWidth: 3,

    borderColor: COLORS.accent,

    marginBottom: 8,

  },


  badge: {

    backgroundColor: '#052e16',

    borderWidth: 1,

    borderColor: COLORS.success,

    paddingHorizontal: 12,

    paddingVertical: 4,

    borderRadius: 20,

    marginBottom: 12,

  },


  badgeText: {

    color: COLORS.success,

    fontSize: 12,

    fontWeight: '700',

  },


  profileName: {

    color: COLORS.white,

    fontSize: 26,

    fontWeight: '800',

    textAlign: 'center',

  },


  profileTitle: {

    color: COLORS.accentLight,

    fontSize: 14,

    fontWeight: '600',

    marginTop: 4,

    marginBottom: 14,

    textAlign: 'center',

  },


  profileBio: {

    color: COLORS.textMuted,

    fontSize: 13,

    lineHeight: 20,

    textAlign: 'center',

    marginBottom: 16,

    paddingHorizontal: 8,

  },


  // ==========================================================
  // CONTACT
  // ==========================================================

  contactRow: {

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'center',

    gap: 8,

    marginBottom: 6,

  },


  contactItem: {

    color: COLORS.textMuted,

    fontSize: 12,

    textAlign: 'center',

    marginBottom: 4,

  },


  // ==========================================================
  // SOCIAL MEDIA
  // ==========================================================

  socialRow: {

    flexDirection: 'row',

    gap: 12,

    marginTop: 16,

    marginBottom: 20,

  },


  socialBtn: {

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#16213e',

    paddingVertical: 10,

    paddingHorizontal: 16,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,

    minWidth: 80,

  },


  socialIcon: {

    fontSize: 20,

    marginBottom: 4,

  },


  socialLabel: {

    color: COLORS.accentLight,

    fontSize: 11,

    fontWeight: '600',

  },


  // ==========================================================
  // DOWNLOAD BUTTON
  // ==========================================================

  downloadBtn: {

    backgroundColor: COLORS.accent,

    paddingVertical: 14,

    paddingHorizontal: 36,

    borderRadius: 50,

    elevation: 4,

    shadowColor: COLORS.accent,

    shadowOpacity: 0.5,

    shadowOffset: {

      width: 0,

      height: 4,

    },

    shadowRadius: 8,

  },


  downloadBtnPressed: {

    backgroundColor: '#5b21b6',

  },


  downloadBtnText: {

    color: COLORS.white,

    fontWeight: '700',

    fontSize: 14,

  },


  // ==========================================================
  // SECTION
  // ==========================================================

  sectionBox: {

    marginHorizontal: 16,

    marginBottom: 16,

    backgroundColor: COLORS.card,

    borderRadius: 16,

    padding: 18,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,

  },


  sectionTitle: {

    color: COLORS.white,

    fontSize: 17,

    fontWeight: '700',

    marginBottom: 4,

  },


  sectionSubtitle: {

    color: COLORS.textDim,

    fontSize: 11,

    fontStyle: 'italic',

    marginBottom: 16,

  },


  // ==========================================================
  // SECTION HEADER
  // ==========================================================

  sectionHeader: {

    backgroundColor: '#0f172a',

    paddingVertical: 8,

    paddingHorizontal: 12,

    borderRadius: 8,

    marginBottom: 8,

    borderLeftWidth: 3,

    borderLeftColor: COLORS.accent,

  },


  sectionHeaderText: {

    color: COLORS.accentLight,

    fontWeight: '700',

    fontSize: 13,

  },


  // ==========================================================
  // SKILL CARD
  // ==========================================================

  skillCard: {

    backgroundColor: '#16213e',

    padding: 12,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,

  },


  skillHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 8,

  },


  skillName: {

    color: COLORS.text,

    fontWeight: '600',

    fontSize: 13,

  },


  skillPercent: {

    color: COLORS.accentLight,

    fontWeight: '700',

    fontSize: 13,

  },


  progressBg: {

    height: 6,

    backgroundColor: '#0f172a',

    borderRadius: 4,

    overflow: 'hidden',

  },


  progressFill: {

    height: 6,

    borderRadius: 4,

  },


  // ==========================================================
  // TIMELINE
  // ==========================================================

  timelineCard: {

    flexDirection: 'row',

    backgroundColor: '#16213e',

    borderRadius: 12,

    padding: 14,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,

  },


  timelineDot: {

    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: COLORS.accent,

    marginTop: 4,

    marginRight: 12,

  },


  timelineContent: {

    flex: 1,

  },


  timelineRole: {

    color: COLORS.white,

    fontWeight: '700',

    fontSize: 14,

    marginBottom: 2,

  },


  timelineCompany: {

    color: COLORS.accentLight,

    fontSize: 13,

    marginBottom: 2,

  },


  timelinePeriod: {

    color: COLORS.textMuted,

    fontSize: 11,

    marginBottom: 6,

  },


  timelineHint: {

    color: COLORS.accentLight,

    fontSize: 11,

    fontStyle: 'italic',

    marginTop: 2,

  },


  // ==========================================================
  // TEXT INPUT
  // ==========================================================

  textInput: {

    backgroundColor: '#0f172a',

    color: COLORS.text,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,

    borderRadius: 10,

    paddingHorizontal: 14,

    paddingVertical:
      Platform.OS === 'ios'
        ? 14
        : 10,

    fontSize: 14,

    marginBottom: 12,

  },


  textArea: {

    height: 100,

    textAlignVertical: 'top',

  },


  // ==========================================================
  // LOADING
  // ==========================================================

  loadingRow: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 12,

    paddingVertical: 10,

  },


  loadingText: {

    color: COLORS.accentLight,

    fontSize: 14,

    fontWeight: '600',

  },


  // ==========================================================
  // MODAL
  // ==========================================================

  modalOverlay: {

    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.75)',

    justifyContent:
      'flex-end',

  },


  modalBox: {

    backgroundColor:
      '#1e1b4b',

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    padding: 28,

    borderTopWidth: 3,

    borderColor:
      COLORS.accent,

  },


  modalTitle: {

    color:
      COLORS.white,

    fontSize: 20,

    fontWeight: '800',

    marginBottom: 4,

  },


  modalCompany: {

    color:
      COLORS.accentLight,

    fontSize: 15,

    fontWeight: '600',

    marginBottom: 4,

  },


  modalPeriod: {

    color:
      COLORS.textMuted,

    fontSize: 13,

    marginBottom: 16,

  },


  modalDivider: {

    height: 1,

    backgroundColor:
      COLORS.cardBorder,

    marginBottom: 16,

  },


  modalDesc: {

    color:
      COLORS.text,

    fontSize: 14,

    lineHeight: 22,

    marginBottom: 24,

  },


  modalCloseBtn: {

    backgroundColor:
      COLORS.accent,

    borderRadius: 12,

    paddingVertical: 14,

    alignItems: 'center',

  },


  modalCloseBtnText: {

    color:
      COLORS.white,

    fontWeight: '700',

    fontSize: 14,

  },

});
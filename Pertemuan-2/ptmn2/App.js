import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      {/* Dekorasi Galaxy */}
      <View style={styles.galaxy1} />
      <View style={styles.galaxy2} />
      <View style={styles.galaxy3} />

      <Text style={styles.title}>
        CURRICULUM VITAE
      </Text>

      <Text style={styles.name}>
        ABDULLAH ASSEGAF
      </Text>

      <Text style={styles.text}>
        Nama Lengkap : Abdullah Assegaf{"\n"}
        NIM : 2488010076{"\n"}
        Asal Sekolah : MA AL-Mahrusiyah{"\n"}
        Cita-cita : Direktur{"\n"}
        Rencana mencapai cita-cita : {"\n"}
      </Text>

      <Text style={styles.text}>
        Pengalaman Organisasi :{"\n"}
        1. Kadiv eksternal Himpunan Mahasiswa Informatika (Sekarang){"\n"}
      </Text>

      <StatusBar style="light" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08051A',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* Efek Galaxy */
  galaxy1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#301B69',
    opacity: 0.35,
    top: -180,
    right: -150,
  },

  galaxy2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#123B78',
    opacity: 0.3,
    bottom: -150,
    left: -150,
  },

  galaxy3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#6A1B9A',
    opacity: 0.2,
    top: 250,
    left: -120,
  },

  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },

  name: {
    color: '#B9A7FF',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 25,
  },

  text: {
    color: '#F5F3FF',
    width: '90%',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
  },
});
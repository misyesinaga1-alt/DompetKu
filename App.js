import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function App() {
  const [transaksi, setTransaksi] = useState([]);
  const [ket, setKet] = useState("");
  const [nominal, setNominal] = useState("");

  // tambah transaksi
  const tambahTransaksi = (tipe) => {
    if (!ket || !nominal) {
      Alert.alert("Oops!", "Isi deskripsi dan nominal dulu ya 💕");
      return;
    }

    const dataBaru = {
      id: Date.now().toString(),
      ket,
      nominal: parseInt(nominal),
      tipe,
    };

    setTransaksi((prev) => [dataBaru, ...prev]);
    setKet("");
    setNominal("");
  };

  // hapus transaksi
  const hapusItem = (id) => {
    setTransaksi((prev) => prev.filter((item) => item.id !== id));
  };

  // hitung saldo
  const saldo = transaksi.reduce((total, item) => {
    return item.tipe === "masuk"
      ? total + item.nominal
      : total - item.nominal;
  }, 0);

  // render list
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      
      <View>
        <Text style={styles.ket}>{item.ket}</Text>
        <Text style={styles.tipe}>
          {item.tipe === "masuk" ? "Pemasukan 💚" : "Pengeluaran ❤️"}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.nominal,
            { color: item.tipe === "masuk" ? "#22c55e" : "#ef4444" },
          ]}
        >
          {item.tipe === "masuk" ? "+" : "-"} Rp {item.nominal}
        </Text>

        {/* BUTTON HAPUS */}
        <TouchableOpacity
          onPress={() => hapusItem(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={{ color: "white", fontSize: 12 }}>Hapus 🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>💖 DompetKu Premium</Text>
        <Text style={styles.saldo}>Rp {saldo}</Text>
        <Text style={styles.sub}>
          Catat uangmu biar nggak tiba-tiba habis 😆
        </Text>
      </View>

      {/* INPUT */}
      <TextInput
        placeholder="✨ Deskripsi transaksi"
        value={ket}
        onChangeText={setKet}
        style={styles.input}
      />

      <TextInput
        placeholder="💸 Nominal"
        value={nominal}
        onChangeText={setNominal}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* BUTTON */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#22c55e" }]}
          onPress={() => tambahTransaksi("masuk")}
        >
          <Text style={styles.btnText}>+ Pemasukan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#ef4444" }]}
          onPress={() => tambahTransaksi("keluar")}
        >
          <Text style={styles.btnText}>- Pengeluaran</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {transaksi.length === 0 ? (
        <Text style={styles.empty}>
          💕 Belum ada transaksi, mulai catat yuk!
        </Text>
      ) : (
        <FlatList
          data={transaksi}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4ec",
    padding: 20,
    paddingTop: 50,
  },

  header: {
    backgroundColor: "#ff4d8d",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  saldo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },

  sub: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },

  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  ket: {
    fontSize: 16,
    fontWeight: "bold",
  },

  tipe: {
    fontSize: 12,
    color: "gray",
  },

  nominal: {
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteBtn: {
    marginTop: 5,
    backgroundColor: "#111",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#d63384",
    fontWeight: "bold",
  },
});
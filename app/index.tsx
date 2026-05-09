import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DevCard</Text>

      <Text style={styles.subtitle}>Monte a sua carta de desenvolvedor.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5B4BFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#5B4BFF",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

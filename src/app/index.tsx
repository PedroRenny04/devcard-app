import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { THEME } from "../styles/contants";
import { BotaoPadrao } from "../components/BotaoPadrao";

export default function HomeScreen() {
  const navegador = useRouter();

  return (
    <SafeAreaView style={styles.tela}>
      <View style={styles.areaPrincipal}>
        <View style={styles.blocoApresentacao}>
          <Text style={styles.logotipo}>DevCard</Text>
          <Text style={styles.descricao}>
            Seu cartão de visita digital de dev mobile
          </Text>
        </View>

        <BotaoPadrao 
          texto="Criar meu cartão" 
          aoPressionar={() => navegador.push("/cadastro")} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  areaPrincipal: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 26,
  },
  blocoApresentacao: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 598,
  },
  logotipo: {
    color: THEME.colors.primary,
    fontSize: 48,
    fontWeight: "bold",
  },
  descricao: {
    color: THEME.colors.subtitle,
    fontSize: 15,
    fontWeight: "400",
    width: 204,
    textAlign: "center",
    marginTop: 6,
  }
});

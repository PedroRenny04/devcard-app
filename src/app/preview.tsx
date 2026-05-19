import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THEME } from "../styles/contants";
import { BotaoPadrao } from "../components/BotaoPadrao";
import { CartaoDev } from "../components/CartaoDev";
import { DadosDev } from "./cadastro";

export default function PreviewScreen() {
  const navegador = useRouter();
  const parametros = useLocalSearchParams() as unknown as DadosDev;

  return (
    <SafeAreaView style={styles.tela}>
      <View style={styles.corpo}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Seu cartão</Text>
        </View>

        {!!parametros && <CartaoDev dados={parametros} />}

        <View style={styles.rodape}>
          <BotaoPadrao 
            texto="Editar dados" 
            variante="contorno" 
            aoPressionar={() => navegador.push("/cadastro")} 
          />
          <BotaoPadrao 
            texto="Finalizar" 
            aoPressionar={() => navegador.push("/sucesso")} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  corpo: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 23,
    gap: 16,
  },
  cabecalho: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 14,
  },
  titulo: {
    color: THEME.colors.heading,
    fontSize: THEME.text.heading.h3,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  rodape: {
    flexDirection: "column",
    gap: 13,
  },
});

import { Text, View } from "react-native";
import { styles } from "./styles";

export type DadosDev = {
  nomeCompleto: string;
  cargo: string;
  empresa?: string;
  experiencia: number;
  tecnologia: string;
  corCartao: string;
};

interface CartaoDevProps {
  dados: DadosDev;
}

export function CartaoDev({ dados }: CartaoDevProps) {
  const inicialNome = dados.nomeCompleto ? dados.nomeCompleto.charAt(0).toUpperCase() : "?";

  let nivelDev = "Júnior";
  let corDistintivo = "#8C8C8C";

  const expAnos = Number(dados.experiencia);
  if (expAnos >= 3 && expAnos <= 5) {
    nivelDev = "Pleno";
    corDistintivo = "#3B3DE0";
  } else if (expAnos >= 6) {
    nivelDev = "Sênior";
    corDistintivo = "#E6B800";
  }

  const corFundo = dados.corCartao && dados.corCartao !== "s" ? dados.corCartao : "#E0E3FF";

  return (
    <View style={[styles.cartao, { backgroundColor: corFundo }]}>
      <View style={styles.avatar}>
        <Text style={styles.letraAvatar}>{inicialNome}</Text>
      </View>

      <Text style={styles.nome}>{dados.nomeCompleto}</Text>
      <Text style={styles.cargo}>{dados.cargo}</Text>
      
      {!!dados.empresa && (
        <Text style={styles.empresa}>{dados.empresa}</Text>
      )}

      <Text style={styles.tecnologia}>
        Especialista em {dados.tecnologia}
      </Text>

      <View style={[styles.distintivo, { backgroundColor: corDistintivo }]}>
        <Text style={styles.textoDistintivo}>{nivelDev}</Text>
      </View>
    </View>
  );
}

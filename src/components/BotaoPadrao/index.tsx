import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface BotaoProps extends Omit<TouchableOpacityProps, "onPress"> {
  texto: string;
  aoPressionar: () => void;
  variante?: "primario" | "secundario" | "contorno";
  desabilitado?: boolean;
}

export function BotaoPadrao({
  texto,
  aoPressionar,
  variante = "primario",
  desabilitado = false,
  ...outros
}: BotaoProps) {
  const estiloBotao = [
    styles.botao,
    variante === "primario" && styles.primario,
    variante === "secundario" && styles.secundario,
    variante === "contorno" && styles.contorno,
    desabilitado && styles.desabilitado,
  ];

  const estiloTexto = [
    styles.textoBotao,
    variante === "primario" && styles.textoPrimario,
    variante === "secundario" && styles.textoSecundario,
    variante === "contorno" && styles.textoContorno,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={estiloBotao}
      onPress={aoPressionar}
      disabled={desabilitado}
      {...outros}
    >
      <Text style={estiloTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

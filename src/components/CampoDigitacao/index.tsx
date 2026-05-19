import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../styles/contants";

interface CampoDigitacaoProps extends Omit<TextInputProps, "onChangeText" | "onChange" | "onBlur" | "defaultValue"> {
  rotulo: string;
  aoMudarTexto: (texto: string) => void;
  valorPadrao?: string;
  aoMudar?: () => void;
  aoPerderFoco?: () => void;
  mensagemErro?: string;
}

export function CampoDigitacao({
  rotulo,
  aoMudarTexto,
  valorPadrao,
  aoMudar,
  aoPerderFoco,
  mensagemErro,
  ...outrasPropriedades
}: CampoDigitacaoProps) {
  const temErro = !!mensagemErro;

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      
      <TextInput
        style={[styles.entrada, temErro && styles.entradaErro]}
        onChangeText={aoMudarTexto}
        defaultValue={valorPadrao}
        onChange={aoMudar}
        onBlur={aoPerderFoco}
        placeholderTextColor={THEME.colors.subtitle}
        {...outrasPropriedades}
      />

      {temErro && (
        <Text style={styles.textoErro}>{mensagemErro}</Text>
      )}
    </View>
  );
}

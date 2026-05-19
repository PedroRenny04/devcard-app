import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export type ItemCor = {
  id: string;
  nome: string;
  codigoCor: string;
};

interface SeletorDeCoresProps {
  aoSelecionar: (codigoCor: string) => void;
  opcoes: ItemCor[];
}

export function SeletorDeCores({ aoSelecionar, opcoes }: SeletorDeCoresProps) {
  const [corEscolhida, setCorEscolhida] = useState<string>("");

  function tratarSelecao(codigoCor: string) {
    setCorEscolhida(codigoCor);
    aoSelecionar(codigoCor);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Cor do Cartão</Text>
      
      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao) => {
          const eAtivo = corEscolhida === opcao.codigoCor;
          
          return (
            <TouchableOpacity
              key={opcao.id}
              activeOpacity={0.8}
              onPress={() => tratarSelecao(opcao.codigoCor)}
              style={[
                styles.botaoCor,
                eAtivo && styles.botaoAtivo
              ]}
            >
              <Text 
                style={[
                  styles.textoCor, 
                  eAtivo && styles.textoCorAtivo
                ]}
              >
                {opcao.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { THEME } from "../styles/contants";
import { BotaoPadrao } from "../components/BotaoPadrao";
import { CampoDigitacao } from "../components/CampoDigitacao";
import { SeletorDeCores, ItemCor } from "../components/SeletorDeCores";

const LISTA_CORES: ItemCor[] = [
  { id: "v1", nome: "Azul", codigoCor: "#3B3DE0" },
  { id: "v2", nome: "Verde", codigoCor: "#449451" },
  { id: "v3", nome: "Roxo", codigoCor: "#380E66" },
  { id: "v4", nome: "Rose", codigoCor: "#8A084F" }
];

export type DadosDev = {
  nomeCompleto: string;
  cargo: string;
  empresa?: string;
  experiencia: number;
  tecnologia: string;
  corCartao: string;
};

type ErrosFormulario = {
  nomeCompleto?: string;
  cargo?: string;
  empresa?: string;
  experiencia?: string;
  tecnologia?: string;
  corCartao?: string;
};

export default function CadastroScreen() {
  const navegador = useRouter();
  
  const [formulario, setFormulario] = useState<{ dados: DadosDev; erros: ErrosFormulario }>({
    dados: {
      nomeCompleto: "",
      cargo: "",
      empresa: "",
      experiencia: 0,
      tecnologia: "",
      corCartao: "",
    },
    erros: {}
  });

  function enviarFormulario() {
    navegador.push({
      pathname: "/preview",
      params: formulario.dados
    });
  }

  function alterarValorCampo(nomeCampo: keyof DadosDev, valor: string | number) {
    setFormulario((atual) => ({
      ...atual,
      dados: {
        ...atual.dados,
        [nomeCampo]: valor
      }
    }));
    validarCampo(nomeCampo, valor);
  }

  function gerenciarErroCampo(nomeCampo: keyof DadosDev, erroText: string | undefined) {
    setFormulario((atual) => ({
      ...atual,
      erros: {
        ...atual.erros,
        [nomeCampo]: erroText
      }
    }));
  }

  function validarCampo(campo: keyof DadosDev, valorAtual?: string | number) {
    const valor = valorAtual !== undefined ? valorAtual : formulario.dados[campo];

    switch (campo) {
      case "nomeCompleto":
        const nomeStr = String(valor).trim();
        if (nomeStr.length === 0) {
          gerenciarErroCampo("nomeCompleto", "Informe o nome completo");
        } else if (nomeStr.length < 3) {
          gerenciarErroCampo("nomeCompleto", "Informe pelo menos 3 caracteres");
        } else {
          gerenciarErroCampo("nomeCompleto", undefined);
        }
        break;

      case "cargo":
        const cargoStr = String(valor).trim();
        if (cargoStr.length === 0) {
          gerenciarErroCampo("cargo", "Informe seu cargo");
        } else {
          gerenciarErroCampo("cargo", undefined);
        }
        break;

      case "experiencia":
        const expNum = Number(valor);
        if (isNaN(expNum) || expNum < 1) {
          gerenciarErroCampo("experiencia", "Você deve ter pelo menos 1 ano de experiência");
        } else {
          gerenciarErroCampo("experiencia", undefined);
        }
        break;

      case "tecnologia":
        const tecStr = String(valor).trim();
        if (tecStr.length === 0) {
          gerenciarErroCampo("tecnologia", "Informe sua tecnologia favorita");
        } else {
          gerenciarErroCampo("tecnologia", undefined);
        }
        break;

      default:
        break;
    }
  }

  const possuiErros = Object.values(formulario.erros).some((item) => !!item);
  const camposVazios = !formulario.dados.nomeCompleto || !formulario.dados.cargo || !formulario.dados.tecnologia || formulario.dados.experiencia <= 0 || !formulario.dados.corCartao;
  const botaoDesabilitado = possuiErros || camposVazios;

  return (
    <SafeAreaView style={styles.tela}>
      <KeyboardAvoidingView behavior="padding" style={styles.tela}>
        <ScrollView contentContainerStyle={styles.corpo} keyboardShouldPersistTaps="handled">
          <View style={styles.cabecalho}>
            <Text style={styles.tituloTela}>Cadastro</Text>
            <Text style={styles.subtituloTela}>Preencha seus dados de dev</Text>
          </View>

          <View style={styles.formularioContainer}>
            <View style={styles.listaCampos}>
              <CampoDigitacao 
                aoMudarTexto={(txt) => alterarValorCampo("nomeCompleto", txt)}
                rotulo="Nome Completo"
                placeholder="Pedro Renny"
                valorPadrao={formulario.dados.nomeCompleto}
                aoMudar={() => validarCampo("nomeCompleto")}
                aoPerderFoco={() => validarCampo("nomeCompleto")}
                mensagemErro={formulario.erros.nomeCompleto}
              />

              <CampoDigitacao
                aoMudarTexto={(txt) => alterarValorCampo("cargo", txt)}
                rotulo="Cargo"
                placeholder="Desenvolvedor Front end"
                valorPadrao={formulario.dados.cargo}
                aoMudar={() => validarCampo("cargo")}
                aoPerderFoco={() => validarCampo("cargo")}
                mensagemErro={formulario.erros.cargo}
              />

              <CampoDigitacao
                aoMudarTexto={(txt) => alterarValorCampo("empresa", txt)}
                rotulo="Empresa"
                placeholder="TJMT"
                valorPadrao={formulario.dados.empresa}
                mensagemErro={formulario.erros.empresa}
              />

              <CampoDigitacao 
                aoMudarTexto={(txt) => alterarValorCampo("experiencia", parseInt(txt) || 0)}
                rotulo="Anos de Experiência"
                placeholder="2"
                keyboardType="numeric"
                valorPadrao={formulario.dados.experiencia > 0 ? formulario.dados.experiencia.toString() : ""}
                aoMudar={() => validarCampo("experiencia")}
                aoPerderFoco={() => validarCampo("experiencia")}
                mensagemErro={formulario.erros.experiencia}
              />

              <CampoDigitacao 
                aoMudarTexto={(txt) => alterarValorCampo("tecnologia", txt)}
                rotulo="Tecnologia Favorita"
                placeholder="Python"
                valorPadrao={formulario.dados.tecnologia}
                aoMudar={() => validarCampo("tecnologia")}
                aoPerderFoco={() => validarCampo("tecnologia")}
                mensagemErro={formulario.erros.tecnologia}
              />
            </View>

            <SeletorDeCores 
              aoSelecionar={(cod) => alterarValorCampo("corCartao", cod)} 
              opcoes={LISTA_CORES} 
            />
          </View>
          
          <View style={styles.rodape}>
            <BotaoPadrao 
              aoPressionar={enviarFormulario}
              texto="Gerar Cartão"
              desabilitado={botaoDesabilitado}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  corpo: {
    paddingHorizontal: 23,
    paddingBottom: 24,
    gap: 11,
  },
  cabecalho: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 3,
    marginTop: 10,
  },
  tituloTela: {
    color: THEME.colors.heading,
    fontSize: THEME.text.heading.h3,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  subtituloTela: {
    color: THEME.colors.subtitle,
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  formularioContainer: {
    marginTop: 8,
  },
  listaCampos: {
    gap: 11,
    marginBottom: 9,
  },
  rodape: {
    flexDirection: "column",
    gap: 13,
    marginTop: 10,
    marginBottom: 20,
  },
});

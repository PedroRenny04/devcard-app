import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Cadastro() {

  const router = useRouter();

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [anos, setAnos] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [cor, setCor] = useState('Azul');

  const [erro, setErro] = useState('');

  function gerarCartao() {
    if (nome.length < 3) {
      setErro('Nome inválido');
      return;
    }

    if (cargo === '' || anos === '' || tecnologia === '') {
      setErro('Preencha os campos obrigatórios');
      return;
    }

    if (Number(anos) <= 0) {
      setErro('Anos de experiência inválido');
      return;
    }

    setErro('');

    router.push({
      pathname: '/preview',
      params: {
        nome,
        cargo,
        empresa,
        anos,
        tecnologia,
        cor
      }
    });
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder='Nome completo'
        placeholderTextColor='#888'
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder='Cargo'
        placeholderTextColor='#888'
        value={cargo}
        onChangeText={setCargo}
      />

      <TextInput
        style={styles.input}
        placeholder='Empresa'
        placeholderTextColor='#888'
        value={empresa}
        onChangeText={setEmpresa}
      />

      <TextInput
        style={styles.input}
        placeholder='Anos de experiência'
        placeholderTextColor='#888'
        value={anos}
        onChangeText={setAnos}
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        placeholder='Tecnologia favorita'
        placeholderTextColor='#888'
        value={tecnologia}
        onChangeText={setTecnologia}
      />

      <Text style={styles.label}>Cor do cartão</Text>

      <View style={styles.colorContainer}>

        <TouchableOpacity
          style={styles.colorButton}
          onPress={() => setCor('Azul')}
        >
          <Text>Azul</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.colorButton}
          onPress={() => setCor('Verde')}
        >
          <Text>Verde</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.colorButton}
          onPress={() => setCor('Roxo')}
        >
          <Text>Roxo</Text>
        </TouchableOpacity>

      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={gerarCartao}
      >
        <Text style={styles.buttonText}>
          Gerar Cartão
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  label: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },

  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  colorButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    width: 90,
    alignItems: 'center'
  },

  erro: {
    color: 'red',
    marginBottom: 10
  },

  button: {
    backgroundColor: '#4B5EFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
  

});
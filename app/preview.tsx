import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type PreviewParams = {
  nome: string;
  cargo: string;
  empresa: string;
  anos: string;
  tecnologia: string;
  cor: string;
};

export default function Preview() {

  const router = useRouter();

  const params = useLocalSearchParams<PreviewParams>();

  const inicial = params.nome ? params.nome.charAt(0).toUpperCase() : '?';

  let nivel = 'Júnior';
  let corBadge = '#808080';

  if (Number(params.anos) >= 3 && Number(params.anos) <= 5) {
    nivel = 'Pleno';
    corBadge = '#0000FF';
  } else if (Number(params.anos) >= 6) {
    nivel = 'Sênior';
    corBadge = '#FFD700';
  }

  let corFundo = '#d4e4ff';
  if (params.cor === 'Verde') {
    corFundo = '#d4ffd4';
  } else if (params.cor === 'Roxo') {
    corFundo = '#eed4ff';
  }

  return (
    <View style={styles.container}>

      <View style={[styles.card, { backgroundColor: corFundo }]}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {inicial}
          </Text>
        </View>

        <Text style={styles.nome}>
          {params.nome}
        </Text>

        <Text style={styles.texto}>
          {params.cargo}
        </Text>

        <Text style={styles.texto}>
          {params.empresa}
        </Text>

        <Text style={styles.tecnologia}>
          Especialista em {params.tecnologia}
        </Text>

        <View style={[styles.badge, { backgroundColor: corBadge }]}>
          <Text style={styles.badgeText}>
            {nivel}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.back()}
      >
        <Text>Editar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => router.replace('/sucesso')}
      >
        <Text style={{ color: '#fff' }}>
          Finalizar
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

  card: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  avatarText: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },

  texto: {
    fontSize: 16,
    color: '#555'
  },

  tecnologia: {
    marginTop: 20,
    fontWeight: 'bold'
  },

  badge: {
    marginTop: 20,
    backgroundColor: '#5B4BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20
  },

  badgeText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  editButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },

  finishButton: {
    backgroundColor: '#5B4BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  }

});
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './styles';

const HelpPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Como Utilizar Memory Cards</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Criar uma Anotação</Text>
        <Text style={styles.text}>
          Para criar uma nova anotação, basta clicar no ícone "+" na tela
          inicial ou na tela de uma categoria especifica e preencher os
          detalhes. Você pode adicionar um título e o conteúdo da sua anotação.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>2. Revisar Anotações</Text>
        <Text style={styles.text}>
          O app enviará lembretes automáticos para você revisar suas anotações
          em 1 dia, 7 dias, 1 mês, e 6 meses. Você pode acessar esses lembretes
          diretamente pela notificação. Lembre-se de ativar as notificações!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>3. Editar ou Excluir Anotações</Text>
        <Text style={styles.text}>
          Para editar ou excluir uma anotação, toque na anotação desejada e
          utilize os botões de edição ou exclusão no topo da tela.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>4. Criar Categorias e Assuntos</Text>
        <Text style={styles.text}>
          Para organizar melhor suas anotações, você pode criar categorias e
          assuntos personalizados. Isso ajudará a separar suas anotações em
          grupos relacionados. Vá até o menu lateral, acesse a seção
          correspondente e adicione novas categorias e assuntos conforme suas
          necessidades.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>5. Gerar Resumo PDF</Text>
        <Text style={styles.text}>
          Se desejar gerar um PDF a partir de suas anotações, vá até a opção
          "Criar Resumo PDF" no menu lateral e selecione as características das
          anotações que deseja incluir.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>6. Enviar Feedback</Text>
        <Text style={styles.text}>
          Caso tenha encontrado algum problema ou tenha sugestões de melhorias,
          acesse o menu lateral e selecione "Feedback" para nos enviar sua
          opinião.
        </Text>
      </View>
      <View style={styles.sectionVersion}>
        <Text style={styles.subtitleVersion}>Versão 1.0.0</Text>
        <Text style={styles.textVersion}>Criado por: Isaac Cruz</Text>
      </View>
    </ScrollView>
  );
};

export default HelpPage;

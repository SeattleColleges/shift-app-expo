import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExampleComponentProps {
  title?: string;
  subtitle?: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ title = 'Default Title', subtitle = 'Default Subtitle' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExampleComponent;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';

const { width } = Dimensions.get('window'); // Get the current screen width

export default function CodeOfConductPage() {
  const links = [
    { title: 'North Seattle College', url: 'https://northseattle.edu' },
    { title: 'Seattle Colleges', url: 'https://www.seattlecolleges.edu' },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Code of Conduct</Text>

      {/* Code of Conduct Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Code of Conduct</Text>
        <Text style={styles.placeholderText}>
          Placeholder text for the Code of Conduct section. Add guidelines or
          policies here.
        </Text>
      </View>

      {/* Relevant Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relevant Links</Text>
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openLink(link.url)}
            style={styles.linkContainer}
          >
            <Text style={styles.link}>{link.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: width > 400 ? 32 : 28,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  section: {
    width: '85%',
    maxWidth: 400,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  linkContainer: {
    marginTop: 10,
  },
  link: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

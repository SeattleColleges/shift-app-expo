import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // For navigation
import { FaCalendarAlt, FaClock, FaUsers, FaQuestionCircle, FaUser } from 'react-icons/fa'; // Icons

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      {/* Schedule/Dashboard */}
      <Link href="/schedule" style={styles.iconContainer}>
        <FaCalendarAlt size={24} />
      </Link>

      {/* Request Time Off */}
      <Link href="/request-time-off" style={styles.iconContainer}>
        <FaClock size={24} />
      </Link>

      {/* Coworkers Page */}
      <Link href="/coworkers" style={styles.iconContainer}>
        <FaUsers size={24} />
      </Link>

      {/* Help Page */}
      <Link href="/help" style={styles.iconContainer}>
        <FaQuestionCircle size={24} />
      </Link>

      {/* Profile/Account Page */}
      <Link href="/profile" style={styles.iconContainer}>
        <FaUser size={24} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
    color: '#fff',
  },
});

export default Footer;

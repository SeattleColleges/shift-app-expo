import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

// Type definition for an Employee object
type Employee = {
  id: string;
  name: string;
  scheduledHours: number;
  maxHours: number;
};

// Type definition for the TimeLineBar props
type TimeLineBarProps = {
  scheduled: number;
  max: number;
};

const TimeLineBar = ({ scheduled, max }: TimeLineBarProps) => {
  const scheduledPercentage = (scheduled / max) * 100;
  const remaining = max - scheduled; // Calculate remaining available time

  // Determine bar color based on scheduled hours
  let barColor = 'green';
  if (scheduledPercentage >= 80) {
    barColor = 'red'; // Change to red if 80% or more of max hours are scheduled
  } else if (scheduledPercentage >= 50) {
    barColor = 'yellow'; // Change to yellow if between 50% and 79%
  }

  return (
    <View>
      {/* Progress Bar */}
      <View style={styles.timeLineContainer}>
        <View
          style={[
            styles.scheduledBar,
            { width: `${scheduledPercentage}%`, backgroundColor: barColor },
          ]}
        />
        <Text style={styles.timeLabel}>
          {scheduled}h / {max}h Max
        </Text>
      </View>

      {/* Remaining Time */}
      <View style={styles.remainingTimeContainer}>
        <Text style={styles.remainingTime}>
          Remaining Time Available: {remaining > 0 ? remaining : 0}h
        </Text>
      </View>
    </View>
  );
};

const EmployeeTimeScreen = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'supervisor' | 'employee'>('employee'); // Initial role for testing

  const fetchEmployeeData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let mockData: Employee[] = [];
      if (userRole === 'supervisor') {
        // Simulate data for a supervisor viewing multiple employees
        mockData = [
          { id: '1', name: 'John Smith', scheduledHours: 14, maxHours: 16 },
          { id: '2', name: 'Jane Doe', scheduledHours: 8, maxHours: 20 },
          { id: '3', name: 'Peter Jones', scheduledHours: 12, maxHours: 18 },
        ];
      } else if (userRole === 'employee') {
        // Simulate data for an employee viewing only their own information
        mockData = [
          { id: '4', name: 'My Self', scheduledHours: 7, maxHours: 15 },
        ];
      }

      // Simulate an API call with a 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmployeeData(mockData);
      setLoading(false);
    } catch (e: unknown) {
      setError('Failed to load employee data.');
      setLoading(false);
      if (e instanceof Error) {
        console.error('Error fetching data:', e.message);
      } else {
        console.error('Unexpected error:', e);
      }
    }
  }, [userRole]);

  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]); // Re-fetch data when fetchEmployeeData changes

  const renderEmployeeCard = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <Text style={styles.employeeName}>{item.name}</Text>
      <TimeLineBar scheduled={item.scheduledHours} max={item.maxHours} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employee Time</Text>
      <View style={styles.roleSwitchContainer}>
        <Text>Testing as:</Text>
        <Button
          title={userRole === 'supervisor' ? 'Supervisor' : 'Employee'}
          onPress={() => {
            setUserRole((prevRole) =>
              prevRole === 'supervisor' ? 'employee' : 'supervisor'
            );
          }}
        />
      </View>

      {loading && <Text style={styles.loading}>Loading employee data...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={employeeData}
          keyExtractor={(item) => item.id}
          renderItem={renderEmployeeCard}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  roleSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeLineContainer: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  scheduledBar: {
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  timeLabel: {
    fontSize: 12,
    color: '#333',
    position: 'absolute',
    top: 2,
    left: 10,
  },

  
  

  remainingTimeContainer: {
    marginTop: 8,
  },
  remainingTime: {
    fontSize: 12,
    color: '#555',
  },
  
});

export default EmployeeTimeScreen;
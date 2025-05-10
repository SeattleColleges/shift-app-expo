import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Button } from 'react-native';

// Type definition for an Employee object
type Employee = {
  id: string;
  name: string;
  scheduledHours: number;
  maxHours: number;
  showScheduled: boolean; // New property to track individual toggle state
};

// Type definition for the TimeLineBar props
type TimeLineBarProps = {
  scheduled: number;
  max: number;
};

const TimeLineBar = ({ scheduled, max }: TimeLineBarProps) => {
  const remaining = max - scheduled;
  const scheduledPercentage = (scheduled / max) * 100;
  const remainingPercentage = (remaining / max) * 100;

  return (
    <View style={styles.timeLineContainer}>
      <View
        style={[
          styles.scheduledBar,
          { width: `${scheduledPercentage}%` },
        ]}
      />
      <View
        style={[
          styles.remainingBar,
          { width: `${remainingPercentage}%`, left: `${scheduledPercentage}%` },
        ]}
      />
      <Text style={styles.timeLabel}>{scheduled} / {max} Hours</Text>
    </View>
  );
};

const EmployeeTimeScreen = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'supervisor' | 'employee'>('supervisor'); // Initial role for testing

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError(null);
    try {
      let mockData: Employee[] = [];
      if (userRole === 'supervisor') {
        // Simulate data for a supervisor viewing multiple employees
        mockData = [
          { id: '1', name: 'John Smith', scheduledHours: 5, maxHours: 16, showScheduled: true }, // Initialize toggle state
          { id: '2', name: 'Jane Doe', scheduledHours: 10, maxHours: 20, showScheduled: false },
          { id: '3', name: 'Peter Jones', scheduledHours: 12, maxHours: 18, showScheduled: true },
        ];
      } else if (userRole === 'employee') {
        // Simulate data for an employee viewing only their own information
        mockData = [
          { id: '4', name: 'My Self', scheduledHours: 7, maxHours: 15, showScheduled: true },
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
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      setError(null);
      try {
        let mockData: Employee[] = [];
        if (userRole === 'supervisor') {
          mockData = [
            { id: '1', name: 'John Smith', scheduledHours: 5, maxHours: 16, showScheduled: true },
            { id: '2', name: 'Jane Doe', scheduledHours: 10, maxHours: 20, showScheduled: false },
            { id: '3', name: 'Peter Jones', scheduledHours: 12, maxHours: 18, showScheduled: true },
          ];
        } else if (userRole === 'employee') {
          mockData = [
            { id: '4', name: 'My Self', scheduledHours: 7, maxHours: 15, showScheduled: true },
          ];
        }

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
    };

    fetchEmployeeData();
  }, [userRole]); // Re-fetch data when the user role changes

  const handleToggleSwitch = (employeeId: string) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId
          ? { ...employee, showScheduled: !employee.showScheduled }
          : employee
      )
    );
  };

  const renderEmployeeCard = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <Text style={styles.employeeName}>{item.name}</Text>
      {item.showScheduled && (
        <TimeLineBar scheduled={item.scheduledHours} max={item.maxHours} />
      )}
      {!item.showScheduled && <Text style={styles.details}>Max Hours: {item.maxHours}</Text>}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Show Scheduled Hours</Text>
        <Switch
          value={item.showScheduled}
          onValueChange={() => handleToggleSwitch(item.id)}
        />
      </View>
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
            setUserRole(prevRole =>
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
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between', // Improved layout
  },
  toggleLabel: {
    fontSize: 14,
    marginRight: 8,
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
    backgroundColor: 'lightblue',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  remainingBar: {
    backgroundColor: 'lightgreen',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  timeLabel: {
    fontSize: 12,
    color: '#333',
    position: 'absolute',
    top: 2,
    left: 10,
  },
});

export default EmployeeTimeScreen;
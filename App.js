import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput, 
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const addTask = () => {
    const title = taskText.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: `${Date.now()}-${Math.random()}`, title, completed: false },
    ]);
    setTaskText('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`${item.completed ? 'Mark' : 'Complete'} ${item.title}`}
        onPress={() => toggleTask(item.id)}
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
      >
        {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </TouchableOpacity>
      <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
        {item.title}
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.title}`}
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>YOUR DAY, IN ORDER</Text>
          <Text style={styles.heading}>My Tasks</Text>
          <Text style={styles.subtitle}>
            {remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} remaining
          </Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            accessibilityLabel="New task"
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            placeholder="What needs to get done?"
            placeholderTextColor="#9aa3b2"
            returnKeyType="done"
            style={styles.input}
            value={taskText}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Add task"
            disabled={!taskText.trim()}
            onPress={addTask}
            style={[styles.addButton, !taskText.trim() && styles.addButtonDisabled]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={tasks}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyTitle}>A fresh start</Text>
              <Text style={styles.emptySubtitle}>Add a task above to get going.</Text>
            </View>
          }
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5f7fb',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 44,
    paddingBottom: 28,
  },
  eyebrow: {
    color: '#6674d9',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  heading: {
    color: '#20283b',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#7c8494',
    fontSize: 15,
    marginTop: 8,
  },
  inputRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e8ebf2',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 20,
    padding: 8,
  },
  input: {
    color: '#20283b',
    flex: 1,
    fontSize: 15,
    minHeight: 44,
    paddingHorizontal: 10,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#6674d9',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  addButtonDisabled: {
    backgroundColor: '#aeb6e9',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 30,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  taskCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#edf0f5',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#cbd1dd',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    marginRight: 13,
    width: 24,
  },
  checkboxCompleted: {
    backgroundColor: '#6674d9',
    borderColor: '#6674d9',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  taskTitle: {
    color: '#30384a',
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  taskTitleCompleted: {
    color: '#a1a8b5',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    marginLeft: 8,
    width: 36,
  },
  deleteText: {
    color: '#a1a8b5',
    fontSize: 25,
    fontWeight: '300',
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyIcon: {
    color: '#6674d9',
    fontSize: 28,
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#30384a',
    fontSize: 17,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#8b93a1',
    fontSize: 14,
    marginTop: 7,
  },
});

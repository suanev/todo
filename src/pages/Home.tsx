import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const updatedTasks = tasks.map((task) => ({ ...task }));

    const changeTitle = updatedTasks.find(
      (task) => task.title === newTaskTitle
    );

    if (changeTitle) {
      Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
    }

    setTasks((oldTasks) => [...oldTasks, newTasks]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((task) => task.id === id);

    if (!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask({
    taskId,
    taskNewTitle,
  }: {
    taskId: number;
    taskNewTitle: string;
  }) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((task) => task.id === taskId);

    if (!foundItem) {
      return;
    }

    foundItem.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

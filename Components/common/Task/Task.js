import React from "react";
import { View, Text } from "react-native";
import { TouchableHighlight} from "react-native-gesture-handler";
import { styles } from "./styles";

export const Task = ({task}) => {
  return <View>
    <View style={styles.taskNoteDue}>
    {task.name.length > 0 && (
        <Text style={styles.listItemSecond}>
          {task.name}
        </Text>
      )}
      <Text>Priority: {task.priority}</Text>
      {task.description.length > 0 && (
        <Text style={styles.listItemSecond}>
          Notes: {task.description}
        </Text>
      )}
      {task.due_date != null && (
        <Text style={styles.listItemSecond}>
          Due: {task.due_date}
        </Text>
      )}
    </View>
    <TouchableHighlight
      underlayColor="black"
      accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
      accessible={true}
      onPress={() => this.completeTaskByCaretaker(task.id, task.completed)}
      >
      <Text style={styles.listComplete}>
        {task.completed ? "TASK COMPLETE" : "MARK COMPLETE"}
      </Text>
    </TouchableHighlight>
      </View>
}






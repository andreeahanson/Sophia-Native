import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loadTasks } from '../../actions';
import { postClientTask, deleteClientTask } from '../../Utils/clientApiCalls';
import { patchTask } from '../../Utils/patchTask';
import { fetchAllTasks } from '../../Utils/fetchAllTasks';
import { fetchCaretakerTasks, patchCaretakerTask } from '../../Utils/caretakerApiCalls';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { PropTypes } from 'prop-types';
import { styles } from './styles';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import theme from '../../theme';

export class Tasks extends Component {
	constructor() {
		super();
		this.state = {
			task_input: '',
			description_input: '',
			due_date: '',
			displayEdit: true,
			task_edit_input: '',
			priority: '',
			displayExtraInputs: false
		};
	}

	componentDidMount = async () => {
		await this.returnUpdatedTask();
	};

	returnUpdatedTask = async () => {
		const list = this.props.navigation.state.params;
		const { user } = this.props;
		const tasks = await fetchAllTasks(list.id, user.id);
		this.props.loadTasks(tasks);
	};

	toggleEditName = task_id => {
		this.setState({ displayEdit: task_id });
	};

	handleChangeTask = input => {
		this.setState({ task_input: input });
	};

	handleChangeNote = input => {
		this.setState({ description_input: input });
	};

	handleChangeDate = input => {
		this.setState({ due_date: input });
	};

	handleEditTask = input => {
		this.setState({ task_edit_input: input });
	};

	handleSubmitEdit = async taskId => {
		const list = this.props.navigation.state.params;
		const { user } = this.props;
		const { task_edit_input } = this.state;
		const modifiedTask = { name: task_edit_input };
		await patchTask(modifiedTask, list.id, taskId, user.id);
		await this.returnUpdatedTask();
		this.setState({ task_edit_input: '', displayEdit: false });
	};

	handleSubmit = async newTask => {
		const list = this.props.navigation.state.params;
		const { user } = this.props;
		const { task_input, description_input, due_date } = this.state;
		newTask = {
			name: task_input,
			description: description_input,
			due_date: due_date
		};
		await postClientTask(newTask, list.id, user.id);
		await this.returnUpdatedTask();
		this.setState({ task_input: '', description_input: '', due_date: '' });
	};

	eraseTask = async taskId => {
		const list = this.props.navigation.state.params;
		await deleteClientTask(list.id, taskId);
		this.returnUpdatedTask();
	};

	completeTaskByCaretaker = async (taskId, taskCompleted) => {
		const list = this.props.navigation.state.params;
		taskCompleted = !taskCompleted;
		const completedTask = { completed: taskCompleted };
		await patchTask(completedTask, list.id, taskId);
		await this.returnUpdatedCaretakerTask();
	};

	lowerPriority = async (taskId, taskPriority) => {
		if (taskPriority === 'medium') {
			taskPriority = 'low';
		} else if (taskPriority === 'high') {
			taskPriority = 'medium';
		} else {
			taskPriority = 'low';
		}
		const list = this.props.navigation.state.params;
		const changedPriority = { priority: taskPriority };
		await patchTask(changedPriority, list.id, taskId);
		await this.returnUpdatedTask();
	};

	increasePriority = async (taskId, taskPriority) => {
		if (taskPriority === 'medium') {
			taskPriority = 'high';
		} else if (taskPriority === 'low') {
			taskPriority = 'medium';
		} else {
			taskPriority = 'high';
		}
		const list = this.props.navigation.state.params;
		const changedPriority = { priority: taskPriority };
		await patchTask(changedPriority, list.id, taskId);
		await this.returnUpdatedTask();
	};

	expandInputField = () => {
		this.setState({ displayExtraInputs: !this.state.displayExtraInputs });
	};

	render() {
		const { name } = this.props.navigation.state.params;
		const { tasks } = this.props;
		const allTasks = tasks.map(task => {
			return (
				<View style={styles.task} key={task.id}>
					<Text style={styles.taskHeader}>{task.name}</Text>
					<View style={styles.priorityLevels}>
						<TouchableHighlight
							accessibilityLabel="Tap me to lower the priority level of the task."
							onPress={() => this.lowerPriority(task.id, task.priority)}
						>
							<Text>🔺</Text>
						</TouchableHighlight>
						<Text style={styles.editItem}>Priority: {task.priority}</Text>
						<TouchableHighlight
							accessibilityLabel="Tap me to increase the priority level of the task."
							onPress={() => this.increasePriority(task.id, task.priority)}
						>
							<Text>🔻</Text>
						</TouchableHighlight>
					</View>
					{this.state.displayEdit !== task.id && (
						<View style={styles.taskNoteDue}>
							{task.description.length > 0 && <Text style={styles.taskItemSecond}>Notes: {task.description}</Text>}
							{task.due_date != null && <Text style={styles.taskItemSecond}>Due: {task.due_date}</Text>}
						</View>
					)}
					{this.state.displayEdit === task.id && (
						<View style={styles.alignEdit}>
							<Input
								label="Edit task"
								value={this.state.task_edit_input}
								onChangeText={this.handleEditTask}
								saveRecordedText={text => this.handleEditTask(text)}
							/>
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel="Tap me to submit your edited todo task."
								accessible={true}
								onPress={() => this.handleSubmitEdit(task.id)}
							>
								<Text style={styles.editCheck}>✔︎</Text>
							</TouchableHighlight>
						</View>
					)}
					<Text style={styles.taskComplete}>{task.completed ? ' COMPLETED' : ' NOT DONE YET'}</Text>
					<View style={styles.vertically}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel="Tap me to open form and edit your list name."
							onPress={() => toggleEditName(list.id)}
						>
							<Text style={styles.editItem}>✏️ EDIT</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={() => eraseTask(list.id)}>
							<Text style={styles.editItem}>🗑 DELETE</Text>
						</TouchableHighlight>
					</View>
				</View>
			);
		});
		return (
			<View>
				<Header>{name}</Header>
				<ScrollView>
					<View style={theme.container}>
						<View style={styles.addTaskContainer}>
							<View style={styles.align}>
								<Text style={styles.label}>Task Name:</Text>
								<Input
									value={this.state.task_input}
									onChangeText={this.handleChangeTask}
									label="Add Task Name"
									accessibilityLabel="Add your task name"
									saveRecordedText={text => this.handleChangeTask(text)}
								/>
								{this.state.displayExtraInputs === true && (
									<View>
										<Text style={styles.label}>Add Note:</Text>
										<Input
											value={this.state.description_input}
											onChangeText={this.handleChangeNote}
											label="Add Note"
											accessibilityLabel="Add a note providing more details about your task"
											saveRecordedText={text => this.handleChangeNote(text)}
										/>
										<Text style={styles.label}>Due Date:</Text>
										<Input
											label="mm/dd"
											style={styles.input}
											label="mm/dd"
											value={this.state.due_date}
											onChangeText={this.handleChangeDate}
											accessibilityLabel="Add to due date to communicate when the task needs to be completed by"
											saveRecordedText={text => this.handleChangeDate(text)}
										/>
									</View>
								)}
							</View>
							<Button accessibilityLabel="Press to add more details about your task" onPress={this.expandInputField}>
								{this.state.displayExtraInputs === false ? 'Add more details' : 'Hide details'}
							</Button>
							<Button accessibilityLabel="Tap me to submit your task." onPress={() => this.handleSubmit()}>
								Submit New Task
							</Button>
						</View>
						{tasks.length < 1 && (
							<View>
								<Text style={styles.label}>No tasks yet!</Text>
							</View>
						)}
						<View style={{ width: '90%' }}>{allTasks}</View>
						<View style={{ height: 200 }}></View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export const mapStateToProps = state => ({
	tasks: state.tasks,
	user: state.userAccount
});

export const mapDispatchToProps = dispatch => ({
	loadTasks: tasks => dispatch(loadTasks(tasks))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tasks);

Tasks.propTypes = {
	user: PropTypes.object,
	tasks: PropTypes.array
};

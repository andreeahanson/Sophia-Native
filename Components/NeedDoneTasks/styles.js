import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	task: {
		backgroundColor: theme.primary,
		shadowOpacity: 30,
		alignItems: 'center',
		margin: 10,
		padding: 5,
		width: '90%',
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'space-evenly'
	},
	taskHeader: {
		textAlign: 'center',
		fontSize: 30,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		width: '100%',
		marginTop: 5,
		marginBottom: 10
	},
	taskNoteDue: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		width: '90%',
		fontFamily: theme.textTwo
	},
	taskItemSecond: {
		textAlign: 'center',
		fontSize: 20,
		color: theme.accentOne,
		fontFamily: theme.textMain,
		width: '100%',
		margin: 10,
		fontFamily: theme.textTwo
	},
	taskComplete: {
		fontSize: 20,
		color: theme.accentOne,
		margin: 10,
		alignSelf: 'center',
		fontFamily: theme.textMain,
		textAlign: 'center'
	},
	alignEdit: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		borderWidth: 1,
		borderColor: theme.accentOne,
	},
	editCheck: {
		fontSize: 40,
		color: theme.accentOne
	},
	vertically: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	editItem: {
		fontSize: 15,
		color: theme.accentOne,
		fontFamily: theme.textTwo
	},
	addTaskContainer: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		margin: 10,
		justifyContent: 'space-evenly',
		flexDirection: 'column',
		width: '90%',
		borderRadius: 5,
		borderColor: theme.primary,
		borderWidth: 5,
		alignSelf: 'center'
	},
	label: {
		color: theme.primary,
		fontSize: 30,
		fontFamily: theme.textMain,
		margin: 10
	},
	priorityLevels: {
		flexDirection: 'row',
		width: '80%',
		margin: 5,
		alignSelf: 'center',
		backgroundColor: "gray",
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		shadowOpacity: 10
	},
	editItem: {
		fontSize: 20,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		margin: 10
	},
	editPriority: {
		fontSize: 20,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		textAlign: "center",
		width: 140
	},
	vertically: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	fonts: {
		color: "black",
		backgroundColor: "white",
		borderRadius: 0,
		margin: 0
	}
});

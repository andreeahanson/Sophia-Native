import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ClientProfile from "../ClientProfile/ClientProfile";
import ClientList from "../ClientList/ClientList";
import AddListForm from "../AddListForm/AddListForm";
import IndividualList from "../IndividualList/IndividualList";
import HeaderNav from "../HeaderNav/HeaderNav";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

class App extends Component {
  state = {
    profile: {
      id: 9999,
      name: "Sophia Apps",
      street_address: "13424 Sophia Dr",
      city: "Denver",
      state: "CO",
      zip: "80300",
      email: "sophia@sophia.com",
      phone: "7209993333",
      username: "sophie",
      allergies: ["gluten"],
      dietary_restrictions: [],
      medications: ["Med1", "Med2", "Med3"]
    },
    lists: [{ id: 1, name: "Groceries" }, { id: 2, name: "Laundry" }],
    items: [
      { id: 1000, list_id: 1, name: "Apples", notes: "Fuji, not Gala" },
      { id: 1001, list_id: 1, name: "Oranges", notes: "" },
      {
        id: 1002,
        list_id: 1,
        name: "Bananas",
        notes: "organic, no black spots"
      },
      { id: 1003, list_id: 2, name: "Whites", notes: "Use special detergent" },
      { id: 1004, list_id: 2, name: "Colors", notes: "Don't use bleach" }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
      <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile')} />
      <Button title="Lists" onPress={() => this.props.navigation.navigate('Lists', this.state.lists)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Profile: ClientProfile,
    Lists: ClientList
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);


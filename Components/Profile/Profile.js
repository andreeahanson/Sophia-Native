import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { PinchZoomView } from "react-native-pinch-zoom-view";
import { connect } from "react-redux";
import { fetchProfile } from '../../Utils/apiCalls';
import { PropTypes } from 'prop-types';
import theme from '../../theme';

export class Profile extends Component {
  state = {};

  componentDidMount = async () => {
    const profile = await fetchProfile(this.props.navigation.state.params)
    this.props.loadProfile(profile)
  }

  render() {
    // let client = this.props.navigation.state.params
    // console.log(client)
    // console.log('state', this.props.user)
    // let allMedications = client.medications.map(med => {
    //   return <Text style={styles.clientInfoList} key={Math.random()}>- {med}</Text>
    //  })
    // let allAllergies = client.allergies.map(allergy => {
    //   return <Text style={styles.clientInfoList} key={Math.random()}>- {allergy}</Text>
    // })
    // let allRestrictions = client.dietary_restrictions.map(restr => {
    //   return <Text style={styles.clientInfoList} key={Math.random()}>- {restr}</Text>
    // })
    return (
      <View>
        <View style={styles.headerCntainer}>
          <Text style={styles.header}>Client Profile</Text>
        </View>
        <ScrollView style={styles.profileContainer}>
          {/* <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap to navigate to your profile. From there, view your personal information"
            nextFocusDown="20"
            accessible={true}
            onPress={() => props.navigation.navigate("Profile", props.profile.profile)
            }
            style={styles.touchExpander}
          >
            <Text style={styles.button}>Log Out</Text>
          </TouchableHighlight>
        </View> */}
          {/* <Text style={styles.clientInfo}>Username: {client.username}</Text>
        <Text style={styles.clientInfo}>Name: {client.name}</Text>
        <Text style={styles.clientInfo}>Street Adress: {client.street_address}</Text>
        <Text style={styles.clientInfo}>City: {client.city}</Text>
        <Text style={styles.clientInfo}>State: {client.state}</Text>
        <Text style={styles.clientInfo}>Zip Code: {client.zip}</Text>
        <Text style={styles.clientInfo}>Email: {client.email}</Text>
        <Text style={styles.clientInfo}>Phone Number: {client.phone}</Text>
        <Text style={styles.clientInfo}>Needs: {client.needs}</Text>
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Allergies: </Text>
            {allAllergies}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Dietary Restrictions: </Text>
            {allRestrictions}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Medications:</Text>
           {allMedications}
        </View> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  loadProfile: profile => dispatch(loadProfile(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  profileContainer: {
    margin: 30
  },
  headerCntainer: {
    borderBottomColor:theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: theme.textMain
  },
  clientInfo: {
    fontSize: 20,
    fontFamily: theme.textMain,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:theme.primary,
    color: theme.accentOne,
    padding: 20
  },
  infoCntainer: {
    backgroundColor:theme.primary,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  clientInfoList: {
    fontSize: 20,
    fontFamily: theme.textMain,
    color: theme.accentOne,
  },
  button: {
    color: theme.accentOne,
    fontSize: 25,
    fontFamily: theme.textTwo,
    margin: 10,
    width: "100%",
  },
  touchExpander: {
    height: "100%",
    borderRadius: 30,
    width: "100%"
  }
});

Profile.propTypes = {
  userAccount: PropTypes.object,
};

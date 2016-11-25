import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet } from 'react-native';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'reducers';

import * as defaultStyles from 'styles';
import ExternalNavigationContainer from 'containers/ExternalNavigationContainer';
import { applicationSetup } from 'settings'
import codePush from "react-native-code-push";
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default class supermarketjs extends Component {
  constructor(props) {
    super(props);

    this.state = { initialing: true };
  }

  componentDidMount() {
    if (__DEV__) {
      applicationSetup().then(() => {
        this.setState({ initialing: false });
      });
    } else {
      codePush.checkForUpdate().then((update)=> {
        if (update) {
          codePush.allowRestart();
          codePush.sync();
        } else {
          this.setState({updating: false});
          applicationSetup().then(() => {
            this.setState({initialing: false});
          });
        }
      });
    }
  }

  render() {
    if(this.state.initialing) {
      return (
        <ActivityIndicator style={[defaultStyles.container, defaultStyles.centering]} animating={true} />
      );
    }

    return (
      <Provider store={store}>
        <ExternalNavigationContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('supermarketjs', () => codePush(supermarketjs));

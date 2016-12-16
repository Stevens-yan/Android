import React, { Component, PropTypes } from 'react';

import {
  WebView, Platform, NativeModules
} from 'react-native';
import * as defaultStyles from 'styles';
import { trackingScene } from './trackingPointGenerator';


let AndroidWebView;

if(Platform.OS == 'android') {
  AndroidWebView = require('components/shared/AndroidWebView');
}

export default function (config) {
  let { web, url, source } = config;
  url = web || url;
  source = source ? source : { uri: url };

  class InnerWebView extends Component {
    constructor(props) {
      super(props);

      let tracking = props.tracking || { key: web };
      this.tracking = Object.assign({}, tracking, { key: encodeURIComponent(tracking.key)});
    }

    render() {
      return !(Platform.OS == 'ios') ? this._renderAndroid() : this._renderIOS();
    }

    _renderAndroid() {
      return (
        <AndroidWebView startInLoadingState={true} style={defaultStyles.container} source={source}></AndroidWebView>
      );
    }

    _renderIOS() {
      return (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={source}></WebView>
      );
    }
  }

  return trackingScene(InnerWebView);
}

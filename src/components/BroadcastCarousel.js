import React, { PropTypes, Component } from 'react';
import {
  View,TouchableWithoutFeedback,Text, Image
} from 'react-native';

import CarouselGenerator from './high-order/CarouselGenerator';

import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

var configs = {
  horizontal: false,
  pagingEnabled: true,
  intervalTime: 2000,
  height: 13,
  scrollEnabled: false
};

class BroadcastCarousel extends Component {
    constructor(props) {
      super(props);
    }

    generateInfos() {
      var props = this.props, messageList = props ? props.msgList : [];

      this.msgItems = [];
      messageList.map((message, idx) => {
        this.msgItems.push(
          <TouchableWithoutFeedback key={idx}>
            <View style={{width:screenWidth, height:configs.height}}>
              <Text style={{width:screenWidth, height:configs.height, fontSize: 12}}>{message}</Text>
            </View>
          </TouchableWithoutFeedback>
          );
      });
    }

    render() {
      this.generateInfos();
      var Carousel = CarouselGenerator(configs)(this.msgItems);

      // return <Carousel height={130} />
      return (
        <View style={{height:28, paddingLeft:4, flexDirection: "row", alignItems:"center"}}>
          <Image style={{marginRight: 10}} source={require('assets/icons/laba.png')}></Image>
          <View style={{flex: 1}}><Carousel height={configs.height} /></View>
        </View>
      );
    }
}

module.exports = BroadcastCarousel;

import React, { PropTypes, Component } from 'react';
import {
  View,TouchableWithoutFeedback,Text, Image
} from 'react-native';

import CarouselGenerator from 'high-order/CarouselGenerator';
import TrackingPoint  from 'components/shared/TrackingPoint';

import { fontSize } from 'styles';
import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

var configs = {
  horizontal: false,
  pagingEnabled: true,
  intervalTime: 2000,
  height: 26,
  scrollEnabled: false
};

class BroadcastCarousel extends Component {
    constructor(props) {
      super(props);
    }

    generateInfos() {
      var props = this.props, messageList = props.msgList ? props.msgList : [];

      this.msgItems = [];
      messageList.map((message, idx) => {
        this.msgItems.push(
          <TrackingPoint key={idx} tracking={{ key: 'homepage', topic: 'brocast', entity: "" }}>
            <View style={[{flexDirection: "row", alignItems: "center", width:screenWidth, height:configs.height, padding:0}]}>
              <Text style={{width:screenWidth, fontSize: fontSize.xsmall, color:'#666666' }}>{message}</Text>
            </View>
          </TrackingPoint>
          );
      });
    }

    render() {
      this.generateInfos();
      var Carousel = CarouselGenerator(configs)(this.msgItems);

      // return <Carousel height={130} />
      return (
        <View style={{height:configs.height, paddingLeft:10, paddingRight: 10, flexDirection: "row", alignItems:"center", backgroundColor: "#F3F3F3"}}>
          <Image style={{marginRight: 10}} source={require('assets/icons/laba.png')}></Image>
          <View style={{flex: 1, height:configs.height}}><Carousel height={configs.height} /></View>
        </View>
      );
    }
}

module.exports = BroadcastCarousel;

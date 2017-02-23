import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Modal, TouchableOpacity, Dimensions, NativeModules } from 'react-native';

import Button from 'components/shared/ButtonBase';
import Input from 'components/shared/Input';
import ProcessingButton from 'components/shared/ProcessingButton';
import TrackingPoint  from 'components/shared/TrackingPoint';

import validators from 'utils/validators';
import { post, mock, responseStatus } from "utils/fetch";
import { fontSize, centering } from 'styles';

const {width, height} = Dimensions.get('window');

export default class addBankCard extends Component {
  tracking = "add_card";
  constructor(props) {
    super(props);

    this.state = {
      realname: "",
      idnum: "",
      mobile: "",
      cardnum: "",

      submitting: false,
      err: ""
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop : 10}}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>真实姓名</Text>
            <View style={{flex: 1, height: 20, justifyContent: "center"}}>
              <Input
                placeholder='请输入您的真实姓名'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                editable={!this.state.submitting}
                onChangeText={realname => this.setState({realname: realname})}
                tracking={{key: 'add_card', topic: 'name', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>身份证号</Text>
            <View style={{flex: 1, height: 20, justifyContent: "center"}}>
              <Input
                placeholder='请填写您的身份证号'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                editable={!this.state.submitting}
                onChangeText={idnum => this.setState({idnum: idnum})}
                maxLength={18}
                tracking={{key: 'add_card', topic: 'ID', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>银行卡号</Text>
            <View style={{flex : 1, height: 40, flexDirection: "row", alignItems: "center"}}>
              <View style={{flex: 1, height: 20, justifyContent: "center"}}>
              <Input
                type="number"
                placeholder='请填写本人银行卡号'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                editable={!this.state.submitting}
                value={this.state.cardnum}
                onChangeText={cardnum => this.setState({cardnum: cardnum})}
                tracking={{key: 'add_card', topic: 'card_num', entity: 'blur', event: 'blur'}}
              />
              </View>
            {false ? <Text style = {{fontSize : 12, color : '#666'}}>（招商银行）</Text> : null}
            </View>
            {true ? (
              <TrackingPoint
                tracking={{ key: 'add_card', topic: 'card_num', entity: 'clk', event: 'clk' }}
                onPress={() => this.__openCamera__()}>
                <Image source = {require('assets/discovery/icon_camera.png')} style = {{width :15, height : 14, marginRight : 20}}/>
              </TrackingPoint>
            ) : null}
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>手机号码</Text>
            <View style={{flex: 1, height: 20, justifyContent: "center"}}>
              <Input
                type="number"
                placeholder='请填写银行预留手机号码'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                editable={!this.state.submitting}
                onChangeText={mobile => this.setState({mobile: mobile})}
                maxLength={11}
                tracking={{key: 'add_card', topic: 'cell', entity: 'blur', event: 'blur'}}
              />
            </View>
          </View>
          <View style={{height: 14}}><Text style={styles.err}>{this.state.err ? this.state.err : " "}</Text></View>
          <View style={styles.btn}>
            <ProcessingButton
              style={styles.submitBtn}
              textStyle={styles.submitBtnText}
              processing={this.state.submitting}
              onPress={this.__submit__.bind(this)}
              text="确定"
              tracking={{key: 'add_card', topic: 'submit', event: 'clk'}}>
            </ProcessingButton>
          </View>
        </View>
        <View style = {[styles.bottom, {flex : 1}]}>
          <Text style = {styles.bottomTitle}>支持银行</Text>
          <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',marginBottom : 5}}>
            <Text style = {styles.bottomItem}>工商银行 |</Text>
            <Text style = {styles.bottomItem}> 中国银行 |</Text>
            <Text style = {styles.bottomItem}> 建设银行 |</Text>
            <Text style = {styles.bottomItem}> 邮政储蓄 |</Text>
            <Text style = {styles.bottomItem}> 中信银行</Text>
          </View>
          <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginBottom : 5}}>
            <Text style = {styles.bottomItem}>光大银行 |</Text>
            <Text style = {styles.bottomItem}> 华夏银行 |</Text>
            <Text style = {styles.bottomItem}> 招商银行 |</Text>
            <Text style = {styles.bottomItem}> 兴业储蓄 |</Text>
            <Text style = {styles.bottomItem}> 浦发银行</Text>
          </View>
          <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',marginBottom : 20}}>
           <Text style = {styles.bottomItem}>平安银行 |</Text>
           <Text style = {styles.bottomItem}> 广发银行 |</Text>
           <Text style = {styles.bottomItem}> 民生银行 |</Text>
           <Text style = {styles.bottomItem}> 农业储蓄 |</Text>
           <Text style = {styles.bottomItem}> 交通银行</Text>
          </View>
        </View>
      </View>
    )
  }

  _validation() {
    // let mobileValid = validators.mobile(this.state.mobile);
    if(!this.state.realname) {
      this.setState({err: '请输入姓名'});
      return false;
    }
    if(!this.state.idnum) {
      this.setState({err: '请输入身份证号码'});
      return false;
    }
    if(!this.state.cardnum) {
      this.setState({err: '请输入银行卡号'});
      return false;
    }

    if(!validators.mobile(this.state.mobile)) {
      this.setState({err: '请输入有效手机号'});
      return false
    }

    this.setState({err: ''});
    return true;
  }

  __submit__() {
    if(!this._validation()) return;

    this.setState({submitting: true})
    post("/payctcf/check-card", {cardnum: this.state.cardnum}).then(response => {
      if(response.res != responseStatus.success) {
        this.setState({submitting: false, err: response.msg});
        return;
      }
      var cardData = response.data, cardnum = this.state.cardnum;
      this.props.addBankCard && this.props.addBankCard(Object.assign({}, this.state, cardData, {
        name: this.state.realname,
        bankAccount: cardnum.substr(cardnum.length - 4, cardnum.length),
        mobileNo: this.state.mobile,
      }));
      this.props.externalPop && this.props.externalPop();
    });
  }

  __openCamera__() {
    var bankCardVerify = NativeModules.FaceMegModule['bankCardVerify'];
    bankCardVerify && bankCardVerify().then(res => {
      var cardnum = (res.value && res.value.replace(/\s/g, '')) || "";
      cardnum && this.setState({cardnum: cardnum});
    });
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#e6e6e6'
  },
  item : {
    paddingHorizontal : 20,
    marginTop : 10,
    flexDirection : 'row',
    backgroundColor : '#fff',
    height : 50,
    alignItems : 'center'
  },
  itemTitle : {
    width: 80,
    fontSize : fontSize.large,
    color : '#333'
  },
  itemInput : {
    fontSize : fontSize.large,
    flex : 1,
    textAlign : 'left',
    color : '#333'
  },
  btn : {
    paddingHorizontal : 25,
    marginBottom : 80,
    marginTop : 30
  },
  submitBtn: {
    marginTop: 10,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#FE271E',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
  bottom : {
    height : 120,
    marginBottom : 20,
  },
  bottomTitle : {
    fontSize : 17,
    color : '#FF6D17',
    marginBottom : 20,
    paddingLeft : 20,
  },
  bottomItem : {
    textAlign : 'center',
    fontSize : 14,
    color : '#333'
  },
  err : {
    marginVertical : 5,
    textAlign: "center",
    color : '#FF003C',
    fontSize : fontSize.small
  }

})

import React, { Component } from 'react';
import { View, Image ,StyleSheet,Text, TextInput, Modal, TouchableOpacity, Dimensions} from 'react-native';

import Button from 'components/shared/ButtonBase';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
//import Banner from 'containers/scene/home/Banner';
import validators from 'utils/validators';
import { fontSize } from 'styles';

import PayModal from './PayModal';

const {width, height } = Dimensions.get('window');

class blackListHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      ID : '',
      mobile : '',
      err : '',
      submitting : false,
      flags : false,
      payModalVisible: false
    }
  }
  render(){
    return(
      <View style={{flex : 1}}>
        <View style={styles.top}>
          {this._renderNavItem('当信息完整度超过70%，可免费查询一次',{toKey : 'CreditLoan', title : '信用贷'}, {status : this.props.creditScore >= 70 ? '立即查询' : '去完善'})}
          {this._renderNavItem('已有网贷征信报告',{toKey : 'Reports', title : '已有报告'},{status : false ? '去完善' : '立即查看'})}
        </View>
        <View style={styles.bottom}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>真实姓名</Text>
            <View style={{flex: 1, height: 30}}>
              <TextInput
                placeholder='请输入您的真实姓名'
                style={[styles.itemInput]}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                value={this.state.name}
                onChangeText={name => this.setState({name})}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>身份证号码</Text>
            <View style={{flex: 1, height: 30}}>
              <TextInput
                placeholder='请输入身份证号码'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                value={this.state.ID}
                onChangeText={ID => this.setState({ID})}
                maxLength={18}
              />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>手机号码</Text>
            <View style={{flex: 1, height: 30}}>
              <TextInput
                placeholder='请输入您的手机号码'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                onChangeText={mobile => this.setState({mobile})}
                value={this.state.mobile}
                maxLength={11}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems:"center", marginVertical: 10}}>
            <Text style={{paddingLeft: 10, fontSize: fontSize.xsmall, color: '#666'}}>
              我们提供付费代查网贷征信服务，查询费用
              <Text style={{color: '#FF6D17', fontSize: fontSize.xsmall}}>3元／次</Text>
            </Text>
          </View>
          <View style={{height: 14}}><Text style={{textAlign: "center", color : '#FF003C', fontSize : fontSize.small}}>{this.state.err ? this.state.err : " "}</Text></View>
          <View style={styles.btn}>
            <Button
              style={styles.submitBtn}
              onPress={() => {this._submit()}}>
              <Text style={styles.submitBtnText}>开始查询</Text>
            </Button>
          </View>
          <View style={{paddingLeft : 10}}>
            <Text style={styles.footerTitle}>网贷征信查询</Text>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>权威数据，查询网贷信用</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>申请网贷被拒，可能中了网贷征信黑名单，建议关注</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerCircle}>.</Text>
                <Text style={styles.footerTxt}>您的网贷信用情况</Text>
              </View>
          </View>
        </View>

        <View style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,height: this.state.payModalVisible ? null : 0, overflow: "hidden"}}>
          <PayModal close={() => this.setState({payModalVisible: false})} />
        </View>
      </View>
    )
  }

  _renderNavItem( txt, navProps, status) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize:14}]}>{txt}</Text>
          <View style={{flexDirection : 'row'}}>
            <Text style={{color : '#FF6D17'}}>{status.status}</Text>
            <NextIcon/>
          </View>
        </View>
      </ExternalPushLink>
    )
  }

  _validation() {
    if(!this.state.name) {
      this.setState({err: '请输入姓名'});
      return false;
    }

    if(!this.state.ID) {
      this.setState({err: '请输入身份证号码'});
      return false;
    }

    if(this.state.ID.length != 15 && this.state.ID.length != 18) {
      this.setState({err: '请输入有效身份证号码'});
      return false;
    }

    if(!validators.mobile(this.state.mobile)) {
      this.setState({err: '请输入有效手机号码'});
      return false;
    }

    this.setState({err: ''});
    return true;
  }

  _submit() {
    if(!this._validation()) {
      return null;
    }

    this.props.initialTarget && this.props.initialTarget({
      realname: this.state.name,
      idnum: this.state.ID,
      mobile: this.state.mobile
    });
    this.setState({ payModalVisible : true });
  }
}

const styles = StyleSheet.create({
  modalContainer : {
    flex : 1,
    backgroundColor : 'rgba(0,0,0,0.5)',
    justifyContent : 'center',
    alignItems : 'center'
  },
  modalSubContainer : {
    width : 160,
    height : 110,
    backgroundColor : '#fff',
    padding : 10
  },
  modalTitle : {
    textAlign : 'center',
    marginBottom : 10
  },
  modalBottom : {
    borderTopWidth : 1,
    borderTopColor : '#cecece',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 10
  },
  btn : {
    paddingHorizontal : 25,
    paddingBottom : 5,
    marginBottom : 80
  },
  color : {
    color : 'blue'
  },
  top : {
    marginBottom : 5
  },
  bottom : {
    backgroundColor : '#fff',
    flex : 1,
    // paddingHorizontal : 10,
    // paddingTop : 10
  },
  item : {
    paddingHorizontal : 10,
    flexDirection : 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
  },
  itemTitle : {
    fontSize : 16,
    color : '#333'
  },
  itemInput : {
    fontSize : 16,
    height : 25,
    flex : 1,
    textAlign : 'right',
    color : '#666'
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
  footer : {
    flexDirection : 'row',
    height : 20,
    alignItems : 'center',
    marginBottom : 5
  },
  footerTitle : {
    color : '#FF6D17',
    marginBottom : 10,

  },
  footerCircle : {
    fontSize : 30,
    lineHeight : 18,
    color : '#FF6D17',
    backgroundColor : 'transparent',
    marginRight : 3
  },
  footerTxt : {
    flex : 1,
    color : '#333'
  }
});

import { connect } from 'react-redux';
import { FreeStatus, BlackListReports, CardList, CreateBlackListTicket, InitalBlackListTarget } from 'actions/blackList';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return Object.assign({}, state.blackListData, {
    isFetching: state.blackListData.isFetchingReports
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(FreeStatus());
      dispatch(BlackListReports());
      dispatch(CardList());
    },
    checkFree: () => dispatch(FreeStatus()),
    // fetchCardList: () => dispatch(CardList()),
    createTicket: body => dispatch(CreateBlackListTicket(body)),
    initialTarget: targetInfo => dispatch(InitalBlackListTarget(targetInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, blackListHome));

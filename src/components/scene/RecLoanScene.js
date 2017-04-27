import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage, Image} from 'react-native';

import {post} from 'utils/fetch';
import {FormGroup, IptWrap} from "components/FormGroup";
import Button from 'components/shared/Button'

import VerifyButton from 'components/shared/VerifyButton';
import ProcessingButton from 'components/shared/ProcessingButton';

import {DeviceSwitchComponent, IOSComponentSwitcher} from 'high-order/ComponentSwitcher';
import tracker from 'utils/tracker.js';

import {rowContainer, centering} from 'styles';
import styles from 'styles/loan';
import {colors} from 'styles/varibles';
import {InputGroup, PickerGroup, CheckboxGroup, LocationGroup} from 'components/form';
import Picker from 'components/shared/Picker';
import LoanButton from 'containers/shared/LoanButton';

export default class RecLoanScene extends Component {
    static title = "推荐贷款";

    tracking() {
        return {key: 'loan', topic: this.state.hasLogin ? 'complete_info_rtn_L' : 'complete_info_new_L'};
    }


    constructor(props) {
        super(props);

        let userInfo = Object.assign({}, {
            job: 2, mobile_time: 3, credit_status: 1
        }, props.userInfo);

        console.log(props.userInfo);

        this.state = {
            hasLogin: !!userInfo.username,
            mobile: userInfo.mobile || userInfo.username || '',
            location: userInfo.location,
            job: userInfo.job,
            verify_code: '',
            realname: userInfo.realname || '',
            id_no: '',
            mobile_time: userInfo.mobile_time,
            credit_status: userInfo.credit_status,
            submitSuccess: this.props.submitSuccess,
            amount: props.loanInfo.amount || 5000,
            period: props.loanInfo.period || 12
        };
    }

    componentDidMount() {
        if (this.state.location) return;

        AsyncStorage.getItem("geoLocation").then(location=> {
            this.setState({location: location})
        })
    }

    loanValueChanged(name, value) {
        this.setState({[name]: value}, () => {

            this.props.setLoanInfo && this.props.setLoanInfo({
                amount: this.state.amount,
                period: this.state.period
            });
        });
    }

    formValueChanged(name, value) {
        this.setState({[name]: value});
    }

    render() {
        let {realname, amount, period, job, location, credit_status} = this.state;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{position: "relative"}}>
                    <View>
                        { this._renderLoanInfoGroup() }
                        <View style={{marginTop: 5}}>{ this._renderUserInfoGroup() }</View>
                        { this._renderLoginGroup() }
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity onPress={()=> {
                        this._goLoan();
                        tracker.trackAction(Object.assign({
                            entity: 'apply',
                            amount,
                            period,
                            realname,
                            city: location,
                            profession: job,
                            own_credit_card: credit_status
                        }, this.tracking()))
                    }}>
                        <LoanButton
                            processing={this.props.submitting}/>
                    </TouchableOpacity>
                </View>
            </View>
        );

    };

    _renderLoanInfoGroup() {
        return (
            <View>
                <Text style={recStyles.topText}>请输入您的贷款需求</Text>
                <View style={recStyles.topView}>
                    <View style={recStyles.topViewLeft}>
                        <Image style={{width: 60, height: 60}}
                               source={require('assets/form-icons/daikuantuiajinpage.png')}/>
                        <TextInput
                            style={{width: 150, textAlign: 'center', color: '#fe271e', fontSize: 30}}
                            keyboardType="numeric"
                            maxLength={6}
                            underlineColorAndroid="transparent"
                            value={this.state.amount.toString()}
                            onChangeText={(amount)=> {
                                this.setState({amount: amount})
                            }}/>
                        <Text style={{flex: 1}}>元</Text>
                    </View>
                    <View style={recStyles.topViewRight}>
                        <View style={recStyles.qixian}>
                            <Text
                                style={{textAlign: 'center', color: '#999999', fontSize: 16, marginRight: 2}}>期限</Text>
                            <Image source={require("assets/icons/triangle-down.png")}/>
                        </View>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Picker
                                value={this.state.period}
                                items={[1, 3, 9, 12, 15, 24, 36]}
                                onChange={this.loanValueChanged.bind(this, 'period')}
                                textStyle={{color: '#fe271e', fontSize: 16, paddingBottom: 5}}
                                textPeriod="个月"
                            />

                            {/*<Text style={{color:'#fe271e',fontSize:16}}>个月</Text>*/}
                        </View>

                    </View>
                </View>

            </View>
        );

    }


    _renderUserInfoGroup() {
        return (
            <View>
                <InputGroup
                    label="姓名"
                    maxLength={20}
                    icon={require('assets/form-icons/xingming.png')}
                    value={this.state.realname}
                    valueChanged={this.formValueChanged.bind(this, 'realname')}
                    style={{
                        input: {textAlign: "left"},
                        label: {width: 150, color: '#666666'},
                        icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }
                    }}
                />

                <PickerGroup
                    label="职业身份"
                    icon={require('assets/form-icons/zhiyeshenfen.png')}
                    value={this.state.job}
                    items={[{value: '1', label: "上班族"}, {value: '2', label: "学生"}, {
                        value: '3',
                        label: "企业主"
                    }, {value: '4', label: "自由职业"}]}
                    valueChanged={this.loanValueChanged.bind(this, 'job')}
                    textStyle={{paddingLeft: 8}}
                    style={{label: {width: 150, color: '#666666'},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                    withArrow={true}
                    arrow={require('assets/icons/arrow-down@2x.png')}
                />

                {!this.state.hasLogin ? null : <InputGroup
                    keyboardType="numeric"
                    maxLength={11}
                    label="手机号码"
                    icon={require('assets/form-icons/shoujihao.png')}
                    value={this.state.mobile}
                    valueChanged={this.formValueChanged.bind(this, 'mobile')}
                    style={{input: {textAlign: "left"}, label: {width: 150, color: '#666666'},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                /> }

                <PickerGroup
                    label="手机号码使用时间"
                    icon={require('assets/form-icons/shiyongshijian.png')}
                    value={this.state.mobile_time}
                    items={[{value: '1', label: "1个月"}, {value: '2', label: "2个月"}, {
                        value: '3',
                        label: "3个月"
                    }, {value: '4', label: "4个月"}, {value: '5', label: "5个月"}, {value: '6', label: "6个月及以上"}]}
                    valueChanged={this.loanValueChanged.bind(this, 'mobile_time')}
                    withArrow={true}
                    textStyle={{paddingLeft: 8}}
                    style={{label: {width: 150, color: '#666666'},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}

                />

                <CheckboxGroup
                    label="有信用卡"
                    icon={require('assets/form-icons/xingyongka.png')}
                    value={this.state.credit_status}
                    valueChanged={checked => this.formValueChanged('credit_status', checked ? 1 : 0)}
                    //style={{flexDirection:'row',justifyContent:'flex-end'}}
                    style={{label: {width: 150, color: '#666666'},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                    arrow={require('assets/icons/arrow-down@2x.png')}

                    //<Image style={{marginRight: 10, position:'absolute',right: 0,}} source={require('assets/icons/arrow-down@2x.png')}/>
                />

                <LocationGroup
                    label="所在城市"
                    icon={require('assets/form-icons/dizhi.png')}
                    value={this.state.location}
                    valueChanged={this.formValueChanged.bind(this, 'location')}
                    textStyle={{paddingLeft: 8, color: '#333333', fontSize: 16}}
                    style={{label: {width: 150, color: '#666666'},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                    arrow={require('assets/icons/arrow-down@2x.png')}
                />
            </View>
        );

    }

    _renderLoginGroup() {
        return this.state.hasLogin ? null : (
            <View style={{marginTop: 5}}>
                <InputGroup
                    maxLength={11}
                    keyboardType="numeric"
                    placeholder="请输入您的手机号码"
                    placeholderTextColor="#c8c8c8"
                    value={this.state.mobile}
                    style={{input: {textAlign: 'left', paddingLeft: 0},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                    icon={require('assets/form-icons/qingshurushoujihao.png')}
                    valueChanged={this.formValueChanged.bind(this, 'mobile')}
                >

                    <VerifyButton
                        tracking={Object.assign({entity: 'mob_code_button'}, this.tracking())}
                        mobile={this.state.mobile}/>
                </InputGroup>

                <InputGroup
                    maxLength={6}
                    placeholder={'请输入验证码'}
                    placeholderTextColor="#c8c8c8"
                    value={this.state.verify_code}
                    style={{input: {textAlign: 'left', paddingLeft: 0},icon: {marginRight: 5, width: 16, height: 16},
                        wrap: {
                            backgroundColor: '#fff',
                            height: 40,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.line
                        }}}
                    icon={require('assets/form-icons/qingshuruyanzhengma.png')}
                    valueChanged={this.formValueChanged.bind(this, 'verify_code')}
                />
            </View>
        );
    }

    _goLoan() {
        let {realname, verify_code, mobile, location, job, id_no, mobile_time, credit_status, amount, period} = this.state;

        this.props.goLoan && this.props.goLoan({
            realname, verify_code, mobile, location, job, id_no, mobile_time, credit_status, amount, period
        });
    }

}

const recStyles = StyleSheet.create({
    formRow: {
        height: 47, backgroundColor: "#fff", borderBottomColor: colors.line, borderBottomWidth: 1
    },
    topText: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 14,
        color: '#666666',
        backgroundColor: '#FFFFFF',
        fontFamily: 'PingFangSC-Light'
    },
    topView: {
        flex: 1,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    topViewLeft: {
        flex: 3,
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#F3F3F3',
        borderWidth: 1,
        marginLeft: 10

    },
    topViewRight: {
        flex: 1,
        height: 60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F3F3F3',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 10
    },
    qixian: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

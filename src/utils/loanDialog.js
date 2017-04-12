import { connect } from 'react-redux';import React, { Component } from 'react';import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, AsyncStorage,TouchableHighlight } from 'react-native';import VerifyButton from 'components/shared/VerifyButton'import ProcessingButton from 'components/shared/ProcessingButton'import { post, responseStatus } from 'utils/fetch';import validators from 'utils/validators';import { colors } from 'styles/varibles'import Checkbox from 'components/shared/Checkbox';import { ExternalPushLink } from 'containers/shared/Link';import fetchingUser from 'actions/loginUser';import { trackingScene } from 'high-order/trackingPointGenerator';const { width,height} = Dimensions.get('window');class loanDialog extends Component {    constructor(props) {        super(props);        this.state = {            checkedAgreement: true,            submitting: false,            //modalVisible:this.props.modalVisible,            modalVisible: this.props.modalVisible,            approveAmount: ''        }    }    _setModalVisible(visible) {        this.setState({modalVisible: visible});    }    render() {        return (            <Modal                animationType={"fade"}                transparent={true}                visible={this.state.modalVisible}                style={styles.overlay}                //关闭时调用                onRequestClose={() => {this._setModalVisible(false)}}            >                { /*<TouchableOpacity style={styles.overlay} onPress={ () => this.props.onHide()}/>*/}                { <TouchableOpacity style={styles.overlay}/>}                <View style={styles.box}>                    <Image style={styles.image} source={require('assets/icons/loan_status.gif')}/>                    <Text style={styles.title}>恭喜您</Text>                    <Text                        style={styles.text}>{'恭喜!您的资信状况实在是超乎想象的好,最终竟然批了'}<Text                        style={styles.amountStyle}>{this.props.approveAmount}</Text>{'元额度!'}</Text>                    <View style={styles.txtAlertKnow}>                        <TouchableOpacity                            onPress={() => this.cancelDialog()}                        >                            <View style={styles.txtRow}>                                <Text style={{color:'#FF003C' ,fontSize: 14,}}>我知道啦</Text>                            </View>                        </TouchableOpacity>                    </View>                </View>            </Modal>        )    }    cancelDialog() {        this.setState({            modalVisible: false        })    }}//function mapDispatchToProps(dispatch) {//    return {}//}////export default connect(null, mapDispatchToProps)(trackingScene(loanDialog));export default loanDialog;const styles = StyleSheet.create({    box: {        width: 304,        height: 312,        paddingHorizontal: 20,        paddingBottom: 40,        backgroundColor: '#fff',        marginTop: (height - 312) / 2,        marginLeft: (width - 304) / 2,        borderRadius: 8,    },    text: {        marginTop: 5,        marginBottom: 15,        marginLeft: 10,        marginRight: 10,        fontSize: 16,        color: '#333333',    },    overlay: {        position: 'absolute',        top: 0,        left: 0,        bottom: 0,        right: 0,        backgroundColor: 'rgba(0,0,0,0.5)'    },    title: {        marginVertical: 25,        textAlign: 'center',        color: '#FF003C',        fontSize: 23,    },    submitBtn: {        marginTop: 50,        height: 46,        backgroundColor: '#fff',        borderColor: colors.secondary,        borderWidth: 1,        borderRadius: 8    },    submitBtnText: {        fontSize: 18,        color: colors.secondary    },    txtRow: {        flexDirection: 'row',        justifyContent: 'center',        alignItems: 'center',        height: 35,        width: 181,        borderRadius: 15,        borderStyle: 'solid',        borderColor: 'red',        borderWidth: 1    },    txtAlertKnow: {        flexDirection: 'row',        justifyContent: 'center',        alignItems: 'center',    },    btnTxt: {        color: '#fff',        fontSize: 16,        backgroundColor: 'transparent',    },    image: {        position: 'relative',        width: 242,        height: 120,    },    amountStyle: {        fontSize: 16,        color: '#FF003C',    }});
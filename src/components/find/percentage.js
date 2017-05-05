
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
    circle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
    },
    leftWrap: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        // backgroundColor: 'white',
    },
    rightWrap: {
        position: 'absolute',

    },

    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        borderRadius: 1000,

    },

    innerCircle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 11,
        color: '#888',
        marginTop:-20,
    },
});

export default class PercentageCircle extends Component {
    propTypes: {
        color: React.PropTypes.string,
        bgcolor: React.PropTypes.string,
        innerColor: React.PropTypes.string,
        radius: React.PropTypes.number,
        percent: React.PropTypes.number,
        borderWidth: React.Proptypes.number,
        textStyle: React.Proptypes.array,
        disabled: React.PropTypes.bool,
    }


    constructor(props) {
        super(props);

        let percent = this.props.percent;
        let leftTransformerDegree = '0deg';
        let rightTransformerDegree = '0deg';
        if (percent >= 50) {
            rightTransformerDegree = '180deg';
            leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
        } else {
            rightTransformerDegree = '0deg';
            leftTransformerDegree = percent * 3.6 + 'deg';
        }

        this.state = {
            percent: this.props.percent,
            borderWidth: this.props.borderWidth < 2 || !this.props.borderWidth ? 2 : this.props.borderWidth,
            leftTransformerDegree: leftTransformerDegree,
            rightTransformerDegree: rightTransformerDegree,
            textStyle: this.props.textStyle ? this.props.textStyle : null
        };
    }

    componentWillReceiveProps(nextProps) {
        let percent = nextProps.percent;
        let leftTransformerDegree = '0deg';
        let rightTransformerDegree = '0deg';
        if (percent >= 50) {
            rightTransformerDegree = '180deg';
            leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
        } else {
            rightTransformerDegree = '0deg';
            leftTransformerDegree = percent * 3.6 + 'deg';
        }
        this.setState({
            percent: this.props.percent,
            borderWidth: this.props.borderWidth < 2 || !this.props.borderWidth ? 2 : this.props.borderWidth,
            leftTransformerDegree: leftTransformerDegree,
            rightTransformerDegree: rightTransformerDegree
        });
    }

    render() {
      var percent = this.props.percent;
        if (this.props.disabled) {
            return (
                <View style={[styles.circle,{
                    width:this.props.radius*2,
                    height: this.props.radius*2,
                    borderRadius:this.props.radius
                }]}>
                    <Text style={styles.text}>{this.props.disabledText}</Text>
                </View>
            );
        }
        //                transform:[{rotate:"-118.3deg"}],
        return (
            <View style={[styles.circle,{
                width:this.props.radius*2,
                height: this.props.radius*2,
                borderRadius:this.props.radius,
                backgroundColor: this.props.bgcolor,
                transform:[{rotate:"-118.3deg"}],
            }]}>
                <View style={[styles.leftWrap,{
                    width: this.props.radius,
                    height: this.props.radius * 2,
                    left:0,
                }]}>
                    <View style={[styles.loader,{
                        left: this.props.radius,
                        width:this.props.radius,
                        height: this.props.radius*2,
                        borderTopLeftRadius:0,
                        borderBottomLeftRadius:0,
                        backgroundColor:"#e6e6e6",
                        transform:[{translateX:-this.props.radius/2},{rotate:"56.6deg"},{translateX:this.props.radius/2}],
                    }]}></View>
                </View>
                <View style={[styles.leftWrap,{
                    left:this.props.radius,
                    width: this.props.radius,
                    height: this.props.radius * 2,
                }]}>
                    <View style={[styles.loader,{
                        left:-this.props.radius,
                        width:this.props.radius,
                        height: this.props.radius*2,
                        borderTopRightRadius:0,
                        borderBottomRightRadius:0,
                        backgroundColor: "#e6e6e6",
                        transform:[{translateX:this.props.radius/2},{rotate:"180deg"},{translateX:-this.props.radius/2}],
                    }]}></View>
                </View>


                { percent >= 50 ? <View style={[styles.leftWrap,{
                    width: this.props.radius,
                    height: this.props.radius * 2,
                    left:0,
                }]}>
                    <View style={[styles.loader,{
                        left: this.props.radius,
                        width:this.props.radius,
                        height: this.props.radius*2,
                        borderTopLeftRadius:0,
                        borderBottomLeftRadius:0,
                        backgroundColor:this.props.color,
                        transform:[{translateX:-this.props.radius/2},{rotate:this.state.leftTransformerDegree},{translateX:this.props.radius/2}],
                    }]}></View>
                </View> : null}
                <View style={[styles.leftWrap,{
                    left:this.props.radius,
                    width: this.props.radius,
                    height: this.props.radius * 2,
                }]}>
                    <View style={[styles.loader,{
                        left:-this.props.radius,
                        width:this.props.radius,
                        height: this.props.radius*2,
                        borderTopRightRadius:0,
                        borderBottomRightRadius:0,
                        backgroundColor: this.props.color,
                        transform:[{translateX:this.props.radius/2},{rotate:percent >= 50 ? this.state.rightTransformerDegree : this.state.leftTransformerDegree},{translateX:-this.props.radius/2}],
                    }]}></View>
                </View>

                {percent < 50 ? <View style={[styles.leftWrap,{
                    width: this.props.radius,
                    height: this.props.radius,
                    left:0,
                    backgroundColor: "#fff"
                }]}>
                    <View style={[styles.loader,{
                        left: this.props.radius,
                        width:this.props.radius,
                        height: this.props.radius*2,
                        borderTopLeftRadius:0,
                        borderBottomLeftRadius:0,
                        backgroundColor:"white",
                        transform:[{translateX:-this.props.radius/2},{rotate:"-123.4deg"},{translateX:this.props.radius/2}],
                    }]}></View>
                </View> : null}

                <View style={[styles.innerCircle,{
                    width:(this.props.radius - this.state.borderWidth)*2,
                    height:(this.props.radius - this.state.borderWidth)*2,
                    borderRadius:this.props.radius - this.state.borderWidth,
                    backgroundColor: this.props.innerColor,
                }]}>
                </View>

            </View>
        );
    }
}

// set some attributes default value
PercentageCircle.defaultProps = {
    bgcolor: 'transparent',
    innerColor: '#fff'
};

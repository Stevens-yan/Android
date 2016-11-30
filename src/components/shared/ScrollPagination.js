import React, { PureComponent, PropTypes  } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Text from 'components/shared/Text';
import Loading from 'components/shared/Loading';
import * as defaultStyles from 'styles';

export default class ScrollPagination extends PureComponent {
  static propTypes = {
    nomore: PropTypes.bool,
    isPaging: PropTypes.bool.isRequired,
    pagination: PropTypes.func.isRequired,
    paginationParams: PropTypes.any,
    scrollEventThrottle: PropTypes.number,
    prePaginationOffset: PropTypes.number
  }

  static defaultProps = {
    scrollEventThrottle: 200,
    prePaginationOffset: 100
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isPaging && !this.props.isPaging) {
      // 延迟执行，防止ios短时间重复加载
      setTimeout(() => {
        this.paging = false;
      }, 500);
    }
  }

  render() {
    let { children, throttle, ...props } = this.props;

    return (
      <ScrollView
        {...props}
        onLayout={this._onLayout.bind(this)}
        onScroll={this._onScroll.bind(this)}
        >
        {children}

        {this._renderPaging()}
        {this._renderNomore()}
      </ScrollView>
    );
  }

  _renderPaging() {
    if(!this.props.isPaging) { return null; }

    return (
      <View style={styles.footer}>
        <Loading/>
      </View>
    );
  }

  _renderNomore() {
    if(!this.props.nomore) { return null; }

    return (
      <View style={styles.footer}><Text>无更多数据</Text></View>
    );
  }

  _onLayout(e) {
    this.viewHeight = e.nativeEvent.layout.height;
  }

  _onScroll(e) {
    let event = e.nativeEvent;
    if(this.paging || this.props.nomore) { return }

    if(event.contentOffset.y + this.viewHeight >= event.contentSize.height - this.props.prePaginationOffset) {
      this._pagination();
    }
  }

  _pagination() {
    if(this.paging) { return; }

    this.paging = true;

    this.props.pagination(this.props.paginationParams);
  }
}

const styles = StyleSheet.create({
  footer: {
    marginBottom: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

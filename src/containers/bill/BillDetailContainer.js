import React, { Component } from 'react';
import {
  View, Text, Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { get, responseStatus } from 'utils/fetch';
import Loading from 'components/shared/Loading';

export default class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.billId = props ? props.billId : null;
    this.bankName = props ? props.bankName : null;
    this.bankLogo = props ? props.bankLogo : null;
    this.userName = props ? props.userName : null;
    this.userCardNo = props ? props.userCardNo : null;
    this.state = {
      fetched: false,
      billData: null,
      error : null
    }
  }

  componentDidMount() {
    var p = this.props, type = p.type || "bank_wap", id = p.billId;
    get(`/bill/bill-detail?type=${type}&id=${id}`).then(rsp => {
      // console.log(rsp);
      if(rsp.res != responseStatus.success) {
        this.setState({ fetched: true, error: "出错" });
        return;
      };
      this.setState({ fetched: true, error: null, billData: rsp.data });
    });
  }

  renderCardHeader(card) {
    var bill = this.state.billData ? this.state.billData.data : null ;
    if(!bill) return null;
    var sF = function(a, b) { return a["bill_month"] > b["bill_month"] };
    var bills = card.bills && card.bills.length > 0 ?
      card.bills.sort(sF) : null;
      // console.log(bills);
    if(!bills) return null;

    var bankName = bill.bank_name || this.bankName,
      userName = bill.person_name || this.userName,
      userCardNo = bill.id_no || this.userCardNo,

      lastestBill = bills[0], billByUnit = lastestBill.bill_by_unit,
      rmbBill = billByUnit && billByUnit.length > 0 ? billByUnit.find(b => b.due_unit == "rmb") : null;

    var billAmount = rmbBill ? rmbBill.due_amount : null;


    return (
      <View>
        <BillHeader bankLogo={this.bankLogo} bankName={bankName} userName={userName} userCardNo={userCardNo} billAmount={billAmount} />
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 5, paddingVertical: 4, borderTopWidth: 1, borderTopColor: "#f2f2f2", backgroundColor: "white"}}>
          <View style={{flex: 1,  alignItems: "center", borderRightWidth: 1, borderRightColor: "#f2f2f2"}}>
            <Text style={{fontSize: 16, color: "#333"}}>{lastestBill.billing_date.split(" ")[0]}</Text>
            <Text style={{color: "#666",marginTop: 6}}>出账日期</Text>
          </View>
          <View style={{flex: 1, paddingVertical: 10, alignItems: "center"}}>
            <Text style={{fontSize: 16, color: "#333"}}>{lastestBill.cash_limit}</Text>
            <Text style={{color: "#666",marginTop: 6}}>可用额度</Text>
          </View>
        </View>
      </View>
    );

  }

  renderBillList(card) {
    var bills = card.bills && card.bills.length > 0 ?
      card.bills.sort((b1, b2) => {return (b1.bill_month < b2.bill_month)} ) : null;
    //console.log(bills.sort((b1, b2) => { console.log(b1.bill_month, b2.bill_month, b1.bill_month < b2.bill_month); return  b1.bill_month < b2.bill_month}))
    if(!bills) return null;

    return (
      <View>
      {
        bills && bills.length > 0 && bills.map((bill, idx) => {
          return (<View key={idx}>
            <Text>{bill.bill_month.split("-")[0]}</Text>
            <Text>{bill.bill_month.split("-")[1]}</Text>
          </View>)
        })
      }
      </View>
    );
  }

  renderBillDetail() {
    var cards = this.state.billData.data.cards;

    return cards && cards.length > 0 && cards.map((card, idx) => {
      return (
        <View key={idx}>
          { this.renderCardHeader(card) }
          { this.renderBillList(card) }
        </View>
      );
    })
  }

  render() {
    var s = this.state;
    return !this.state.fetched ? <Loading></Loading> : (
      <View>
        { this.renderBillDetail() }
      </View>
    );
  }
}

function BillHeader({ bankLogo, bankName, userName, userCardNo, billAmount }) {
  return (
    <View style={{flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "white"}}>
      <Image source={{uri: bankLogo}} style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}></Image>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <View><Text style={{fontSize: 20, color: "#333"}}>{bankName} {userName}</Text></View>
        <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}><Text style={{color: "#666"}}>尾号{userCardNo}</Text></View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View><Text style={{fontSize: 20, color: "#333", textAlign: "right"}}>{billAmount ? billAmount : ""}</Text></View>
        <View style={{flexDirection: "row", marginTop: 10, flex: 1}}><Text style={{textAlign: "right", flex: 1, color: "#666"}}>本期账单</Text></View>
      </View>
    </View>
  );
}

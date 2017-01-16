import { post, get, responseStatus } from 'utils/fetch';

import getBillList from './billList';
import banks from './banks';

export function bankBillList(body) {
  return (dispatch, getState) => {
    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    if(!state.online.banks.fetched) dispatch(banks());
    dispatch({type: "bankBillFetchStart"});
    return getBillList(Object.assign({loan_type: loanType, type: 'bank_wap'}, body)).then(response => {
      if(response.res == responseStatus.success) {
        var billList = response.data || [];
        dispatch({ type: "receiveOnlineBankBilllList", billList: billList });

        // 仅判断最后一条数据，正在进行中不让用户重复提交。
        const lastestBill = billList[0];

        //账单状态：1=已提交登陆信息，2=登陆失败，3=登陆成功，4=登陆成功，等待二次登陆，5=已提交二次登陆信息，6=二次登陆失败，7=二次登陆成功，等待数据，8=数据获取成功，9=数据获取失败
        if(!lastestBill || [1, 3, 4, 5].includes(+lastestBill.status)) {
          return dispatch(none());
        }

        if([8].includes(+lastestBill.status)) {
          return dispatch(success());
        }

        if([2,4,6,9].includes(+lastestBill.status)) {
          return dispatch(failure());
        }

        return dispatch(progressing());
      }
    })
  }
}

export default function(body) {

  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineBankResult'});

    var state = getState(), loanType = state.online.loanType ? state.online.loanType.type : null;

    if(loanType == 0 || loanType == 9999) return dispatch(bankBillList(body));
    return checkBillFilter(loanType).then(res => {
      if(res) {
        return dispatch(res);
      }
      return dispatch(bankBillList(body));
    })
  }
}

function checkBillFilter(loan_type) {

  return post('/loanctcf/check-bill-filter', { loan_type }).then(response => {
    if(response.res == responseStatus.failure) {
      throw response.msg;
    }

    const res = response.data.find(res => res.data_type == 'bank_wap') || {};

    if(res.status == 3 && res.is_expire == 1) {
      return expire();
    }

    switch(+res.status) {
      case 3:
        return success();
      case 2:
        return failure();
      case 1:
        return progressing();
    }
  })
}

function expire() {
  return { type: 'receiveOnlineBankResult', status: 'expire' }
}

function none() {
  return { type: 'receiveOnlineBankResult', status: 'none' }
}

function success() {
  return { type: 'receiveOnlineBankResult', status: 'success' }
}

function failure() {
  return { type: 'receiveOnlineBankResult', status: 'failure' }
}

function progressing() {
  return { type: 'receiveOnlineBankResult', status: 'progressing' }
}

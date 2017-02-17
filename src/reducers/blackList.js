const initState = {
  isFetchingFree: true,
  free: false,

  isFetchingReports: true,
  reports: null,

  isFetchingCardList: true,
  cardListFetched: false,
  cardList: [],
  selectedCard: null,

  target: null,
  isFetchingTicket: false,
  ticket: null,
  paymentStart: false,
  paymentSended: false,
  paymentCodeSubmiting: false,
  paymentEnd: false,
  paymentSuccess: false,

  isFetchingResult: false,
  result: null,

  error: null,
  stateMsg: ""
}

export default function(state = initState, action) {
  switch(action.type) {
    case "RequestFreeStatus":
      return Object.assign({}, state, { isFetchingFree: true });
    case "ReceiveFreeStatus":
      return Object.assign({}, state, { isFetchingFree: false, free: action.free })

    case "RequestBlackListReports":
      return Object.assign({}, state, { isFetchingReports: true });
    case "ReceiveBlackListReports":
      return Object.assign({}, state, { isFetchingReports: false, reports: action.reports });

    case "InitalBlackListTarget":
      return Object.assign({}, state, { target: action.target });

    case "RequestBlackListTicket":
      var newState = Object.assign({}, state, { isFetchingTicket: true, stateMsg: "正在创建账单" });
      newState.ticket = null;
      return newState;
    case "ReceiveBlackListTicket":
      return Object.assign({}, state, { ticket: action.ticket, isFetchingTicket: false });

    case "PaymentStart":
      return Object.assign({}, state, { paymentStart: true, paymentSended: false, paymentEnd: false, stateMsg: "正在发送验证码", paymentSuccess: false, error: null });
    case "PaymentSended":
      return action.success ?
        Object.assign({}, state, { paymentStart: false, paymentSended: true, paymentEnd: false, stateMsg: "验证码已发送" }) :
        Object.assign({}, state, { paymentStart: false, paymentSended: false, paymentEnd: false, error: "账单创建失败，请重新提交支付" });
    case "PaymentConfirmStart":
      return Object.assign({}, state, { paymentCodeSubmiting: true });
    case "PaymentEnd":
      return Object.assign({}, state, {
        paymentStart: false, paymentCodeSubmiting: false, paymentEnd: true,
        stateMsg: action.success ? "支付完成" : "支付失败",
        error: action.success ? null : "验证码错误，请重新输入",
        paymentSuccess: action.success
      });
    case "ClearPaymentInfo":
      return Object.assign({}, state, {
        ticket: null,
        paymentStart: false, paymentSended: false, paymentEnd: false, paymentSuccess: false, stateMsg: null, error: null
      });

    case "RequestReportResult":
      var newState = Object.assign({}, state, { isFetchingResult: true });
      newState.result = null;
      return newState;
    case "ReceiveReportResult":
      var newState = Object.assign({}, state, { isFetchingResult: false });
      newState.result = action.result;
      return newState;

    case "RequestCardList":
      return Object.assign({}, state, { isFetchingCardList: true, cardListFetched: false });
    case "ReceiveCardList":
      return Object.assign({}, state, { isFetchingCardList: false, cardListFetched: true, cardList: action.list });
    case "AddCard":
      var cardList = state.cardList || [], newState = Object.assign({}, state);
      cardList = [action.card].concat(cardList);
      newState.cardList = cardList;
      return newState;
    case "SelectCard":
      var newState = Object.assign({}, state);
      newState.selectedCard = action.selectedCard;
      return newState;
    default:
      return state;
  }
}

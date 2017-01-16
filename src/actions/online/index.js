import status from './status';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';
import userInfo from './userInfo';
import pickers from './pickers';
import bankResult, { bankBillList } from './bankResult';
import yysResult, { yysBillList } from './yysResult';
import yysForms from './yysForms';
import preloanStatus from './preloanStatus';
import preloan from './preloan';
import applyResult from './applyResult';
import contractBanks from './contractBanks';
import loanDetail from './loanDetail';

export default {
  loanDetail,
  contractBanks,
  applyResult,
  status,
  banks,
  preloan,
  preloanStatus,
  bankDetail,
  submitCreditCard,
  userInfo,
  pickers,
  bankResult,
  bankBillList,
  yysResult,
  yysBillList,
  yysForms,
  setLoanType: function(loanType) {
    return { type: "SetLoanType", value: loanType };
  }
}

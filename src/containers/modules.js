const modules = {};

import MajorNavigationContainer from './MajorNavigationContainer';
import HomeScene from './scene/HomeSceneContainer';
import FastLoanScene from './scene/FastLoanSceneContainer';
import RecLoanScene from './scene/RecLoanSceneContainer';
import CardScene from './scene/CardSceneContainer';
import ZoneScene from 'containers/scene/ZoneSceneContainer';
import Login from 'containers/Login';
import LoanDetailScene from 'containers/scene/LoanDetailContainer';
import FillUserInfo from 'containers/FillUserInfo';
import ActHotListScene from 'containers/scene/card/ActHotListContainer';
import ActHotDetailScene from 'containers/scene/card/ActHotDetailContainer';
import MessagesScene from 'containers/scene/MessagesScene';
import CardListScene from 'containers/scene/card/CardListContainer'
import ContactScene from 'containers/scene/zone/ContactSceneContainer';
import SettingScene from 'containers/scene/zone/SettingSceneContainer';
import BankCardListScene from 'containers/scene/card/BankCardListContainer';
import UserInfo from 'containers/scene/zone/UserInfo';
import CardListByCategory from 'containers/scene/card/CardListByCategory';
import CardProcessList from 'containers/scene/card/CardProcessList';
import CardArticals from 'containers/scene/CardArticals';
import CardArticalDetail from 'containers/scene/CardArticalDetail';
import CertificationHome from 'containers/online/CertificationHome';
import OnlineUserInfo from 'containers/online/UserInfo';
import OnlineCreditCards from 'containers/online/CreditCards';
import OnlineCreditCardForm from 'containers/online/CreditCardForm';
import OnlineCreditCardVerify from 'containers/online/CreditCardVerify';
import OnlineCreditCardStatus from 'containers/online/CreditCardStatus';

[
  { key: 'MajorNavigation', module: MajorNavigationContainer },
  { key: 'HomeScene', module: HomeScene },
  { key: 'OnlineCreditCards', module: OnlineCreditCards },
  { key: 'CertificationHome', module: CertificationHome },
  { key: 'OnlineUserInfo', module: OnlineUserInfo },
  { key: 'OnlineCreditCardForm', module: OnlineCreditCardForm },
  { key: 'OnlineCreditCardVerify', module: OnlineCreditCardVerify },
  { key: 'OnlineCreditCardStatus', module: OnlineCreditCardStatus },
  { key: 'CardArticals', module: CardArticals },
  { key: 'CardArticalDetail', module: CardArticalDetail },
  { key: 'CardListByCategory', module: CardListByCategory },
  { key: 'CardProcessList', module: CardProcessList },
  { key: 'SettingScene', module: SettingScene },
  { key: 'ContactScene', module: ContactScene },
  { key: 'MessagesScene', module: MessagesScene},
  { key: 'LoanScene', module: FastLoanScene },
  { key: 'RecLoanScene', module: RecLoanScene },
  { key: 'CardScene', module: CardScene },
  { key: 'ZoneScene', module: ZoneScene },
  { key: 'LoanDetailScene', module: LoanDetailScene },
  { key: 'FillUserInfo', module: FillUserInfo },
  { key: 'ActHotListScene', module: ActHotListScene },
  { key: 'ActHotDetailScene', module: ActHotDetailScene },
  { key: 'CardListScene', module: CardListScene },
  { key: 'BankCardListScene', module: BankCardListScene },
  { key: 'Login', module: Login },
  { key: 'UserInfo', module: UserInfo }
].forEach(item => {
  modules[item.key] = item.module;
});

export default modules;

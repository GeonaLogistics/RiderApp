import { createStackNavigator, createAppContainer } from "react-navigation";
import Slider from "../Screen/Slider/index";
import Welcome from "../Screen/Welcome/index";
import SignUp from "../Screen/SignUp/index";
import OTP from "../Screen/OTP/index";
import Home from "../Screen/Home/index";
import HomeUp from "../Screen/HomeUp/index";
import Model from "../Component/Model/index";
import HomeLetsGo from "../Screen/HomeLetsGo/index";
import BookingReq from "../Screen/BookingReq/index";
import Orders from "../Screen/Orders/index";
import OrderSummary from "../Screen/OrderSummary/index";
import Recipient from "../Screen/Recipient/index";
import SignIn from "../Screen/SignIn/index";
import BookingReqUp from "../Screen/BookingReqUp/index";
import Promocode from "../Screen/Promocode/index";
import Payment from "../Screen/Payment/index";
import RideReqConfirm from "../Screen/RideReqConfirm/index";
import SideMenu from "../Screen/SideMenu/index";
import MyWallet from "../Screen/MyWallet/index";
import History from "../Screen/History";
import Notification from "../Screen/Notification/index";
import InviteFriends from "../Screen/InviteFriends/index";
import Settings from "../Screen/Settings/index";
import Logout from "../Screen/Logout/index";
import RideReqCancel from "../Screen/RideReqCancel/index";
import HistoryList from "../Component/HistoryList/indx";
import Chat from "../Screen/Chat/index";
import Rating from "../Screen/Rating/index";
import Tips from "../Screen/Tips/index";

import MyAccount from '../Screen/MyAccount/index';
import PickUp from '../Screen/PickUp/index';
import WalletPayment from '../Screen/WalletPayment/index';
import findrider from '../Screen/findrider/index';
import delivery from '../Screen/delivery/index';
import Unassigned from '../Screen/Unassigned/index';
import Biodata from '../Screen/Biodata/index';
import AOTP from '../Screen/AOTP/index';
import Cpassword from '../Screen/Cpassword/index';

const AppNavigator = createStackNavigator(
  {
    Slider: {
      screen: Slider,
      navigationOptions: {
        header: null
      }
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null
      }
    },
    OTP: {
      screen: OTP,
      navigationOptions: {
        header: null
      }
    },

    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    HomeUp: {
      screen: HomeUp,
      navigationOptions: {
        header: null
      }
    },
    Model: {
      screen: Model,
      navigationOptions: {
        header: null
      }
    },
    PickUp: {
      screen: PickUp,
      navigationOptions: {
        header: null
      }
    },
    HomeLetsGo: {
      screen: HomeLetsGo,
      navigationOptions: {
        header: null
      }
    },
    Orders: {
      screen: Orders,
      navigationOptions: {
        header: null
      }
    },
    OrderSummary: {
      screen: OrderSummary,
      navigationOptions: {
        header: null
      }
    },
    findrider: {
      screen: findrider,
      navigationOptions: {
        header: null
      }
    },
    delivery: {
      screen: delivery,
      navigationOptions: {
        header: null
      }
    },
    WalletPayment: {
      screen: WalletPayment,
      navigationOptions: {
        header: null
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header: null
      }
    },
    Recipient: {
      screen: Recipient,
      navigationOptions: {
        header: null
      }
    },
    BookingReq: {
      screen: BookingReq,
      navigationOptions: {
        header: null
      }
    },
    BookingReqUp: {
      screen: BookingReqUp,
      navigationOptions: {
        header: null
      }
    },
    Promocode: {
      screen: Promocode,
      navigationOptions: {
        header: null
      }
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        header: null
      }
    },
    RideReqConfirm: {
      screen: RideReqConfirm,
      navigationOptions: {
        header: null
      }
    },
    SideMenu: {
      screen: SideMenu,
      navigationOptions: {
        header: null
      }
    },
    MyWallet: {
      screen: MyWallet,
      navigationOptions: {
        header: null
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        header: null
      }
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        header: null
      }
    },
    InviteFriends: {
      screen: InviteFriends,
      navigationOptions: {
        header: null
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null
      }
    },
    Cpassword: {
      screen: Cpassword,
      navigationOptions: {
        header: null
      }
    },
    AOTP: {
      screen: AOTP,
      navigationOptions: {
        header: null
      }
    },
    RideReqCancel: {
      screen: RideReqCancel,
      navigationOptions: {
        header: null
      }
    },
    HistoryList: {
      screen: HistoryList,
      navigationOptions: {
        // header:null,
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        header: null
      }
    },
    Unassigned: {
      screen: Unassigned,
      navigationOptions: {
        header: null
      }
    },
    Biodata: {
      screen: Biodata,
      navigationOptions: {
        header: null
      }
    },
    Rating: {
      screen: Rating,
      navigationOptions: {
        header: null
      }
    },
    Tips: {
      screen: Tips,
      navigationOptions: {
        header: null
      }
    },
    MyAccount: {
      screen: MyAccount,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "Slider"
  }
);
export default createAppContainer(AppNavigator);

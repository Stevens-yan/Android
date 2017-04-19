import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import { NativeModules } from 'react-native';
import { getAppSettings } from 'settings';

const TRACKER_CONFIG = {
    "BASIC_URL":"https://mdt.jujinpan.cn",
    "APP":"chaoshi"
};

let channel;

const BASE_INFO = {
    "DEVICE_UUID":DeviceInfo.getUniqueID(),
    "MANUFACTURER": DeviceInfo.getManufacturer(),
    "MODEL": DeviceInfo.getModel(),
    "VERSION": DeviceInfo.getSystemVersion(),
    "APP_VERSION": DeviceInfo.getVersion(),
    "DEVICE_LOCATION": DeviceInfo.getDeviceLocale(),
    "DEVICE_COUNTRY":  DeviceInfo.getDeviceCountry(),
    "PARAM":"visitor_id="+encodeURIComponent(DeviceInfo.getUniqueID())+
            "&agent="+encodeURIComponent(DeviceInfo.getManufacturer()+" "+DeviceInfo.getModel()+" "+DeviceInfo.getSystemVersion())+
            "&app_ver="+encodeURIComponent(DeviceInfo.getVersion())
};

function setupChannel() {
  if(channel) return Promise.resolve(true);

  return getAppSettings().then(appSettings => {
    if(!/channel/.test(BASE_INFO.PARAM)) {
      channel = true;
      console.log("AddChannel")

      BASE_INFO.PARAM += `&channel=` + appSettings.channel + "&env="+ appSettings.env
    }
  });
}


class Tracker {
    workable = true;

    constructor() {
    	this.brgUmeng = NativeModules.StatisticalEvent;
    }

    composeBasicParams(key) {
        return TRACKER_CONFIG.BASIC_URL+"/g/"+TRACKER_CONFIG.APP+"/"+key+"/"+"?"+BASE_INFO.PARAM;
    }

    triggerTracking(config) {
      setupChannel().then(() => { this.TrackingFunc(config) });
    }

    TrackingFunc(config) {
        var urlPrefix = this.composeBasicParams(config.key);
        var url = urlPrefix+"&user="+this.user_id;

        for(let key in config) {
          url += `&${key}=${encodeURIComponent(config[key])}`
        }

        log(config, url);
        fetch(url).then(response => {
            return;
        });

        let { key, topic, entity, event} = config;
	      // add in umeng tracker
      	this.brgUmeng.onEvent(key+"_"+topic+"_"+entity+"_"+event);
	      return;
    }

    trackAction(config) {
        if (!this.workable) return;

        this.triggerTracking(config);
    }

    trackPage(key, entity, topic) {
        if (!this.workable)
            return;
        var event = "landing";
        this.triggerTracking({key, entity, topic, event });
    }
}

var tracker =  new Tracker();
export default tracker;

function log({ key, entity, topic, event, ...extend }, url) {
  let str = `tracking: key: "${key}", entity: "${entity}", topic: "${topic}", event: "${event}"`;

  for(let ekey in extend) {
    str += `, ${ekey}: "${extend[ekey]}"`;
  }

  if(url) str += ", url: " + url;

  console.debug(str);
}

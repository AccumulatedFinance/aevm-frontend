import AppStore from "./appStore";
import AlertStore from "./alertStore";

class RootStore {
  appStore: AppStore;
  alertStore: AlertStore;
  constructor() {
    this.appStore = new AppStore(this);
    this.alertStore = new AlertStore(this);
  }
}

export default RootStore;
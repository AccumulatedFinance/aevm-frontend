import AppStore from "./appStore";

class RootStore {
  appStore: AppStore;
  constructor() {
    this.appStore = new AppStore(this);
  }
}

export default RootStore;
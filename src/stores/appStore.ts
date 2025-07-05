import BigNumber from "bignumber.js";
import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore";

class AppStore {
  rootStore: RootStore;
  chainId: BigNumber | undefined = undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setChainId(chainId: BigNumber): void {
    this.chainId = chainId;
  }

  clearChainId(): void {
    this.chainId = undefined;
  }
}

export default AppStore;
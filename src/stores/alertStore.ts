import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore";
import { IAlertType } from "../model/iAlertType";

interface Alert {
  id: number;
  type: IAlertType;
  data: string | Error;
}

class AlertStore {
  rootStore: RootStore;
  queue: Array<Alert> = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get lastAlert() {
    return this.queue[this.queue.length - 1];
  }

  addToQueue(alert: Alert) {
    this.queue.push(alert);
  }

  clearAlerts() {
    this.queue = [];
  }

  sendAlert = (newAlert: string | Error, newType: IAlertType) => {
    const id = Date.now();
    const extended = {
      id: id, // Unique timestamp as an identifier
      type: newType,
      data: newAlert,
    };
    this.addToQueue(extended);
  };

  dequeueAlert = () => {
    if (this.queue.length > 0) {
      this.queue.slice(1);
    }
  };
  
}

export default AlertStore;
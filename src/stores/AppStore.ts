import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";
class AppStore {
  users: IUser[] = [
    { userName: "s", fullName: "f", lastLogin: new Date(), enabled: false },
  ];
  isDialogOpen: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  setIsDialogOpen(value: boolean) {
    this.isDialogOpen = value;
  }
}
const appStore = new AppStore();
export default appStore;

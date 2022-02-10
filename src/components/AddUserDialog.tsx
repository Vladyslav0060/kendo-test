import { FC, useState } from "react";
import { observer } from "mobx-react";
import appStore from "../stores/AppStore";
import { Window } from "@progress/kendo-react-dialogs";
import AddUserForm from "./forms/AddUserForm";

const AddUserDialog: FC = () => {
  const [isEnabledCheckbox, setIsEnabledCheckbox] = useState<boolean>(false);
  const toggleDialog = () => {
    appStore.setIsDialogOpen(!appStore.isDialogOpen);
  };
  return (
    <>
      {appStore.isDialogOpen && (
        <Window
          title={"Create a new user"}
          onClose={toggleDialog}
          initialHeight={350}
          resizable={false}
        >
          <AddUserForm
            toggleDialog={toggleDialog}
            isEnabledCheckbox={isEnabledCheckbox}
            setIsEnabledCheckbox={setIsEnabledCheckbox}
          />
        </Window>
      )}
    </>
  );
};
const AddUserDialogObservable = observer(AddUserDialog);
export default AddUserDialogObservable;

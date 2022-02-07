import { FC, useState } from "react";
import { observer } from "mobx-react";
import appStore from "../stores/AppStore";
import { Window } from "@progress/kendo-react-dialogs";
import { alphanumericRegExp, fullNameRegExp } from "../RegExp/RegExp";
import httpService from "../httpService/httpService";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";

const AddUserDialog: FC = () => {
  const [isEnabledCheckbox, setIsEnabledCheckbox] = useState<boolean>(false);
  const toggleDialog = () => {
    appStore.setIsDialogOpen(!appStore.isDialogOpen);
  };

  const userNameValidator = (value: string) =>
    alphanumericRegExp.test(value) ? "" : "Please enter a valid username";
  const fullNameValidator = (value: string) =>
    fullNameRegExp.test(value) ? "" : "Please enter a valid fullname";
  const InputComponent = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
  };

  const handleSubmit = async (dataItem: { [name: string]: any }) => {
    const userName: string = JSON.stringify(dataItem.userName);
    const fullName: string = JSON.stringify(dataItem.fullName);
    const body = {
      data: {
        userName: userName,
        fullName: fullName,
        enabled: isEnabledCheckbox,
      },
      headers: {
        Autorization: "Bearer johndoe",
        "Content-Type": "application/json",
      },
    };
    const res = await httpService.post("/users", body);
    alert(`Request sent, status ${res?.status}`);
    toggleDialog();
  };
  const onCheckboxClick = () => {
    setIsEnabledCheckbox(!isEnabledCheckbox);
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
          <Form
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement style={{ maxWidth: 400 }}>
                <fieldset className={"k-form-fieldset"}>
                  <legend>User Details</legend>
                  <div className="mb-3">
                    <Field
                      name={"userName"}
                      type={"text"}
                      component={InputComponent}
                      label={"Username (4-15 symbols)"}
                      validator={userNameValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      name={"fullName"}
                      type={"text"}
                      component={InputComponent}
                      label={"Full name (max 40 symbols)"}
                      validator={fullNameValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Checkbox
                      label={"Enabled"}
                      name={"enabled"}
                      value={isEnabledCheckbox}
                      onChange={onCheckboxClick}
                    />
                  </div>
                </fieldset>
                <div
                  className="text-right"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                >
                  <button
                    type="button"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={toggleDialog}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Submit
                  </button>
                </div>
              </FormElement>
            )}
          />
        </Window>
      )}
    </>
  );
};
const AddUserDialogObservable = observer(AddUserDialog);
export default AddUserDialogObservable;

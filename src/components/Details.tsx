import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import appStore from "../stores/AppStore";
import { Window } from "@progress/kendo-react-dialogs";
import { alphanumericRegExp, fullNameRegExp } from "../RegExp/RegExp";
import httpService from "../httpService/httpService";
import { Loader } from "@progress/kendo-react-indicators";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/types";

const Details: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser]: any = useState<IUser>();
  const [isEnabledCheckbox, setIsEnabledCheckbox] = useState<boolean>();
  const onClose = () => {
    navigate("/");
  };
  useEffect(() => {
    setIsEnabledCheckbox(user?.enabled);
    console.log(user);
  }, [user]);
  const fetchData = async () => {
    const res = await httpService.get("/users", {
      headers: {
        Autorization: "Bearer johndoe",
        "Content-Type": "application/json",
      },
    });
    const foundUser = res?.data.users.find((user: IUser) => {
      if (user.userName === userId) return user;
    });
    if (foundUser !== undefined) setUser(foundUser);
  };
  useEffect(() => {
    fetchData();
  }, [appStore]);
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
    const res = await httpService.put("/users", body);
    alert(`Request sent, status ${res?.status}`);
    onClose();
  };
  const onCheckboxClick = () => {
    setIsEnabledCheckbox(!isEnabledCheckbox);
  };
  return (
    <>
      <Window
        title={"User details"}
        onClose={onClose}
        initialHeight={350}
        resizable={false}
      >
        {user ? (
          <Form
            onSubmit={handleSubmit}
            initialValues={{
              userName: user?.userName,
              fullName: user?.fullName,
              lastLogin: user?.lastLogin,
              enabled: isEnabledCheckbox,
            }}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement style={{ maxWidth: 400 }}>
                <fieldset className={"k-form-fieldset"}>
                  <legend>User Details</legend>
                  <div className="mb-3">
                    <Field
                      name={"userName"}
                      type={"text"}
                      component={InputComponent}
                      label={"Username"}
                      validator={userNameValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      name={"fullName"}
                      type={"text"}
                      component={InputComponent}
                      label={"Full name"}
                      validator={fullNameValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      name={"lastLogin"}
                      type={"text"}
                      component={InputComponent}
                      label={"Last login"}
                      disabled={true}
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
                    onClick={onClose}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Save
                  </button>
                </div>
              </FormElement>
            )}
          />
        ) : (
          <div className="spinner-centered">
            <Loader size="small" type="converging-spinner" />
          </div>
        )}
      </Window>
    </>
  );
};
const DetailsObservable = observer(Details);
export default DetailsObservable;

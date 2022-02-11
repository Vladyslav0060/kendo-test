import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import httpService from "../../httpService/httpService";
import { Error } from "@progress/kendo-react-labels";
import {
  userNameValidator,
  fullNameValidator,
} from "../../RegExp/validators/Validator";
const EditUserForm = (props: any) => {
  const { user, isEnabledCheckbox, setIsEnabledCheckbox, onClose } = props;
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
    };
    const res = await httpService.put("/users", body);
    alert(`Request sent, status ${res?.status}`);
    onClose();
  };
  const onCheckboxClick = () => {
    setIsEnabledCheckbox(!isEnabledCheckbox);
  };
  return (
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
  );
};

export default EditUserForm;

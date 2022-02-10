import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Window } from "@progress/kendo-react-dialogs";
import httpService from "../httpService/httpService";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/types";
import { LoaderSmall } from "./loaders/Loaders";
import EditUserForm from "./forms/EditUserForm";

const Details: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser]: any = useState<IUser>();
  const [isEnabledCheckbox, setIsEnabledCheckbox] = useState<boolean>();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setIsEnabledCheckbox(user?.enabled);
  }, [user]);
  const onClose = () => {
    navigate("/");
  };
  const fetchData = async () => {
    const res = await httpService.get("/users", {
      headers: {
        Autorization: "Bearer johndoe",
        "Content-Type": "application/json",
      },
    });
    const foundUser = res?.data.users.find((user: IUser) => {
      return user.userName === userId;
    });
    if (foundUser !== undefined) setUser(foundUser);
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
          <EditUserForm
            user={user}
            isEnabledCheckbox={isEnabledCheckbox}
            setIsEnabledCheckbox={setIsEnabledCheckbox}
            onClose={onClose}
          />
        ) : (
          <LoaderSmall />
        )}
      </Window>
    </>
  );
};
const DetailsObservable = observer(Details);
export default DetailsObservable;

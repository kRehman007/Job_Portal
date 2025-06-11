import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AxiosInstance from "../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUsers } from "../JOB_SEEKER/Redux/Slices/user-slice";
import { useAppSelector } from "../utils/useAppandDispatch";
import { useNavigate } from "react-router-dom";
import Loader from "../JOB_SEEKER/components/Loader";

interface props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    toast.promise(AxiosInstance.get("/validate-user"), {
      loading: "",
      success: (response) => {
        dispatch(setUsers(response?.data));
        setIsLoading(false);
        return "";
      },
      error: () => {
        setIsLoading(false);
        localStorage.removeItem("token");
        navigate("/login");
        return "";
      },
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <>{children}</>;
  }
};

export default ProtectedRoute;

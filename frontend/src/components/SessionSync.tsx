import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../utils/useAppandDispatch";
import { JobsAPI } from "../JOB_SEEKER/Redux/API/JobsAPI";
import { useFavourite } from "../JOB_SEEKER/zustand/useFavourite";

let lastUserId: number | null | undefined;

const SessionSync: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector((state) => state.user.user?.id ?? null);

  useEffect(() => {
    if (lastUserId === userId) return;
    lastUserId = userId;

    dispatch(JobsAPI.util.resetApiState());
    useFavourite.getState().setUser(userId);
  }, [userId, dispatch]);

  return null;
};

export default SessionSync;

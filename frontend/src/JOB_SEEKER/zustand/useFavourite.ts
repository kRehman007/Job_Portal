import { create } from "zustand";

import { Job } from "../../utils/interface";

interface FavouriteState {
  FavouriteList: Job[];
  currentUserId: number | null;
  setUser: (userId: number | null) => void;
  ToggleFavourites: (job: Job) => void;
  isFavourite: (jobId: number) => boolean;
}

const storageKey = (userId: number | null) =>
  userId ? `favourites-${userId}` : "favourites";

export const useFavourite = create<FavouriteState>((set, get) => ({
  currentUserId: null,
  FavouriteList: [],

  setUser: (userId: number | null) => {
    if (get().currentUserId === userId) return;

    let savedFavourites: Job[] = [];
    try {
      savedFavourites = JSON.parse(
        localStorage.getItem(storageKey(userId)) || "[]"
      );
    } catch {
      savedFavourites = [];
    }

    set({ currentUserId: userId, FavouriteList: savedFavourites });
  },

  ToggleFavourites: (job: Job) => {
    const userId = get().currentUserId;
    if (!userId) return;

    set((state) => {
      const isAlreadyFavourite = state.FavouriteList.some(
        (fav) => fav.id === job.id
      );

      const updatedList = isAlreadyFavourite
        ? state.FavouriteList.filter((item) => item.id !== job.id) // Remove
        : [...state.FavouriteList, job]; // Add

      // Save updated list to local storage (per-user key)
      localStorage.setItem(storageKey(userId), JSON.stringify(updatedList));

      return { FavouriteList: updatedList };
    });
  },

  isFavourite: (jobId: number) => {
    return get().FavouriteList.some((fav) => fav.id === jobId);
  },
}));

import { create } from "zustand";

import { Job } from "../../utils/interface";

interface FavouriteState {
  FavouriteList: Job[];
  ToggleFavourites: (job: Job) => void;
  isFavourite: (jobId: number) => boolean;
}

export const useFavourite = create<FavouriteState>((set, get) => {
  // Load from local storage on initialization
  const savedFavourites = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  return {
    FavouriteList: savedFavourites,

    ToggleFavourites: (job: Job) => {
      set((state) => {
        const isAlreadyFavourite = state.FavouriteList.some(
          (fav) => fav.id === job.id
        );

        const updatedList = isAlreadyFavourite
          ? state.FavouriteList.filter((item) => item.id !== job.id) // Remove
          : [...state.FavouriteList, job]; // Add

        // Save updated list to local storage
        localStorage.setItem("favourites", JSON.stringify(updatedList));

        return { FavouriteList: updatedList };
      });
    },

    isFavourite: (jobId: number) => {
      return get().FavouriteList.some((fav) => fav.id === jobId);
    },
  };
});

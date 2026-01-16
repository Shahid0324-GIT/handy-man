import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface FavoritesState {
  favorites: string[];
  addFavorite: (url: string) => void;
  removeFavorite: (url: string) => void;
  toggleFavorite: (url: string) => void;
  isFavorite: (url: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (url) => {
        set((state) => ({ favorites: [...state.favorites, url] }));
        toast.success("Added to favorites");
      },

      removeFavorite: (url) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== url),
        }));
        toast.info("Removed from favorites");
      },

      toggleFavorite: (url) => {
        const { favorites, addFavorite, removeFavorite } = get();
        if (favorites.includes(url)) {
          removeFavorite(url);
        } else {
          addFavorite(url);
        }
      },

      isFavorite: (url) => get().favorites.includes(url),
    }),
    {
      name: "handyman-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

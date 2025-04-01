import { createStore } from "./zustand/createStore";

type SnackbarType = "ERROR" | "SUCCESS";

interface SnackbarState {
  isSnackbarOpened: boolean;
  SnackbarType: SnackbarType;
  SnackbarTitle: string;
  SnackbarMessage: string;
  openSnackbar: (type: SnackbarType, title: string, message: string) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = createStore<SnackbarState>(set => ({
  isSnackbarOpened: false,
  SnackbarType: "SUCCESS",
  SnackbarTitle: "",
  SnackbarMessage: "",
  openSnackbar: (type: SnackbarType, title: string, message: string) =>
    set({
      isSnackbarOpened: true,
      SnackbarType: type,
      SnackbarTitle: title,
      SnackbarMessage: message,
    }),
  closeSnackbar: () =>
    set(state => ({
      isSnackbarOpened: false,
      SnackbarTitle: state.SnackbarTitle,
      SnackbarMessage: state.SnackbarMessage,
      SnackbarType: state.SnackbarType,
    })),
}));

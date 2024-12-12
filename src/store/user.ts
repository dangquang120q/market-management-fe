import { USER_DETAIL } from "constant";
import { IStaff } from "constant/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserAction {
  handleUserLogin: (user: IStaff) => Promise<void>;
  handleUserLogout: () => Promise<void>;
}
export const initialState: IStaff = {
  id: "",
  name: "",
  phone: "",
  email: "",
  role: "sales",
  username: "",
  dob: "",
};

export const userStore = create<IStaff & IUserAction>()(
  persist(
    (set) => ({
      ...initialState,
      handleUserLogin: async (user: IStaff) => {
        const userData = {
          ...user,
        };

        set({ ...userData });
      },
      handleUserLogout: async () => {
        set({ ...initialState });
      },
    }),
    {
      name: USER_DETAIL,
      partialize: (state) => ({
        id: state.id,
        name: state.name,
        username: state.username,
        role: state.role,
      }),
    }
  )
);

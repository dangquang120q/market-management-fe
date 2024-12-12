export type T = any;

export type ModalTypeType = "" | "create" | "edit";
export type RoleType = "admin" | "sales" | "warehouse";

export type ModalType<T> = {
  type: ModalTypeType;
  item: T;
};

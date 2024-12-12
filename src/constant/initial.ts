import { IInvoiceDetail, IReceiptDetail } from "./interface";
import { RoleType } from "./type";

export const initProduct = {
  id: "",
  name: "",
  unit: "",
  total: 0,
  categoryId: "",
  price: 0,
  category: "",
};
export const initPromotional = {
  id: "",
  startDate: "",
  endDate: "",
  name: "",
};
export const initPromoProduct = {
  id: "",
  promotionalId: "",
  productId: "",
  promoPrice: 0,
  name: "",
  price: 0,
  total: 0,
  saleTotal: 0,
};
export const initProductReceipt = {
  id: "",
  name: "",
  unit: "",
  total: 0,
  categoryId: "",
  price: 0,
  category: "",
  qty: 0,
  importPrice: 0,
};
export const initCategory = {
  id: "",
  name: "",
  description: "",
};
export const initSupplier = {
  id: "",
  name: "",
  address: "",
  email: "",
  phone: "",
  tax: "",
  website: "",
};

export const initMember = {
  id: "", // số điện thoại của hội viên
  name: "",
  gender: "",
  dob: "",
  createdDate: 0,
  point: 0,
};

export const initStaff = {
  id: "", // đặt ID có nghĩa VD: NV001,...
  name: "",
  phone: "",
  email: "",
  role: "sales" as RoleType,
  username: "",
  dob: "",
};

export const initBooth = {
  id: "",
  name: "",
  categoryId: "",
};

export const initInvoice: IInvoiceDetail = {
  id: "",
  memberId: "",
  staffId: "",
  products: [],
  createdDate: "",
  total: 0,
  reducedAmount: 0,
  staff: initStaff,
  member: initMember,
};
export const initReceipt: IReceiptDetail = {
  // hóa đơn nhập
  id: "",
  supplierId: "",
  staffId: "",
  products: [],
  createdDate: "",
  total: 0,
  staff: initStaff,
  supplier: initSupplier,
};

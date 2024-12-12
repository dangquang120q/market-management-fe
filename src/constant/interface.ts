import { RoleType } from "./type";

export interface IStaff {
  id: string; // đặt ID có nghĩa VD: NV001,...
  name: string;
  phone?: string;
  email?: string;
  role: RoleType;
  username: string;
  dob: string;
}

export interface IMember {
  id: string; // số điện thoại của hội viên
  name: string;
  gender: string;
  dob: string;
  createdDate: number;
  point: number;
}

export interface IProduct {
  id: string | number;
  name: string;
  unit?: string;
  total?: number;
  categoryId?: string | number;
  price: number;
  category?: string; // tên của category
  saleTotal?: number;
  promoPrice?: number;
}

export type IProductInvoice = IProduct & {
  qty: number;
};

export type IProductReceipt = IProduct & {
  qty: number;
  importPrice: number; //giá nhập hàng
  mfgDate?: string;
  expDate?: string;
  remain?: number;
  productId?: string | number;
};

export interface ICategory {
  id: string | number;
  name: string;
  description?: string;
}

export interface IPromotional {
  id: number | string;
  startDate: string;
  endDate: string;
  name: string;
}

export interface IPromoProduct {
  id: number | string;
  promotionalId: number | string;
  productId: number | string;
  promoPrice: number;
  name?: string;
  price?: number;
  total?: number;
  saleTotal?: number;
}
export interface ISupplier {
  id: string | number;
  name: string;
  address: string;
  email: string;
  phone: string;
  tax: string;
  website?: string;
}

export interface IInvoice {
  // hóa đơn mua
  id: string | number;
  memberId?: string;
  staffId: string;
  products: Array<IProductInvoice>;
  createdDate: string | number;
  total: number;
  reducedAmount: number;
}

export interface IReceipt {
  // hóa đơn nhập
  id: string | number;
  supplierId: string | number;
  staffId: string | number;
  products: IProductReceipt[];
  createdDate: string | number;
  total: string | number;
  descripiton?: string;
}

export interface IBooth {
  id: number | string;
  name: string;
  categoryId: string;
}

export interface IInvoiceDetail {
  id: string;
  staffId: string;
  memberId: string;
  reducedAmount: number;
  createdDate: string;
  total: number;
  staff: IStaff;
  member: IMember;
  products: Array<IProductInvoice>;
}

export interface IReceiptDetail {
  id: string;
  staffId: string;
  supplierId: string;
  createdDate: string;
  total: number;
  staff: IStaff;
  supplier: ISupplier;
  products: Array<IProductReceipt>;
}

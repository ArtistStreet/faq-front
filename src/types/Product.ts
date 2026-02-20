import { ProductStatus } from "@/constants/common";
import Category from "./Category";
import { BaseModel } from "./common";
import Shop from "./Shop";

export default interface Product extends BaseModel {
     name: string;
     desc?: string | undefined;
     price: number;
     stock: number;
     categoryIds: number[];
     category: Category[];
     shop: Shop;
     status: ProductStatus;
}

export interface CreateProductInput {
     name: string;
     desc?: string | null;
     price: number;
     stock: number;
     categoryIds: number[];
     status: ProductStatus;
}

export interface DetailProduct {
     detailProduct: Product;
}

export interface ProductQuery {
     listProduct: {
          data: Product[];
          totalCount: number;
          totalPages: number;
          currentPage: number;
     }
}

export interface PublicProductQuery {
     publicListProduct: {
          data: Product[];
          totalCount: number;
          totalPages: number;
          currentPage: number;
     }
}

export interface ProductCreate {
     createProduct: Product;
     updateProduct: Product;
}
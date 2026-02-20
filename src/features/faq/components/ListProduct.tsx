import { DETAIL_PRODUCT } from "@/services/ProductService";
import Product from "@/types/Product";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ArrowUpRight, Edit, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";

interface IProp {
     products: Product[];
     page: number;
     limit: number;
     handleUpdate?: (product: Product) => void;
     handleDelete?: (id: number) => void;
}

export default function ListProduct({ products, page, limit, handleUpdate, handleDelete }: IProp) {
     const navigate = useNavigate();

     return (
          <div className="p-6">
               {/* Grid */}
               {products.length === 0 ? (
                    <div className="text-secondary">Chưa có sản phẩm nào.</div>
               ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                         {products.map((product) => (
                              <div key={product.id} className="col">
                                   <div className="card shadow-sm h-100">
                                        {/* Info */}
                                        <div className="card-body">
                                             <h5 className="card-title text-truncate">
                                                  ten:  {product.name}
                                             </h5>

                                             <p className="card-text text-dark fw-semibold mb-1">
                                                  danh muc: {product.category?.map((c) => c.name).join(', ') || 'Không có danh mục'}
                                             </p>

                                             <p className="card-text text-dark fw-semibold mb-1">
                                                  {product.price.toLocaleString()} đ
                                             </p>

                                             <p className="card-text small text-secondary">
                                                  Tồn kho: {product.stock}
                                             </p>

                                             {/* <p className="card-text small text-secondary">
                                                  Cửa hàng: {product.shop?.name}
                                             </p> */}
                                        </div>
                                        <div className="card-footer bg-white border-0">
                                             <button
                                                  type="button"
                                                  title="Xoá"
                                                  className="btn btn-icon btn-sm btn-flat-danger waves-effect"
                                                  onClick={() => handleUpdate?.(product)}
                                             >
                                                  <Edit size={14} />
                                             </button>
                                             <button
                                                  type="button"
                                                  title="Xoá"
                                                  className="btn btn-icon btn-sm btn-flat-danger waves-effect"
                                                  onClick={() => navigate(`/shop/product/${product.id}`)}
                                             >
                                                  <ArrowUpRight size={14} />
                                             </button>
                                             <button
                                                  type="button"
                                                  title="Xoá"
                                                  className="btn btn-icon btn-sm btn-flat-danger waves-effect"
                                                  onClick={() => handleDelete?.(product.id!)}
                                             >
                                                  <Trash2 size={14} />
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               )}
          </div>
     )
}

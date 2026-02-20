import { DETAIL_PRODUCT } from '@/services/ProductService';
import { DetailProduct } from '@/types/Product';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
     const { id } = useParams();

     const { data, loading } = useQuery<DetailProduct>(DETAIL_PRODUCT, {
          variables: { id: Number(id) },
          skip: !id,
     });

     if (loading) return <p>Loading...</p>;

     const product = data?.detailProduct;

     return (
          <div>
               <h1>ten: {product?.name}</h1>
               <p>mo ta: {product?.desc}</p>
               <p>gia: {product?.price} đ</p>
               <p>
                    Danh mục:{' '}
                    {product?.category?.map((c: any) => c.name).join(', ')}
               </p>
               <p>cua hang: {product?.shop?.name}</p>
               <button>them vao gio hang</button>
          </div>
     );
}

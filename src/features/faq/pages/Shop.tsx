import { useQuery, useMutation } from '@apollo/client/react';
import { CREATE_PRODUCT, DELETE_PRODUCT, LIST_PRODUCT, UPDATE_PRODUCT } from '@/services/ProductService';
import Product, { CreateProductInput, ProductQuery } from '@/types/Product';
import { useSearchParams } from 'react-router-dom';
import { LIMIT_MAX, PAGE_NUMBER_DEFAULT } from '@/constants/common';
import { useState } from 'react';
import ListProduct from '../components/ListProduct';
import ModalConfirm from '@/components/partials/ModalConfirm';
import { t } from 'i18next';
import { Plus } from 'react-feather';
import ModalProductUpdate from '../components/ModalProductUpdate';
import { CATEGORY_LIST } from '@/services/CategoryServices';
import { CategoryQuery } from '@/types/Category';
import SearchForm from '@/components/partials/SearchForm';
import { SHOP_DELETE } from '@/services/ShopServices';

export default function ShopProducts() {
     const [searchParams] = useSearchParams();
     const [showDelete, setShowDelete] = useState(false);
     const [currentId, setCurrentId] = useState<Product | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);

     const searchTerm = searchParams.get('search') || '';

     const categoryIds = searchParams.get('category')
          ? searchParams.get('category')!.split(',').map(Number)
          : [];

     const filters =
          categoryIds.length > 0
               ? [`category.id:[](${categoryIds.join(',')})`]
               : null;

     const { loading, data } = useQuery<ProductQuery>(LIST_PRODUCT, {
          variables: {
               search: searchTerm,
               filters,
               page: PAGE_NUMBER_DEFAULT,
               limit: LIMIT_MAX,
          }
     })

     const { data: catData } = useQuery<CategoryQuery>(CATEGORY_LIST, {
          variables: {
               page: PAGE_NUMBER_DEFAULT,
               limit: LIMIT_MAX,
          },
     });

     const category = catData?.categoryList.data;

     const [saveProduct, { loading: saving }] = useMutation<CreateProductInput>(currentId?.id ? UPDATE_PRODUCT : CREATE_PRODUCT, {
          refetchQueries: ['ProductList'],
          onCompleted: () => {
               closeModal();
          }
     })

     const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT, {
          refetchQueries: ['ProductList'],
          onCompleted: () => {
               setShowDelete(false);
               setItemIdToDelete(null);
          },
     })

     const [deleteShop, { loading: deletingShop }] = useMutation(SHOP_DELETE, {
          onCompleted: () => {
               setShowDelete(false);
               setItemIdToDelete(null);
          },
     })

     const products = data?.listProduct.data || [];

     const handleSubmit = async (product: CreateProductInput) => {
          const data = {
               name: product.name,
               desc: product.desc,
               price: product.price,
               categoryIds: product.categoryIds,
               stock: product.stock,
          }

          const variable = currentId?.id ? {
               id: currentId.id,
               input: data
          } : {
               input: data
          }

          await saveProduct({
               variables: variable
          })
     }

     const cancelDelete = () => {
          setShowDelete(false);
          setItemIdToDelete(null);
     };

     const confirmDelete = async () => {
          if (!itemIdToDelete) return;

          await deleteProduct({ variables: { id: itemIdToDelete } });
     };

     const confirmDeleteShop = async () => {
          if (!itemIdToDelete) return;

          await deleteShop({ variables: { id: itemIdToDelete } });
     };

     const handleCreate = () => {
          setCurrentId(null);
          setShowModal(true);
     };

     const handleDelete = (id: number) => {
          setItemIdToDelete(id);
          setShowDelete(true);
     };

     const handleUpdate = (product: Product) => {
          setCurrentId(product);
          setShowModal(true);
     };

     const closeModal = () => {
          setShowModal(false);
     };

     const categoryChoices = category?.filter((cat) => cat.id !== undefined).map((cat) => ({
          value: cat.id as number,
          label: cat.name,
     })) || [];


     return (
          <>
               <div className="container py-4">
                    <SearchForm
                         fields={[
                              { name: 'search', type: 'text', label: 'Từ khóa', wrapClassName: 'col-md-4 col-12' },
                              {
                                   name: 'category',
                                   type: 'select',
                                   label: 'danh muc',
                                   wrapClassName: 'col-md-4 col-12',
                                   options: {
                                        multiple: true,
                                        choices: categoryChoices,
                                   },
                              },
                         ]}
                         isLoading={loading}
                         searchClass="col-md-4 pt-2"
                    />
                    <div className="d-flex align-items-center justify-content-between mb-4">
                         <h1 className="fs-3 fw-semibold">Sản phẩm của bạn</h1>

                         <button
                              onClick={() => handleCreate()}
                              className="btn btn-dark d-flex align-items-center gap-2"
                         >
                              <Plus size={18} />
                              Tạo sản phẩm
                         </button>
                         <button
                              // onClick={() => handleDelete()}
                              className="btn btn-dark d-flex align-items-center gap-2"
                         >
                              <Plus size={18} />
                              Xoá cửa hàng
                         </button>
                    </div>
                    {loading ? <div className="p-6">Loading...</div> : (
                         <ListProduct
                              products={products}
                              handleUpdate={handleUpdate}
                              handleDelete={handleDelete}
                              page={PAGE_NUMBER_DEFAULT}
                              limit={LIMIT_MAX}
                         />
                    )}
                    <ModalProductUpdate
                         show={showModal}
                         product={currentId}
                         categoryIds={category}
                         isLoading={saving}
                         changeShow={closeModal}
                         submitAction={handleSubmit}
                    />
                    <ModalConfirm
                         show={showDelete}
                         text={t('confirm.delete')}
                         btnDisabled={deleting}
                         changeShow={cancelDelete}
                         submitAction={confirmDelete}
                    />
               </div>
          </>
     );
}
import { PAGE_NUMBER_DEFAULT, LIMIT_MAX } from "@/constants/common";
import { PUBLIC_LIST_PRODUCT } from "@/services/ProductService";
import { ProductQuery, PublicProductQuery } from "@/types/Product";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import SearchForm from "@/components/partials/SearchForm";
import { CategoryQuery } from "@/types/Category";
import { CATEGORY_LIST } from "@/services/CategoryServices";
import ListProduct from "@/features/faq/components/ListProduct";

export default function Home() {
     const [searchParams] = useSearchParams();

     const searchTerm = searchParams.get('search') || '';

     const categoryIds = searchParams.get('category')
          ? searchParams.get('category')!.split(',').map(Number)
          : [];

     const filters =
          categoryIds.length > 0
               ? [`category.id:[](${categoryIds.join(',')})`]
               : null;

     const { loading, data } = useQuery<PublicProductQuery>(PUBLIC_LIST_PRODUCT, {
          variables: {
               search: searchTerm,
               filters,
               page: PAGE_NUMBER_DEFAULT,
               limit: LIMIT_MAX,
          }
     })

     const products = data?.publicListProduct.data || [];

     const { data: catData } = useQuery<CategoryQuery>(CATEGORY_LIST, {
          variables: {
               page: PAGE_NUMBER_DEFAULT,
               limit: LIMIT_MAX,
          },
     });

     const category = catData?.categoryList.data;


     const categoryChoices = category?.filter((cat) => cat.id !== undefined).map((cat) => ({
          value: cat.id as number,
          label: cat.name,
     })) || [];

     return (
          <div className="container py-4">
               <Navbar />
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
               {loading ? <div className="p-6">Loading...</div> : (
                    <ListProduct
                         products={products}
                         page={PAGE_NUMBER_DEFAULT}
                         limit={LIMIT_MAX}
                    />
               )}
          </div>
     )
}
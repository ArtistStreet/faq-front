import Category from 'types/Category';
import { Edit, Trash2 } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import Role from '@/types/Role';
// import { Paging } from '../../../types/common';
// import { genTableIndex } from '../../../utils/common';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import { useState } from 'react';

interface IProps {
     items: Category[];
     page: number;
     limit: number;
     // paging: Paging;
     handleUpdate: (category: Category) => void;
     handleDelete: (id: number) => void;
}

export default function ListCategory({
     items,
     page,
     limit,
     handleUpdate,
     handleDelete,
}: Readonly<IProps>) {
     return (
          <div className="table-responsive">
               <div className="table-responsive">
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="text-center">STT</th>
                                   <th>Ten</th>
                                   <th>Mo ta</th>
                                   <th className="thAction1"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {items.map((item: Category, index: number) => (
                                   <tr key={item.id}>
                                        <td className="text-center">{(page - 1) * limit + index + 1}</td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="text-center">{item.description}</td>
                                        <td className="text-center">
                                             <button
                                                  type="button"
                                                  title="Xoá"
                                                  className="btn btn-icon btn-sm btn-flat-danger waves-effect"
                                                  onClick={() => handleUpdate(item)}
                                             >
                                                  <Edit size={14} />
                                             </button>
                                             <button
                                                  type="button"
                                                  title="Xoá"
                                                  className="btn btn-icon btn-sm btn-flat-danger waves-effect"
                                                  onClick={() => handleDelete(item.id!)}
                                             >
                                                  <Trash2 size={14} />
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}

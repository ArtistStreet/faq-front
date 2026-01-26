import Faq from 'types/Faq';
import { Edit, Trash2 } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import Role from '@/types/Role';
// import { Paging } from '../../../types/common';
// import { genTableIndex } from '../../../utils/common';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import { useState } from 'react';
import Category from '@/types/Category';

interface IProps {
     items: Faq[];
     page: number;
     category: Category[] | undefined;
     limit: number;
     handleUpdate: (faq: Faq) => void;
     handleDelete: (id: number) => void;
}

export default function ListFAQ({
     items,
     category,
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
                                   <th>Loại câu hỏi</th>
                                   <th>Câu hỏi</th>
                                   <th>Câu trả lời</th>
                                   <th className="thAction1"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {items.map((item: Faq, index: number) => (
                                   <tr key={item.id}>
                                        <td className="text-center">{(page - 1) * limit + index + 1}</td>
                                        <td className="text-center">{item.category?.map(cat => cat.name).join(', ') || '-'}</td>
                                        <td className="text-center">{item.question}</td>
                                        <td className="text-center">{item.answer}</td>
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

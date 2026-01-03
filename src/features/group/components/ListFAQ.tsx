import Faq from 'types/Faq';
import { Trash2 } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import Role from '@/types/Role';
// import { Paging } from '../../../types/common';
// import { genTableIndex } from '../../../utils/common';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import { useState } from 'react';

interface IProps {
     items: Faq[];
     role: Role[];
     // paging: Paging;
     handleUpdate?: (id: number) => void;
     handleDelete: (id: number) => void;
     handleClickFaq?: (id: number) => void;
}

export default function ListFAQ({
     items,
     role,
     handleUpdate,
     handleDelete,
     handleClickFaq,
     // showParentInfo = false,
     // parentName
}: Readonly<IProps>) {
     return (
          <div className="table-responsive">
               {/* {showParentInfo && parentName && (
                    <div className="alert alert-info mb-4">
                         Đang xem nhóm con của: <strong>{parentName}</strong>
                    </div>
               )} */}
               <div className="table-responsive">
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="text-center">STT</th>
                                   <th>Câu hỏi</th>
                                   <th>Câu trả lời</th>
                                   <th className="thAction1"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {items.map((item: Faq) => (
                                   <tr key={item.id}>
                                        <td className="text-center">{item.question}</td>
                                        <td className="text-center">{item.question}</td>
                                        <td className="text-center">{item.answer}</td>
                                        <td className="text-center">
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

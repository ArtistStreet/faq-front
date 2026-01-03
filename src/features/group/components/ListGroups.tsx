import Group from 'types/Group';
import { Trash2, Edit } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import Role from '@/types/Role';
// import { Paging } from '../../../types/common';
// import { genTableIndex } from '../../../utils/common';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import { useState } from 'react';

interface IProps {
     items: Group[];
     role: Role[];
     // paging: Paging;
     handleUpdate: (group: Group) => void;
     handleDelete: (id: number) => void;
     handleClickGroup: (id: number) => void;
}

export default function ListGroup({
     items,
     role,
     handleUpdate,
     handleDelete,
     handleClickGroup,
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
                                   <th>Vai trò</th>
                                   <th>Tên</th>
                                   <th>Mô tả</th>
                                   <th className="thAction1"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {items.map((item: Group) => (
                                   <tr key={item.id}>
                                        <td className="text-center">{item.name}</td>
                                        <td>
                                             {item.roles && item.roles.length > 0 ? (
                                                  <div>
                                                       {item.roles.map((role) => (
                                                            <span
                                                                 key={role.id}
                                                                 className="badge bg-success rounded-pill px-2 py-1"
                                                                 style={{ fontSize: '0.8em' }}
                                                            >
                                                                 {role.name}
                                                            </span>
                                                       ))}
                                                  </div>
                                             ) : (
                                                  <span className="text-muted fst-italic">Chưa có vai trò</span>
                                             )}
                                        </td>
                                        <td>
                                             <span className="text-primary cursor-pointer" role='button' onClick={() => handleClickGroup(item.id!)}>
                                                  {item.name}
                                             </span>
                                        </td>
                                        <td>{item.description}</td>
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

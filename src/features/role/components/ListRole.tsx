import Role from 'types/Role';
import { Trash2 } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
// import { Paging } from '../../../types/common';
// import { genTableIndex } from '../../../utils/common';

interface IProps {
     items: Role[];
     // paging: Paging;
     handleUpdate?: (id: number) => void;
     handleDelete: (id: number) => void;
}

export default function ListRole({
     items,
     handleUpdate,
     handleDelete,
}: Readonly<IProps>) {
     const location = useLocation();

     return (
          <div className="table-responsive">
               <div className="table-responsive">
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="text-center">STT</th>
                                   <th>Ten</th>
                                   <th>mo ta</th>
                                   <th className="thAction1"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {items.map((item: Role) => (
                                   <tr key={item.id}>
                                        <td className="text-center">{item.name}</td>
                                        <td>
                                             <span className="text-primary cursor-pointer">
                                                  {item.name}
                                             </span>
                                        </td>
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

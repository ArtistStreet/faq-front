interface IProps {
     page: number;
     total: number;
     limit: number;
     setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ page, total, limit, setPage }: IProps) {
     return (
          < div className="d-flex justify-content-center mt-4" >
               <nav>
                    <ul className="pagination">
                         <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => setPage(page - 1)}>Trước</button>
                         </li>

                         {/* Hiển thị vài trang quanh trang hiện tại */}
                         {[...Array(5)].map((_, i) => {
                              const p = page - 2 + i;
                              if (p < 1 || p > Math.ceil(total / limit)) return null;
                              return (
                                   <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setPage(p)}>
                                             {p}
                                        </button>
                                   </li>
                              );
                         })}

                         <li className={`page-item ${page >= Math.ceil(total / limit) ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => setPage(page + 1)}>Sau</button>
                         </li>
                    </ul>
               </nav>
          </ div>
     )
}
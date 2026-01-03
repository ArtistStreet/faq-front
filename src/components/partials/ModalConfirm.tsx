import classNames from 'classnames';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleModalOpen } from 'utils/common';

interface IProps {
     show: boolean;
     text: string;
     btnDisabled?: boolean;
     changeShow: (s: boolean) => void;
     submitAction: () => void;
}

export default function ModalConfirm({ show, text, btnDisabled, changeShow, submitAction }: Readonly<IProps>) {
     useLayoutEffect(() => toggleModalOpen(show), [show]);
     const { t } = useTranslation();

     return (
          <>
               <div
                    className={classNames('modal fade modal-danger text-start', { show })}
                    style={{ display: show ? 'block' : 'none' }}
               >
                    <div className="modal-dialog modal-dialog-centered">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h5 className="modal-title">Xác nhận</h5>
                                   <button type="button" className="btn-close" onClick={() => changeShow(false)} />
                              </div>
                              <div className="modal-body">{text}</div>
                              <div className="modal-footer">
                                   <button
                                        type="button"
                                        className="btn btn-danger"
                                        disabled={btnDisabled}
                                        onClick={submitAction}
                                   >
                                        Đồng ý
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
               {show && <div className="modal-backdrop fade show" />}
          </>
     );
}

import { ReactNode, useState } from 'react';

interface TabProps {
     faq?: ReactNode;
     group?: ReactNode;
}

export default function Tab({ group, faq }: TabProps) {
     const [activeTab, setActiveTab] = useState<'manage' | 'faq'>('faq');

     return (
          <div className="container py-4">
               {/* Nav tabs */}
               <ul className="nav nav-tabs mb-4" role="tablist">
                    <li className="nav-item" role="presentation">
                         <button
                              className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                              onClick={() => setActiveTab('faq')}
                              type="button"
                              role="tab"
                         >
                              Quản lý
                         </button>
                    </li>
                    <li className="nav-item" role="presentation">
                         <button
                              className={`nav-link ${activeTab === 'manage' ? 'active' : ''}`}
                              onClick={() => setActiveTab('manage')}
                              type="button"
                              role="tab"
                         >
                              Faq
                         </button>
                    </li>
               </ul>

               {/* Tab content */}
               <div className="tab-content">
                    <div
                         className={`tab-pane fade ${activeTab === 'manage' ? 'show active' : ''}`}
                         role="tabpanel"
                    >
                         {faq}
                    </div>

                    <div
                         className={`tab-pane fade ${activeTab === 'faq' ? 'show active' : ''}`}
                         role="tabpanel"
                    >
                         {group}
                    </div>
               </div>
          </div>
     );
}
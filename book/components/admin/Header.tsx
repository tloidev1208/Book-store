import React from 'react';
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
    
        return <header className="admin-header">
          <div>
           <h2 className="text-2xl font-semibold text-dark-400">
            {session?.user?.name}
            </h2> 
           <p className="text-base text-slate-500">
            Theo dõi tất cả người dùng và sách của bạn tại đây!
            </p>
            </div>  

           {/*<p>Tìm kiếm</p>*/} 

        </header>
    
};

export default Header;
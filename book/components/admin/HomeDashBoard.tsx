import React from 'react';

const HomeDashBoard = () => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-8 rounded-lg shadow-md text-left">
                    <h2 className="text-lg font-sans text-gray-600 ">Tổng số sách</h2>
                    <p className="text-3xl font-semibold">1200</p>
                </div>
                <div className="bg-white text-black p-6 rounded-lg shadow-md text-left">
                    <h2 className="text-lg font-sans text-gray-600">User</h2>
                    <p className="text-3xl font-semibold">1200</p>
                </div>
                <div className="bg-white text-black p-6 rounded-lg shadow-md text-left">
                    <h2 className="text-lg font-sans text-gray-600">Yêu cầu mượn sách</h2>
                    <p className="text-3xl font-semibold">1200</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">Yêu cầu mượn sách</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-4 bg-[#e4e9f0] p-4 rounded-md">
                            <img src="https://drive.google.com/uc?export=view&id=1cjQVUqTTCHTnG3aa8q3YkXW_soXQOBbg" alt="Sách X" className="w-12 h-12 rounded-md" />
                            <div>
                                <p className="font-semibold">Sách X</p>
                                <p className="text-sm text-gray-600">Tác giả: A</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=UserA" alt="User A" className="w-8 h-8 rounded-full" />
                                    <p className="text-sm">User A - 01/04/2025</p>
                                </div>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4 bg-[#e4e9f0] p-4 rounded-md">
                            <img src="https://via.placeholder.com/50" alt="Sách Y" className="w-12 h-12 rounded-md" />
                            <div>
                                <p className="font-semibold">Sách Y</p>
                                <p className="text-sm text-gray-600">Tác giả: B</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=UserB" alt="User B" className="w-8 h-8 rounded-full" />
                                    <p className="text-sm">User B - 02/04/2025</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">Sách mới thêm</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/50" alt="Sách 1" className="w-12 h-12 rounded-md" />
                            <div>
                                <p className="font-semibold">Sách 1</p>
                                <p className="text-sm text-gray-600">Tác giả: X</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/50" alt="Sách 2" className="w-12 h-12 rounded-md" />
                            <div>
                                <p className="font-semibold">Sách 2</p>
                                <p className="text-sm text-gray-600">Tác giả: Y</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomeDashBoard;
const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full">
            <div className="p-6 text-2xl font-bold">Admin Panel</div>
            <ul>
                <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveSection('doctors')}>
                    Manage Doctors
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveSection('users')}>
                    Manage Users
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveSection('staff')}>
                    Manage Staff
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

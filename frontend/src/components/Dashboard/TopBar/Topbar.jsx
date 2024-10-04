const Topbar = () => {
    return (
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Admin" className="rounded-full w-10 h-10" />
                <span className="ml-2">Admin</span>
            </div>
        </div>
    );
};

export default Topbar;

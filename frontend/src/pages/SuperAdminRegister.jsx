import { useState } from "react";
import axios from "axios";

export const SuperAdminRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const res = await axios.post("http://localhost:5000/api/admin/register", {
                username,
                password,
            });
            if (res.status === 201) {
                setSuccess(true);
                setUsername("");
                setPassword("");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 shadow-md rounded">
                <h1 className="text-2xl font-semibold mb-4">Admin Registration</h1>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Admin registered successfully!</p>}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <button type="submit"  className="bg-blue-500 text-white p-2 w-full rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

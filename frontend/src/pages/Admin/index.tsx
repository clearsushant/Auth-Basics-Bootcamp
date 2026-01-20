import { useApi } from "../../hooks/useApi";
import { useState, useEffect } from "react";

const Admin = () => {
    const { apiFetch } = useApi();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await apiFetch("/admin");
                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                } else {
                    setMessage("Failed to fetch admin data");
                }
            } catch (error) {
                setMessage("Error fetching admin data");
            }
        };

        fetchAdminData();
    }, [apiFetch]);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Admin Dashboard</h1>
            <p>{message}</p>
            <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h3>Admin Controls</h3>
                <p>Only users with ADMIN role can see this page.</p>
                <p>This is where you would put user management, system configs, etc.</p>
            </div>
        </div>
    );
};

export default Admin;

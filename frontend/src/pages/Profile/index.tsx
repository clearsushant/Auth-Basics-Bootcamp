import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { getUser } from "../../utils";
import styles from "./Profile.module.css";

type User = {
  username: string;
  role: string;
};

type ProfileData = {
  users: User[];
};

const Profile = () => {
  const { apiFetch } = useApi();
  const currentUser = getUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiFetch("/profile");

        if (!response.ok) {
          if (response.status !== 401) {
            const data = await response.json();
            throw new Error(data.error || "Failed to fetch profile");
          }
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiFetch]);

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!profileData) {
    return null;
  }

  const isAdmin = currentUser?.role === "admin";
  const myProfile = profileData.users.find((u) => u.username === currentUser?.username) || profileData.users[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>

      <div className={styles.card}>
        <p className={styles.label}>Username</p>
        <p className={styles.value}>{myProfile.username}</p>
        <p className={styles.label}>Role</p>
        <p className={styles.value}>{myProfile.role}</p>
      </div>

      {isAdmin && profileData.users.length > 1 && (
        <>
          <h2 className={styles.subtitle}>All Users</h2>
          <div className={styles.userList}>
            {profileData.users
              .filter((user) => user.username !== currentUser?.username)
              .map((user) => (
                <div key={user.username} className={styles.userItem}>
                  <span className={styles.userName}>{user.username}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

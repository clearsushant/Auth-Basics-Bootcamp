import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { getUser, removeUser } from "../../utils";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  const navigate = useNavigate();
  const { apiFetch } = useApi();
  const user = getUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await apiFetch("/logout", { method: "POST" });
    removeUser();
    setIsOpen(false);
    navigate("/products");
  };

  return (
    <header className={styles.header}>
      <Link to="/products" className={styles.logo}>
        Store
      </Link>
      <nav className={styles.nav}>
        <Link to="/products" className={styles.navLink}>
          Products
        </Link>
        <Link to="/cart" className={styles.navLink}>
          Cart
        </Link>
        {user ? (
          <div className={styles.userMenu} ref={menuRef}>
            <button
              className={styles.userBtn}
              onClick={() => setIsOpen(!isOpen)}
            >
              {user.username}
              <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className={styles.dropdown}>
                <Link
                  to="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className={styles.dropdownItem}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default AppHeader;

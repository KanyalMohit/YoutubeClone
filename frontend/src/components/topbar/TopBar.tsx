import React from "react";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>MyTube</div>
      <form className={styles.searchForm} onSubmit={e => e.preventDefault()}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
        />
        <button className={styles.searchButton} type="submit" aria-label="Search">
          <svg width="22" height="22" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
      </form>
      <div className={styles.avatar}>
        <svg width="32" height="32" fill="#333" stroke="#fff" strokeWidth="2"><circle cx="16" cy="12" r="7"/><ellipse cx="16" cy="26" rx="10" ry="6"/></svg>
      </div>
    </header>
  );
} 
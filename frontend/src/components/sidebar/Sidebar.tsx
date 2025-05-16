import React from "react";
import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Home", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
  ) },
  { label: "Shorts", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>
  ) },
  { label: "Subscriptions", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
  ) },
  { label: "Library", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 3v2"/><path d="M15 3v2"/></svg>
  ) },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className={styles.navItem}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, borderRight: "1px solid #ddd", padding: 20 }}>
        <h2
          style={{
            color: "rgb(70, 163, 88)",
            fontWeight: "bold",
            fontSize: "28px",
            marginBottom: "20px",
            borderBottom: "2px solid rgb(70, 163, 88)",
            paddingBottom: 20,
          }}
        >
          Admin
        </h2>
        <nav>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              color: "rgb(70, 163, 88)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="orders">Orders</Link>
            </li>
            <li>
              <Link to="products">Products</Link>
            </li>
            <li>
              <Link to="categories">Categories</Link>
            </li>
            <li>
              <Link to="users">Users</Link>
            </li>
            <li>
              <Link to="request">Request</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

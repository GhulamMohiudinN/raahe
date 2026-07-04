"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiOutlineSearch,
  HiOutlineLogout,
  HiOutlineRefresh,
} from "react-icons/hi";
import { useAdminStore } from "@/store/useAdminStore";
import { fetchOrders, updateOrderStatus } from "@/lib/orders";
import { fetchContactMessages } from "@/lib/contactMessages";
import { formatPrice } from "@/data/products";

const STATUS_OPTIONS = ["all", "pending", "processing", "fulfilled", "cancelled"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  const logout = useAdminStore((state) => state.logout);

  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState(null);
  const [messageQuery, setMessageQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data || []);
    } catch (err) {
      setError(
        err?.message ||
        "Could not load orders. Confirm your Supabase credentials in .env.local and that the orders table exists."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    setMessagesLoading(true);
    setMessagesError(null);
    try {
      const data = await fetchContactMessages();
      setMessages(data || []);
    } catch (err) {
      setMessagesError(
        err?.message ||
        "Could not load messages. Confirm the contact_messages table exists in Supabase (see supabase/contact_messages.sql)."
      );
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
      loadMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const filteredMessages = useMemo(() => {
    if (!messageQuery.trim()) return messages;
    const q = messageQuery.trim().toLowerCase();
    return messages.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.phone?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
    );
  }, [messages, messageQuery]);

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) =>
          o.customer_name?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q) ||
          o.phone?.toLowerCase().includes(q) ||
          o.id?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, query, statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err?.message || "Could not update order status");
    }
  };

  const handleLogout = () => {
    logout();
    router.replace("/admin");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cream-dark/30 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow mb-1">Admin Console</p>
            <h1 className="heading-serif text-3xl sm:text-4xl">
              {activeTab === "orders" ? "Orders Dashboard" : "Contact Messages"}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => (activeTab === "orders" ? loadOrders() : loadMessages())}
              className="flex items-center gap-2 border border-teal/20 px-4 py-2 font-body text-xs uppercase tracking-widest2 text-teal hover:bg-teal hover:text-cream"
            >
              <HiOutlineRefresh className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-teal/20 px-4 py-2 font-body text-xs uppercase tracking-widest2 text-teal hover:bg-teal hover:text-cream"
            >
              <HiOutlineLogout className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-teal/10">
          {[
            { key: "orders", label: `Orders (${orders.length})` },
            { key: "messages", label: `Messages (${messages.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 font-body text-xs uppercase tracking-widest2 transition-colors ${activeTab === tab.key
                  ? "border-b-2 border-teal text-teal-dark"
                  : "text-ink/40 hover:text-teal"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "orders" && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Total Orders" value={orders.length} />
              <StatCard
                label="Pending"
                value={orders.filter((o) => o.status === "pending").length}
              />
              <StatCard
                label="Fulfilled"
                value={orders.filter((o) => o.status === "fulfilled").length}
              />
              <StatCard
                label="Total Items"
                value={orders.reduce((sum, o) => sum + (o.total_items || 0), 0)}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full border px-4 py-1.5 font-body text-xs capitalize tracking-wide transition-colors ${statusFilter === status
                        ? "border-teal bg-teal text-cream"
                        : "border-teal/20 text-teal/70 hover:border-teal"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, email, phone, or ID..."
                  className="w-full border border-teal/20 bg-cream-light py-2.5 pl-11 pr-4 font-body text-sm outline-none focus:border-teal"
                />
              </div>
            </div>

            <div className="mt-8 overflow-x-auto border border-teal/10 bg-cream-light">
              {loading ? (
                <div className="p-16 text-center font-body text-sm text-ink/50">
                  Loading orders...
                </div>
              ) : error ? (
                <div className="p-16 text-center font-body text-sm text-red-500">
                  {error}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-16 text-center font-body text-sm text-ink/50">
                  No orders found.
                </div>
              ) : (
                <table className="w-full min-w-[1000px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-teal/10 bg-cream-dark/40">
                      {[
                        "Order ID",
                        "Customer",
                        "Email",
                        "Phone",
                        "Address",
                        "Products",
                        "Qty",
                        "Status",
                        "Date",
                      ].map((h) => (
                        <th
                          key={h}
                          className="whitespace-nowrap px-5 py-4 font-body text-[10px] uppercase tracking-widest2 text-teal-dark/70"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-teal/5 font-body text-sm text-ink/80 hover:bg-cream-dark/20"
                      >
                        <td className="whitespace-nowrap px-5 py-4 text-xs text-ink/50">
                          {order.id?.slice(0, 8)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-teal-dark">
                          {order.customer_name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">{order.email}</td>
                        <td className="whitespace-nowrap px-5 py-4">{order.phone}</td>
                        <td className="max-w-[220px] px-5 py-4">
                          <span className="line-clamp-2">{order.address}</span>
                        </td>
                        <td className="max-w-[260px] px-5 py-4">
                          <ProductsCell products={order.products} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-center">
                          {order.total_items}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className={`border px-2 py-1 text-xs capitalize outline-none ${statusColor(
                              order.status
                            )}`}
                          >
                            {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs text-ink/50">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeTab === "messages" && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Total Messages" value={messages.length} />
              <StatCard
                label="Today"
                value={
                  messages.filter(
                    (m) =>
                      m.created_at &&
                      new Date(m.created_at).toDateString() ===
                      new Date().toDateString()
                  ).length
                }
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <div className="relative w-full sm:w-72">
                <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal/50" />
                <input
                  type="text"
                  value={messageQuery}
                  onChange={(e) => setMessageQuery(e.target.value)}
                  placeholder="Search by name, email, phone, or message..."
                  className="w-full border border-teal/20 bg-cream-light py-2.5 pl-11 pr-4 font-body text-sm outline-none focus:border-teal"
                />
              </div>
            </div>

            <div className="mt-8 overflow-x-auto border border-teal/10 bg-cream-light">
              {messagesLoading ? (
                <div className="p-16 text-center font-body text-sm text-ink/50">
                  Loading messages...
                </div>
              ) : messagesError ? (
                <div className="p-16 text-center font-body text-sm text-red-500">
                  {messagesError}
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-16 text-center font-body text-sm text-ink/50">
                  No messages found.
                </div>
              ) : (
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-teal/10 bg-cream-dark/40">
                      {["ID", "Name", "Email", "Phone", "Message", "Date"].map(
                        (h) => (
                          <th
                            key={h}
                            className="whitespace-nowrap px-5 py-4 font-body text-[10px] uppercase tracking-widest2 text-teal-dark/70"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((msg) => (
                      <tr
                        key={msg.id}
                        className="border-b border-teal/5 font-body text-sm text-ink/80 hover:bg-cream-dark/20"
                      >
                        <td className="whitespace-nowrap px-5 py-4 text-xs text-ink/50">
                          {msg.id?.slice(0, 8)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-teal-dark">
                          {msg.name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">{msg.email}</td>
                        <td className="whitespace-nowrap px-5 py-4">
                          {msg.phone || "—"}
                        </td>
                        <td className="max-w-[320px] px-5 py-4">
                          <span className="line-clamp-2">{msg.message}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs text-ink/50">
                          {msg.created_at
                            ? new Date(msg.created_at).toLocaleString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-teal/10 bg-cream-light p-5">
      <p className="eyebrow text-[10px]">{label}</p>
      <p className="mt-2 font-display text-3xl text-teal-dark">{value}</p>
    </div>
  );
}

function ProductsCell({ products }) {
  if (!Array.isArray(products)) return <span>—</span>;
  return (
    <div className="space-y-0.5">
      {products.map((p, i) => (
        <p key={i} className="text-xs text-ink/70">
          {p.name} × {p.quantity}{" "}
          <span className="text-ink/40">
            ({formatPrice(p.price * p.quantity)})
          </span>
        </p>
      ))}
    </div>
  );
}

function statusColor(status) {
  switch (status) {
    case "fulfilled":
      return "border-green-600/30 bg-green-50 text-green-700";
    case "processing":
      return "border-gold/40 bg-gold-light/30 text-gold-dark";
    case "cancelled":
      return "border-red-300 bg-red-50 text-red-600";
    default:
      return "border-teal/20 bg-cream text-teal";
  }
}
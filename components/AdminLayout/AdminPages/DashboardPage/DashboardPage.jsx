"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiUsers,
  FiShoppingBag,
  FiCreditCard,
  FiArrowRight,
  FiBox,
  FiTrendingUp,
  FiClock,
  FiX,
} from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AdminLayout from "../../AdminLayout";
import api from "@/components/utils/Api/api";
import StatCard from "./StatCard/StatCard";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const DashboardPage = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [paidOrders, setPaidOrders] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [failedPayments, setFailedPayments] = useState(0);

  const [recentOrders, setRecentOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prod, stock, users, analytics, orders] = await Promise.all([
          api.get("/products/get-all"),
          api.get("/products/get-stock"),
          api.get("/users/get-all"),
          api.get("/orders/analytics"),
          api.get("/orders/get-all"),
        ]);

        // Basic stats
        setTotalProducts(prod.data.total || 0);
        setTotalStock(stock.data.totalStock || 0);
        setTotalUsers(users.data.totalUsers || 0);

        // Analytics
        const summary = analytics.data.summary;

        setTotalRevenue(summary.totalRevenue || 0);
        setTotalOrders(summary.totalOrders || 0);
        setPaidOrders(summary.paidOrders || 0);
        setPendingPayments(summary.pendingPayments || 0);
        setFailedPayments(summary.failedPayments || 0);

        setDailyRevenue(analytics.data.dailyRevenue || []);
        setPaymentMethods(analytics.data.paymentMethods || []);

        // Recent Orders
        setRecentOrders(
          orders.data.orders.slice(0, 5).map((o) => ({
            name: o.user?.name || "User",
            order: o._id.slice(-6).toUpperCase(),
            status: o.orderStatus,
            amount: o.totalAmount,
          }))
        );
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // Format Pie Data
  const paymentData = paymentMethods.map((item) => ({
    name: item._id?.toUpperCase(),
    value: item.count,
  }));

  const stats = [
    {
      title: "Revenue",
      value: `NRs. ${totalRevenue.toLocaleString()}`,
      icon: <FiCreditCard />,
      color: "bg-blue-600",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: <FiShoppingBag />,
      color: "bg-rose-500",
    },
    {
      title: "Paid",
      value: paidOrders,
      icon: <FiTrendingUp />,
      color: "bg-emerald-500",
    },
    {
      title: "Pending",
      value: pendingPayments,
      icon: <FiClock />,
      color: "bg-amber-500",
    },
    {
      title: "Failed",
      value: failedPayments,
      icon: <FiX />,
      color: "bg-red-500",
    },
    {
      title: "Users",
      value: totalUsers,
      icon: <FiUsers />,
      color: "bg-indigo-600",
    },
    {
      title: "Stock",
      value: totalStock,
      icon: <FaBoxOpen />,
      color: "bg-yellow-500",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: <FiBox />,
      color: "bg-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 space-y-6 sm:space-y-10 pb-10">

        {/* HEADER */}
        <header className="flex flex-col gap-2 sm:gap-4">
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
            Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Welcome back, here is what's happening today.
          </p>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">

          {/* Revenue Chart */}
          <div className="xl:col-span-3 bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 shadow-sm">
            <h4 className="text-sm sm:text-xl font-bold mb-3 sm:mb-6">
              Revenue Dynamics
            </h4>

            <div className="h-[220px] sm:h-[350px]">
              <ResponsiveContainer>
                <AreaChart data={dailyRevenue}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    fill="url(#colorRev)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 shadow-sm">
            <h4 className="text-sm sm:text-xl font-bold mb-3 sm:mb-6">
              Payment Methods
            </h4>

            <div className="h-[200px] sm:h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-900 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 text-white xl:col-span-2">
            <div className="flex justify-between mb-4 sm:mb-6">
              <h4 className="text-sm sm:text-xl">Recent Sales</h4>
              <span className="text-xs sm:text-sm">
                {recentOrders.length} New
              </span>
            </div>

            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex justify-between py-2 sm:py-3 border-b border-white/10 text-xs sm:text-sm"
              >
                <div>
                  <p className="font-medium">{order.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    #{order.order}
                  </p>
                </div>
                <div className="text-right">
                  <p>NRs. {order.amount}</p>
                  <span className="text-[10px] sm:text-xs opacity-80">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}

            <Link
              href="/admin/orders"
              className="block mt-4 sm:mt-6 text-center text-xs sm:text-sm"
            >
              View All <FiArrowRight className="inline ml-1" />
            </Link>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
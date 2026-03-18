// "use client";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Users,
//   UserPlus,
//   BookOpen,
//   FileText,
//   IndianRupee,
//   Activity,
//   CheckCircle,
//   TicketPercent,
//   AlertCircle,
// } from "lucide-react";

// const COLORS = [
//   "#1d4ed8",
//   "#2563eb",
//   "#3b82f6",
//   "#60a5fa",
//   "#93c5fd",
//   "#bfdbfe",
// ];

// const data = {
//   overview: {
//     totalStudents: 63,
//     newStudentsThisMonth: 17,
//     publishedCourses: 0,
//     draftCourses: 1,
//     activeEnrollments: 0,
//     completedEnrollments: 0,
//     totalRevenue: 0,
//     revenueThisMonth: 0,
//     failedPayments: 0,
//     newContactMessages: 4,
//   },

//   revenueTrend: [
//     { date: "10 Mar", revenue: 1200 },
//     { date: "11 Mar", revenue: 900 },
//     { date: "12 Mar", revenue: 1500 },
//     { date: "13 Mar", revenue: 700 },
//     { date: "14 Mar", revenue: 1100 },
//     { date: "15 Mar", revenue: 1300 },
//   ],

//   enrollmentTrend: [
//     { date: "10 Mar", enrollments: 4 },
//     { date: "11 Mar", enrollments: 6 },
//     { date: "12 Mar", enrollments: 3 },
//     { date: "13 Mar", enrollments: 5 },
//     { date: "14 Mar", enrollments: 7 },
//     { date: "15 Mar", enrollments: 2 },
//   ],

//   latestContactMessages: [
//     {
//       id: 1,
//       fullName: "Joshwa Antony",
//       email: "joshwava1997@gmail.com",
//       subject: "General Inquiry",
//       status: "NEW",
//       createdAt: "2026-03-12",
//     },
//     {
//       id: 2,
//       fullName: "Albin",
//       email: "albin@123.com",
//       subject: "General Inquiry",
//       status: "NEW",
//       createdAt: "2026-03-11",
//     },
//   ],

//   ops: {
//     activeCoupons: 10,
//     couponsExpiringSoon: 5,
//     pendingPayments: 0,
//   },
// };

// export default function Dashboard() {
//   const { overview, revenueTrend, enrollmentTrend, latestContactMessages, ops } =
//     data;

//   return (
//     <div className="h-screen bg-slate-100 p-8">
//       <h1 className="mb-8 text-3xl font-bold text-slate-800">
//         Admin Dashboard
//       </h1>

//       {/* STAT CARDS */}
//       <div className="mb-10 grid gap-6 md:grid-cols-4">
//         <Card
//           title="Total Students"
//           value={overview.totalStudents}
//           icon={<Users size={22} />}
//         />
//         <Card
//           title="New Students"
//           value={overview.newStudentsThisMonth}
//           icon={<UserPlus size={22} />}
//         />
//         <Card
//           title="Published Courses"
//           value={overview.publishedCourses}
//           icon={<BookOpen size={22} />}
//         />
//         <Card
//           title="Draft Courses"
//           value={overview.draftCourses}
//           icon={<FileText size={22} />}
//         />
//         <Card
//           title="Total Revenue"
//           value={`₹${overview.totalRevenue}`}
//           icon={<IndianRupee size={22} />}
//         />
//         <Card
//           title="Revenue This Month"
//           value={`₹${overview.revenueThisMonth}`}
//           icon={<Activity size={22} />}
//         />
//         <Card
//           title="Active Enrollments"
//           value={overview.activeEnrollments}
//           icon={<Users size={22} />}
//         />
//         <Card
//           title="Completed Enrollments"
//           value={overview.completedEnrollments}
//           icon={<CheckCircle size={22} />}
//         />
//       </div>

//       {/* CHARTS */}
//       <div className="mb-10 grid gap-8 md:grid-cols-2">
//         {/* Revenue Pie Chart */}
//         <div className="rounded-2xl bg-white p-6 shadow">
//           <h2 className="mb-4 font-semibold text-slate-700">
//             Revenue Distribution
//           </h2>

//           <ResponsiveContainer width="100%" height={280}>
//             <PieChart>
//               <Pie
//                 data={revenueTrend}
//                 dataKey="revenue"
//                 nameKey="date"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={95}
//                 paddingAngle={3}
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {revenueTrend.map((entry, index) => (
//                   <Cell
//                     key={`revenue-cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Enrollment Pie Chart */}
//         <div className="rounded-2xl bg-white p-6 shadow">
//           <h2 className="mb-4 font-semibold text-slate-700">
//             Enrollment Distribution
//           </h2>

//           <ResponsiveContainer width="100%" height={280}>
//             <PieChart>
//               <Pie
//                 data={enrollmentTrend}
//                 dataKey="enrollments"
//                 nameKey="date"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={95}
//                 paddingAngle={3}
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {enrollmentTrend.map((entry, index) => (
//                   <Cell
//                     key={`enrollment-cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => [value, "Enrollments"]} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* CONTACT TABLE */}
//       <div className="mb-10 rounded-2xl bg-white p-6 shadow">
//         <h2 className="mb-4 font-semibold text-slate-700">
//           Latest Contact Messages
//         </h2>

//         <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

//   <div className="overflow-x-auto">

//     <table className="w-full text-sm">

//       {/* TABLE HEADER */}

//       <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">

//         <tr>
//           <th className="px-6 py-4 text-left">User</th>
//           <th className="px-6 py-4 text-left">Email</th>
//           <th className="px-6 py-4 text-left">Subject</th>
//           <th className="px-6 py-4 text-left">Status</th>
//           <th className="px-6 py-4 text-left">Date</th>
//         </tr>

//       </thead>

//       {/* TABLE BODY */}

//       <tbody className="divide-y divide-slate-100">

//         {latestContactMessages.map((msg) => {

//           const initials = msg.fullName
//             .split(" ")
//             .map((n) => n[0])
//             .join("");

//           return (

//             <tr
//               key={msg.id}
//               className="hover:bg-blue-50 transition-colors"
//             >

//               {/* NAME */}

//               <td className="px-6 py-4 flex items-center gap-3">

//                 <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-xs">

//                   {initials}

//                 </div>

//                 <span className="font-medium text-slate-800">
//                   {msg.fullName}
//                 </span>

//               </td>

//               {/* EMAIL */}

//               <td className="px-6 py-4 text-slate-600">
//                 {msg.email}
//               </td>

//               {/* SUBJECT */}

//               <td className="px-6 py-4 text-slate-600">
//                 {msg.subject}
//               </td>

//               {/* STATUS */}

//               <td className="px-6 py-4">

//                 <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">

//                   {msg.status}

//                 </span>

//               </td>

//               {/* DATE */}

//               <td className="px-6 py-4 text-slate-500">

//                 {msg.createdAt}

//               </td>

//             </tr>

//           );

//         })}

//       </tbody>

//     </table>

//   </div>

// </div>
//       </div>

//       {/* OPERATIONS */}
//       <div className="grid gap-6 md:grid-cols-3">
//         <Card
//           title="Active Coupons"
//           value={ops.activeCoupons}
//           icon={<TicketPercent size={22} />}
//         />
//         <Card
//           title="Coupons Expiring Soon"
//           value={ops.couponsExpiringSoon}
//           icon={<AlertCircle size={22} />}
//         />
//         <Card
//           title="Pending Payments"
//           value={ops.pendingPayments}
//           icon={<IndianRupee size={22} />}
//         />
//       </div>
//     </div>
//   );
// }

// function Card({ title, value, icon }) {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-slate-500">{title}</p>
//           <h2 className="mt-2 text-2xl font-bold text-slate-800">{value}</h2>
//         </div>

//         <div className="rounded-xl bg-blue-100 p-3 text-blue-600 shadow-sm">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  UserPlus,
  BookOpen,
  FileText,
  IndianRupee,
  Activity,
  CheckCircle,
  TicketPercent,
  AlertCircle,
} from "lucide-react";
import useAdminDashboardStore from "@/store/useAdminDashboardApi";

const COLORS = [
  "#1d4ed8",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
];

export default function Dashboard() {
  const { dashboard, loading, error, fetchDashboard } = useAdminDashboardStore();

  const {
    overview = {},
    revenueTrend = [],
    enrollmentTrend = [],
    latestContactMessages = [],
    ops = {},
  } = dashboard;

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const revenuePieData = revenueTrend.filter((item) => item.revenue > 0);
  const enrollmentPieData = enrollmentTrend.filter(
    (item) => item.enrollments > 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="mb-8 text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>
        <div className="rounded-2xl bg-white p-6 shadow text-slate-600">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="mb-8 text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">
        Admin Dashboard
      </h1>

      {/* STAT CARDS */}
      <div className="mb-10 grid gap-6 md:grid-cols-4">
        <Card
          title="Total Students"
          value={overview.totalStudents ?? 0}
          icon={<Users size={22} />}
        />
        <Card
          title="New Students"
          value={overview.newStudentsThisMonth ?? 0}
          icon={<UserPlus size={22} />}
        />
        <Card
          title="Published Courses"
          value={overview.publishedCourses ?? 0}
          icon={<BookOpen size={22} />}
        />
        <Card
          title="Draft Courses"
          value={overview.draftCourses ?? 0}
          icon={<FileText size={22} />}
        />
        <Card
          title="Total Revenue"
          value={`₹${overview.totalRevenue ?? 0}`}
          icon={<IndianRupee size={22} />}
        />
        <Card
          title="Revenue This Month"
          value={`₹${overview.revenueThisMonth ?? 0}`}
          icon={<Activity size={22} />}
        />
        <Card
          title="Active Enrollments"
          value={overview.activeEnrollments ?? 0}
          icon={<Users size={22} />}
        />
        <Card
          title="Completed Enrollments"
          value={overview.completedEnrollments ?? 0}
          icon={<CheckCircle size={22} />}
        />
      </div>

      {/* CHARTS */}
      <div className="mb-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 font-semibold text-slate-700">
            Revenue Distribution
          </h2>

          {revenuePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={revenuePieData}
                  dataKey="revenue"
                  nameKey="shortDate"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {revenuePieData.map((_, index) => (
                    <Cell
                      key={`revenue-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-slate-500">
              No revenue data available
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 font-semibold text-slate-700">
            Enrollment Distribution
          </h2>

          {enrollmentPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={enrollmentPieData}
                  dataKey="enrollments"
                  nameKey="shortDate"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {enrollmentPieData.map((_, index) => (
                    <Cell
                      key={`enrollment-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Enrollments"]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-slate-500">
              No enrollment data available
            </div>
          )}
        </div>
      </div>

      {/* CONTACT TABLE */}
      <div className="mb-10 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 font-semibold text-slate-700">
          Latest Contact Messages
        </h2>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Subject</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {latestContactMessages.length > 0 ? (
                  latestContactMessages.map((msg) => {
                    const initials = msg.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={msg.id}
                        className="transition-colors hover:bg-blue-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                              {initials}
                            </div>
                            <span className="font-medium text-slate-800">
                              {msg.fullName}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {msg.email}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {msg.subject}
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={msg.status} />
                        </td>

                        <td className="px-6 py-4 text-slate-500">
                          {formatDisplayDate(msg.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No contact messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* OPERATIONS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card
          title="Active Coupons"
          value={ops.activeCoupons ?? 0}
          icon={<TicketPercent size={22} />}
        />
        <Card
          title="Coupons Expiring Soon"
          value={ops.couponsExpiringSoon ?? 0}
          icon={<AlertCircle size={22} />}
        />
        <Card
          title="Pending Payments"
          value={ops.pendingPayments ?? 0}
          icon={<IndianRupee size={22} />}
        />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">{value}</h2>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    NEW: "bg-blue-100 text-blue-700",
    READ: "bg-amber-100 text-amber-700",
    REPLIED: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function formatDisplayDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
import { useEffect, useState } from "react";
import api from "../api/api";

function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    pending: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/tickets");

      const tickets = res.data;

      setStats({
        total: tickets.length,
        open: tickets.filter(
          (t) => t.status === "Open"
        ).length,
        closed: tickets.filter(
          (t) => t.status === "Closed"
        ).length,
        pending: tickets.filter(
          (t) => t.status === "Pending"
        ).length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2>Total Tickets</h2>
          <p className="text-4xl font-bold mt-3">
            {stats.total}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2>Open</h2>
          <p className="text-4xl font-bold mt-3 text-green-600">
            {stats.open}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2>Closed</h2>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            {stats.closed}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2>Pending</h2>
          <p className="text-4xl font-bold mt-3 text-orange-600">
            {stats.pending}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setIsLoading(true);

        const res = await api.get("/tickets");

        let data = Array.isArray(res.data) ? res.data : [];

        if (search.trim()) {
          const keyword = search.toLowerCase();

          data = data.filter(
            (ticket) =>
              ticket.ticket_id?.toLowerCase().includes(keyword) ||
              ticket.customer_name?.toLowerCase().includes(keyword) ||
              ticket.subject?.toLowerCase().includes(keyword)
          );
        }

        setTickets(data);
      } catch (err) {
        console.error("Failed to load tickets:", err);
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, [search]);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (x) => x.status === "Open"
  ).length;

  const closedTickets = tickets.filter(
    (x) => x.status === "Closed"
  ).length;

  const pendingTickets = tickets.filter(
    (x) => x.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Manage all customer issues efficiently
              </p>
            </div>

            <div className="flex items-center gap-3">

              <span className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live
              </span>

              <button
                onClick={() => navigate("/create")}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                + New Ticket
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Total Tickets"
            value={totalTickets}
            color="blue"
          />

          <StatCard
            title="Open"
            value={openTickets}
            color="green"
          />

          <StatCard
            title="Closed"
            value={closedTickets}
            color="gray"
          />

          <StatCard
            title="Pending"
            value={pendingTickets}
            color="orange"
          />

        </div>

        {/* Search */}
        <div className="mt-8">

          <div className="relative">

            <input
              className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search tickets by ID, customer, or issue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Tickets */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 overflow-hidden">

          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-semibold text-gray-900">
                All Tickets
              </h2>

              <span className="text-sm text-gray-500">
                {totalTickets} ticket
                {totalTickets !== 1 ? "s" : ""} found
              </span>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Issue
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {isLoading ? (

                  <tr>
                    <td
                      className="px-6 py-8 text-center"
                      colSpan={4}
                    >
                      Loading tickets...
                    </td>
                  </tr>

                ) : tickets.length === 0 ? (

                  <tr>
                    <td
                      className="px-6 py-8 text-center"
                      colSpan={4}
                    >
                      No tickets found
                    </td>
                  </tr>

                ) : (

                  tickets.map((ticket) => (

                    <tr
                      key={ticket.ticket_id}
                      onClick={() =>
                        navigate(
                          `/ticket/${ticket.ticket_id}`
                        )
                      }
                      className="hover:bg-gray-50 cursor-pointer"
                    >

                      <td className="px-6 py-4">

                        <Link
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          to={`/ticket/${ticket.ticket_id}`}
                        >
                          #{ticket.ticket_id}
                        </Link>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {ticket.customer_name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          <span>
                            {ticket.customer_name}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4">
                        {ticket.subject}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge
                          status={ticket.status}
                        />
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await api.get("/tickets");

      console.log("Tickets:", res.data);

      if (Array.isArray(res.data)) {
        setTickets(res.data);
      } else {
        console.error("Expected array:", res.data);
        setTickets([]);
      }
    } catch (err) {
      console.error("Tickets Error:", err);
      setTickets([]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        All Tickets
      </h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Ticket ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr
                  key={ticket.ticket_id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">
                    <Link
                      to={`/ticket/${ticket.ticket_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ticket.ticket_id}
                    </Link>
                  </td>

                  <td className="p-3">
                    {ticket.customer_name}
                  </td>

                  <td className="p-3">
                    {ticket.subject}
                  </td>

                  <td className="p-3">
                    {ticket.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-slate-500"
                >
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
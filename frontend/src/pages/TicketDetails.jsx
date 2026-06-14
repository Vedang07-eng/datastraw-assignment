import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  Mail,
  Tag,
  MessageSquare,
  CheckCircle,
  Trash2,
  Edit3,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "../api/api";
import StatusBadge from "../components/StatusBadge";

function TicketDetails() {
  const { ticketid } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await api.get(`/tickets/${ticketid}`);
        setTicket(res.data);
      } catch (err) {
        console.error("Failed to load ticket:", err);
        setError(err.response?.data?.detail || "Failed to load ticket");
      } finally {
        setIsLoading(false);
      }
    };

    loadTicket();
  }, [ticketid]);

  const changeStatus = async () => {
    try {
      const nextStatus =
        ticket.status === "Open"
          ? "In Progress"
          : ticket.status === "In Progress"
          ? "Closed"
          : "Open";

      const res = await api.put(`/tickets/${ticketid}/status`, {
        status: nextStatus,
      });

      setTicket(res.data);
    } catch (err) {
      console.error("Status update failed:", err);
      alert(err.response?.data?.detail || "Failed to update ticket status");
    }
  };

  const editTicket = async () => {
    const subject = prompt("Edit subject", ticket.subject);
    if (subject === null) return;

    const description = prompt("Edit description", ticket.description);
    if (description === null) return;

    const priority = prompt("Edit priority (Low, Medium, High, Critical)", ticket.priority);
    if (priority === null) return;

    try {
      const res = await api.put(`/tickets/${ticketid}`, {
        subject,
        description,
        priority,
      });

      setTicket(res.data);
      alert("Ticket updated successfully");
    } catch (err) {
      console.error("Ticket update failed:", err);
      alert(err.response?.data?.detail || "Failed to update ticket");
    }
  };

  const deleteTicket = async () => {
    if (!window.confirm("Delete this ticket permanently?")) return;

    try {
      await api.delete(`/tickets/${ticketid}`);
      navigate("/tickets");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.detail || "Failed to delete ticket");
    }
  };

  const emailCustomer = () => {
    if (!ticket?.customeremail) {
      alert("No customer email available");
      return;
    }
    const subject = encodeURIComponent(`Re: ${ticket.subject}`);
    window.location.href = `mailto:${ticket.customeremail}?subject=${subject}`;
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      setIsSubmitting(true);
      await api.post(`/tickets/${ticketid}/notes`, {
        notetext: reply,
      });

      setReply("");
      const res = await api.get(`/tickets/${ticketid}`);
      setTicket(res.data);
    } catch (err) {
      console.error("Reply failed:", err);
      alert(err.response?.data?.detail || "Failed to send reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-gray-900 font-semibold text-lg">{error || "Ticket not found"}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Back</span>
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Ticket {ticket.ticketid}
            </h1>

            <button
              onClick={changeStatus}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              {ticket.status === "Open" ? "Mark as Resolved" : "Reopen Ticket"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-blue-100 text-sm">Ticket Details</p>
                    <h2 className="text-2xl font-bold">{ticket.subject}</h2>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {ticket.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                      <User size={14} />
                      Customer
                    </p>
                    <p className="font-medium text-gray-900">{ticket.customername}</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                      <Mail size={14} />
                      Email
                    </p>
                    <p className="font-medium text-gray-900">
                      {ticket.customeremail || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                      <Tag size={14} />
                      Priority
                    </p>
                    <p className="font-medium text-gray-900">{ticket.priority}</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                      <Clock size={14} />
                      Created
                    </p>
                    <p className="font-medium text-gray-900">
                      {ticket.createdat ? new Date(ticket.createdat).toLocaleString() : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare size={18} />
                  Add Note / Reply
                </h2>
              </div>

              <form onSubmit={handleReply} className="p-6 space-y-4">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={5}
                  placeholder="Write a reply or internal note..."
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !reply.trim()}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-60"
                  >
                    <Send size={16} />
                    {isSubmitting ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                <button
                  onClick={changeStatus}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle size={18} />
                  Change Status
                </button>
                <button
                  onClick={editTicket}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit3 size={18} />
                  Edit Ticket
                </button>
                <button
                  onClick={deleteTicket}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete Ticket
                </button>
                <button
                  onClick={emailCustomer}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Mail size={18} />
                  Email Customer
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                  <div>
                    <p className="font-medium text-gray-900">Ticket Created</p>
                    <p className="text-sm text-gray-500">
                      {ticket.createdat ? new Date(ticket.createdat).toLocaleString() : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <div>
                    <p className="font-medium text-gray-900">Current Status</p>
                    <p className="text-sm text-gray-500">{ticket.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
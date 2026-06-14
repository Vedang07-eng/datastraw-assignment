import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Send,
  ArrowLeft,
} from "lucide-react";

function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    subject: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      console.log("Sending Ticket:", form);

      const response = await api.post("/tickets", form);

      console.log("Created Ticket:", response.data);

      const ticketId = response.data?.ticket_id;

      if (!ticketId) {
        throw new Error("Ticket ID not returned from backend");
      }

      navigate(`/ticket/${ticketId}`);
    } catch (err) {
      console.error("Ticket Creation Error:", err);

      setError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Create Support Ticket
        </h1>

        <p className="mt-3 text-blue-100 max-w-2xl">
          Submit customer issues and track resolution efficiently.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Name
            </label>

            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full rounded-xl border border-slate-300 p-3"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter ticket subject"
              className="w-full rounded-xl border border-slate-300 p-3"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              className="w-full rounded-xl border border-slate-300 p-3"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              <Send size={18} />
              {loading ? "Creating..." : "Create Ticket"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
import { useEffect, useState } from "react";
import api from "../api/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/tickets");

      const uniqueCustomers = [
        ...new Map(
          res.data.map((ticket) => [
            ticket.customer_name,
            ticket,
          ])
        ).values(),
      ];

      setCustomers(uniqueCustomers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.customer_name}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="font-bold text-lg">
              {customer.customer_name}
            </h3>

            <p className="text-slate-500 mt-2">
              Customer Support User
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
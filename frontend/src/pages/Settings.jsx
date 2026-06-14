import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    companyName: "SupportFlow",
    emailNotifications: true,
    darkMode: false,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="bg-white rounded-2xl shadow p-8 max-w-2xl">

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            value={settings.companyName}
            onChange={(e) =>
              setSettings({
                ...settings,
                companyName: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="mb-6">
          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications:
                    e.target.checked,
                })
              }
            />

            Email Notifications
          </label>
        </div>

        <div className="mb-6">
          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  darkMode: e.target.checked,
                })
              }
            />

            Dark Mode
          </label>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;
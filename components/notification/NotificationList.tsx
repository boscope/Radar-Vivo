import { getNotifications } from "../../src/core/engines/notification/notification-engine";

export default async function NotificationList() {
  const notifications = await getNotifications();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Central de Notificações
      </h2>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between">
              <h3 className="font-bold">
                {n.title}
              </h3>

              <span className="text-sm text-gray-500">
                {n.createdAt}
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              {n.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
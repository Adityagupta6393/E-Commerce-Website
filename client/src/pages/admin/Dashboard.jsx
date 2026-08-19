import {
  Package,
  ShoppingBag,
  Users,
  Tags,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Products",
      value: "Manage",
      icon: Package,
      color: "blue",
    },
    {
      title: "Orders",
      value: "Manage",
      icon: ShoppingBag,
      color: "green",
    },
    {
      title: "Users",
      value: "Manage",
      icon: Users,
      color: "purple",
    },
    {
      title: "Categories",
      value: "Manage",
      icon: Tags,
      color: "orange",
    },
  ];

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome to ShopHub Admin Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    {stat.title}
                  </p>

                  <p className="text-xl font-bold mt-2">
                    {stat.value}
                  </p>
                </div>

                <div className="p-3 bg-gray-100 rounded-xl">
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Welcome Card */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-5 sm:p-6 lg:p-8">

        <h2 className="text-xl font-bold">
          Welcome to ShopHub
        </h2>

        <p className="text-gray-600 mt-2 leading-7">
          Use the sidebar to manage products, categories,
          orders and users.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;
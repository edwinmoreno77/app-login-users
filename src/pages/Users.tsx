import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { usersApi } from "../api/users";
import { User } from "../types/user";
import { motion } from "framer-motion";
import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { AxiosError } from "axios";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const {
    inputRef: containerRef,
    position: containerPosition,
    opacity: containerOpacity,
    handleMouseMove: handleContainerMouseMove,
    handleMouseEnter: handleContainerMouseEnter,
    handleMouseLeave: handleContainerMouseLeave,
  } = useSpotlightBorder<HTMLDivElement>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.getAll();
        console.log("Datos de usuarios recibidos:", response.users);
        setUsers(response.users);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        const errorMessage =
          err instanceof AxiosError
            ? err.response?.data?.message || "Error al cargar los usuarios"
            : "Error al cargar los usuarios";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-800 to-black">
        <div className="text-white text-xl">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-800 to-black">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-white font-poppins">
              Usuarios
            </h1>

            <div className="flex items-center space-x-4">
              <span className="text-gray-300 font-inter">{user?.name}</span>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                  {user?.name ? getUserInitial(user.name) : "?"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          className="bg-black/50 backdrop-blur-sm rounded-2xl shadow shadow-white p-8 relative"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
            style={{
              border: "1.5px solid #ffffff",
              opacity: containerOpacity,
              WebkitMaskImage: `radial-gradient(50% 150px at ${containerPosition.x}px ${containerPosition.y}px, black 45%, transparent)`,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="space-y-4">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between cursor-pointer">
                    <div>
                      <h3 className="text-white font-medium">{user.name}</h3>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="tertiary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </main>
    </div>
  );
};

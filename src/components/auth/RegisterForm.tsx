import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { RegisterFormData } from "../../types/components";
import { AuthSidePanel } from "./AuthSidePanel";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading: authLoading, error: authError } = useAuth();

  const validationRules = {
    name: {
      required: true,
      message: "El nombre es requerido",
    },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      message: "El email no es válido",
    },
    password: {
      required: true,
      minLength: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
    confirmPassword: {
      required: true,
      validate: (value: string, formData: RegisterFormData) =>
        value === formData.password || "Las contraseñas no coinciden",
    },
  };

  const handleSubmit = async (formData: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (error) {
      console.error("Error al registrar:", error);
      throw error;
    }
  };

  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit: handleFormSubmit,
  } = useForm<RegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationRules,
    onSubmit: handleSubmit,
  });

  // Hook for the spotlight effect on the container
  const {
    inputRef: containerRef,
    position: containerPosition,
    opacity: containerOpacity,
    handleMouseMove: handleContainerMouseMove,
    handleMouseEnter: handleContainerMouseEnter,
    handleMouseLeave: handleContainerMouseLeave,
  } = useSpotlightBorder<HTMLDivElement>();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-800">
      {/* Left side - Image and Text */}
      <AuthSidePanel
        title="Crear una cuenta"
        description="Regístrate para comenzar a gestionar tus usuarios"
        imageUrl="https://images.unsplash.com/photo-1672009190560-12e7bade8d09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div
            className="bg-black/50 backdrop-blur-sm rounded-2xl shadow shadow-white p-8 relative"
            ref={containerRef}
            onMouseMove={handleContainerMouseMove}
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
              style={{
                border: "1.5px solid #ffffff",
                opacity: containerOpacity,
                WebkitMaskImage: `radial-gradient(50% 150px at ${containerPosition.x}px ${containerPosition.y}px, black 45%, transparent)`,
              }}
            />
            <div className="text-center mb-8 hover:text-white text-gray-400">
              <div className="flex justify-center items-center">
                <UserIcon className="h-15 w-15 " />
              </div>
              <h2 className="font-poppins text-xl font-bold  mb-2">
                Registro de Usuario
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                className="w-full font-inter bg-black/30 text-white placeholder-gray-400"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
              />

              <Input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                error={errors.email || authError || undefined}
                className="w-full font-inter bg-black/30 text-white placeholder-gray-400"
                icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
              />

              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                className="w-full font-inter bg-black/30 text-white placeholder-gray-400"
                icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              />

              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                className="w-full font-inter bg-black/30 text-white placeholder-gray-400"
                icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              />

              {errors.submit && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center font-inter"
                >
                  {errors.submit}
                </motion.p>
              )}

              <Button
                type="submit"
                variant="tertiary"
                isLoading={isLoading || authLoading}
              >
                Registrarse
              </Button>

              <p className="text-center text-sm text-gray-400 mt-4 font-inter">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-gray-100 hover:text-gray-50 hover:underline font-medium cursor-pointer font-poppins"
                >
                  Inicia sesión
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

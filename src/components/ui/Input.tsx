import { forwardRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { InputProps } from "../../types/ui";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
      inputRef: spotlightRef,
      position,
      opacity,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
    } = useSpotlightBorder<HTMLInputElement>();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const isPassword = type === "password";

    return (
      <div className="relative">
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              spotlightRef.current = node;
            }}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200",
              icon && "pl-10",
              isPassword && "pr-10",
              error && "border-red-500 focus:ring-red-500/50",
              className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          )}
          <div
            className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
            style={{
              border: "1.5px solid #ffffff",
              opacity,
              WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
            }}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 font-inter">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

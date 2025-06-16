import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { useSpotlightBorder } from "../../hooks/useSpotlightBorder";
import { ButtonProps } from "../../types/ui";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const {
      inputRef: buttonRef,
      position,
      opacity,
      handleMouseMove,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
    } = useSpotlightBorder<HTMLButtonElement>();

    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative";

    const variants = {
      primary:
        "w-full bg-gray-800 hover:bg-gray-700 text-white font-poppins font-medium py-2 px-4 rounded-md shadow-sm",
      secondary:
        "w-full bg-gradient-to-br from-stone-600 via-stone-500 to-stone-400 hover:from-stone-300 hover:via-stone-200 hover:to-stone-100 text-white hover:text-black font-poppins font-medium py-2 px-4 rounded-md shadow-sm",
      tertiary:
        "w-full bg-gradient-to-br from-purple-600 via-purple-800 to-blue-950 hover:from-purple-400 hover:via-purple-700 hover:to-purple-800 text-white hover:text-white font-poppins font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-300",
      outline:
        "w-full border text-white hover:text-black border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <div className="relative">
        <button
          ref={(node) => {
            buttonRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            isLoading && "opacity-70 cursor-not-allowed",
            className
          )}
          disabled={isLoading}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : null}
          {children}
        </button>
        <div
          className="pointer-events-none absolute inset-0 rounded-md transition-opacity duration-500"
          style={{
            border: "1.5px solid #ffffff",
            opacity: opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
        />
      </div>
    );
  }
);

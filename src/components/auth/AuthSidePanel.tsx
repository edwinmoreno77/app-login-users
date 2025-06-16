import { AuthSidePanelProps } from "../../types/components";
import { FloatingCircle } from "../ui/FloatingCircle";
import { motion } from "framer-motion";

export const AuthSidePanel = ({
  title,
  description,
  imageUrl,
}: AuthSidePanelProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div className="absolute inset-0 bg-transparent" />
      <div className="relative w-full h-full rounded-r-4xl overflow-hidden group">
        {/* Floating circles */}
        <FloatingCircle
          delay={0}
          size={150}
          color="#C084FC"
          className="top-1/6 left-1/7 z-10"
        />
        <FloatingCircle
          delay={1}
          size={200}
          color="#C084FC"
          className="top-1/3 right-1/8 z-10"
        />
        <FloatingCircle
          delay={2}
          size={120}
          color="#C084FC"
          className="bottom-1/4 left-1/3 z-10"
        />
        <FloatingCircle
          delay={3}
          size={180}
          color="#C084FC"
          className="bottom-1/4 right-1/7 z-10"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 z-20 group-hover:from-black/80 group-hover:to-black/20 transition-colors duration-500" />
        <img
          src={imageUrl}
          alt="Auth background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 z-0"
        />
        <div className="relative z-30 flex items-center justify-center w-full h-full p-12">
          <div className="max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <h1 className="text-4xl font-bold text-white mb-6 font-poppins">
                {title}
              </h1>
              <p className="text-gray-200 text-lg font-inter">{description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { FileImage } from "lucide-react";
import { motion } from "framer-motion";
export const Header = () => {
  return <motion.header initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className="text-center py-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-medium">
          <FileImage className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          ​Conversor Imagens para PDF   
        </h1>
      </div>
      <p className="text-muted-foreground max-w-md mx-auto">
        Combine múltiplas imagens (JPG, JPEG, PNG, WEBP) num único documento PDF. Rápido, simples e sem necessidade de registo.
      </p>
    </motion.header>;
};
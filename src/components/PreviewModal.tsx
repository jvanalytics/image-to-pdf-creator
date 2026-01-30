import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    preview: string;
    file: File;
  } | null;
}

export const PreviewModal = ({ isOpen, onClose, image }: PreviewModalProps) => {
  if (!image) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-lg font-medium truncate">
            {image.file.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(image.file.size)}
          </p>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center p-4 pt-0 max-h-[calc(90vh-100px)] overflow-auto"
        >
          <img
            src={image.preview}
            alt={image.file.name}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface ImageCardProps {
  id: string;
  file: File;
  preview: string;
  onRemove: (id: string) => void;
}

export const ImageCard = ({ id, file, preview, onRemove }: ImageCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`group relative bg-card rounded-lg shadow-soft overflow-hidden ${
        isDragging ? "opacity-50 z-50" : ""
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1.5 rounded-md bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        aria-label="Arrastar para reordenar"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-destructive/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
        aria-label={`Remover ${file.name}`}
      >
        <X className="w-4 h-4 text-destructive-foreground" />
      </button>

      {/* Image Preview */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={preview}
          alt={file.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* File Name */}
      <div className="p-3 border-t border-border">
        <p className="text-sm text-foreground truncate font-medium">
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
    </motion.div>
  );
};

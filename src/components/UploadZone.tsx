import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  isDragActive: boolean;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const UploadZone = ({
  onFilesSelected,
  isDragActive,
  onDragEnter,
  onDragLeave,
  onDrop,
}: UploadZoneProps) => {
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        ACCEPTED_TYPES.includes(file.type)
      );
      if (files.length > 0) {
        onFilesSelected(files);
      }
      e.target.value = "";
    },
    [onFilesSelected]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`upload-zone ${isDragActive ? "upload-zone-active" : ""} p-12 text-center cursor-pointer`}
      onDragEnter={(e) => {
        e.preventDefault();
        onDragEnter();
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault();
        onDragLeave();
      }}
      onDrop={onDrop}
      onClick={() => document.getElementById("file-input")?.click()}
      role="button"
      tabIndex={0}
      aria-label="Zona de upload de imagens"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          document.getElementById("file-input")?.click();
        }
      }}
    >
      <input
        id="file-input"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onChange={handleFileInput}
        className="hidden"
        aria-hidden="true"
      />

      <motion.div
        animate={{ scale: isDragActive ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {isDragActive
              ? "Solte as imagens aqui"
              : "Arraste e solte as imagens"}
          </h3>
          <p className="text-sm text-muted-foreground">
            ou{" "}
            <span className="text-primary font-medium hover:underline">
              clique para selecionar
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <ImageIcon className="w-4 h-4" />
          <span>JPG, JPEG, PNG, WEBP</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

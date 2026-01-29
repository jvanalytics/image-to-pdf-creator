import { useState, useCallback } from "react";
import { ImageFile } from "@/components/ImageGrid";
import { toast } from "sonner";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

export const useImageUpload = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(`Tipo não suportado: ${file.name}`, {
        description: "Apenas JPG, JPEG, PNG e WEBP são aceites.",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Ficheiro muito grande: ${file.name}`, {
        description: "O tamanho máximo por ficheiro é 10MB.",
      });
      return false;
    }

    return true;
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addFiles = useCallback(async (files: File[]) => {
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length === 0) return;

    const newImages: ImageFile[] = await Promise.all(
      validFiles.map(async (file) => ({
        id: generateId(),
        file,
        preview: await createPreview(file),
      }))
    );

    setImages((prev) => [...prev, ...newImages]);
    
    toast.success(
      validFiles.length === 1
        ? "1 imagem adicionada"
        : `${validFiles.length} imagens adicionadas`
    );
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.info("Imagem removida");
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    toast.info("Todas as imagens foram removidas");
  }, []);

  const reorderImages = useCallback((newOrder: ImageFile[]) => {
    setImages(newOrder);
  }, []);

  const handleDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        ACCEPTED_TYPES.includes(file.type)
      );

      if (files.length > 0) {
        addFiles(files);
      }
    },
    [addFiles]
  );

  return {
    images,
    isDragActive,
    addFiles,
    removeImage,
    clearAll,
    reorderImages,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};

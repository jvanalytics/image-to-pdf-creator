import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { ImageGrid } from "@/components/ImageGrid";
import { ActionBar, PageOrientation, FillMode } from "@/components/ActionBar";
import { useImageUpload } from "@/hooks/useImageUpload";
import { generatePDF } from "@/lib/pdfGenerator";

const Index = () => {
  const [fileName, setFileName] = useState("combined-document");
  const [isGenerating, setIsGenerating] = useState(false);
  const [orientation, setOrientation] = useState<PageOrientation>("portrait");
  const [fillMode, setFillMode] = useState<FillMode>("fit");

  const {
    images,
    isDragActive,
    addFiles,
    removeImage,
    clearAll,
    reorderImages,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useImageUpload();

  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      toast.error("Adicione pelo menos uma imagem");
      return;
    }

    setIsGenerating(true);

    try {
      await generatePDF(images, fileName, orientation, fillMode);
      toast.success("PDF gerado com sucesso!", {
        description: "O download começou automaticamente.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF", {
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 pb-16">
        <Header />

        <main className="space-y-6">
          <UploadZone
            onFilesSelected={addFiles}
            isDragActive={isDragActive}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          <ImageGrid
            images={images}
            onReorder={reorderImages}
            onRemove={removeImage}
          />

          <ActionBar
            imageCount={images.length}
            fileName={fileName}
            onFileNameChange={setFileName}
            onGeneratePDF={handleGeneratePDF}
            onClearAll={clearAll}
            isGenerating={isGenerating}
            orientation={orientation}
            onOrientationChange={setOrientation}
            fillMode={fillMode}
            onFillModeChange={setFillMode}
          />
        </main>

        <footer className="text-center mt-16 text-sm text-muted-foreground">
          <p>
            As imagens são processadas localmente no seu dispositivo.
            <br />
            Nenhum ficheiro é enviado para servidores externos.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

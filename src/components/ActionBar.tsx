import { FileDown, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface ActionBarProps {
  imageCount: number;
  fileName: string;
  onFileNameChange: (name: string) => void;
  onGeneratePDF: () => void;
  onClearAll: () => void;
  isGenerating: boolean;
}

export const ActionBar = ({
  imageCount,
  fileName,
  onFileNameChange,
  onGeneratePDF,
  onClearAll,
  isGenerating,
}: ActionBarProps) => {
  if (imageCount === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl shadow-soft p-6 space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {imageCount}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">
              {imageCount === 1 ? "1 imagem" : `${imageCount} imagens`}
            </p>
            <p className="text-sm text-muted-foreground">
              Arraste para reordenar
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar tudo
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="filename" className="sr-only">
            Nome do arquivo PDF
          </label>
          <Input
            id="filename"
            type="text"
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
            placeholder="Nome do arquivo PDF"
            className="w-full"
          />
        </div>

        <Button
          onClick={onGeneratePDF}
          disabled={isGenerating}
          className="gradient-primary text-primary-foreground px-8 hover:opacity-90 transition-opacity"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              A gerar...
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 mr-2" />
              Gerar PDF
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

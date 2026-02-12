import { FileDown, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export type PageOrientation = "portrait" | "landscape";
export type FillMode = "fit" | "fill";

interface ActionBarProps {
  imageCount: number;
  fileName: string;
  onFileNameChange: (name: string) => void;
  onGeneratePDF: () => void;
  onClearAll: () => void;
  isGenerating: boolean;
  orientation: PageOrientation;
  onOrientationChange: (orientation: PageOrientation) => void;
  fillMode: FillMode;
  onFillModeChange: (mode: FillMode) => void;
}

export const ActionBar = ({
  imageCount,
  fileName,
  onFileNameChange,
  onGeneratePDF,
  onClearAll,
  isGenerating,
  orientation,
  onOrientationChange,
  fillMode,
  onFillModeChange,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Orientação da página
          </label>
          <Select value={orientation} onValueChange={(v) => onOrientationChange(v as PageOrientation)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">A4 Vertical</SelectItem>
              <SelectItem value="landscape">A4 Horizontal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Preenchimento da imagem
          </label>
          <Select value={fillMode} onValueChange={(v) => onFillModeChange(v as FillMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fit">Parcial (manter proporção)</SelectItem>
              <SelectItem value="fill">Total (preencher página)</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

import { jsPDF } from "jspdf";
import { ImageFile } from "@/components/ImageGrid";

export type PageOrientation = "portrait" | "landscape";
export type FillMode = "fit" | "fill";

export const generatePDF = async (
  images: ImageFile[],
  fileName: string,
  orientation: PageOrientation = "portrait",
  fillMode: FillMode = "fit"
): Promise<void> => {
  if (images.length === 0) {
    throw new Error("Nenhuma imagem para processar");
  }

  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = fillMode === "fill" ? 0 : 10;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  for (let i = 0; i < images.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const image = images[i];
    const imgDimensions = await getImageDimensions(image.preview);
    const aspectRatio = imgDimensions.width / imgDimensions.height;

    let finalWidth: number;
    let finalHeight: number;

    if (fillMode === "fill") {
      // Fill: cover entire page, may crop
      const pageAspect = maxWidth / maxHeight;
      if (aspectRatio > pageAspect) {
        // Image is wider — fit height, overflow width
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      } else {
        // Image is taller — fit width, overflow height
        finalWidth = maxWidth;
        finalHeight = maxWidth / aspectRatio;
      }
    } else {
      // Fit: contain within page, preserve ratio
      finalWidth = maxWidth;
      finalHeight = maxWidth / aspectRatio;
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      }
    }

    const xOffset = (pageWidth - finalWidth) / 2;
    const yOffset = (pageHeight - finalHeight) / 2;

    pdf.addImage(
      image.preview,
      "JPEG",
      xOffset,
      yOffset,
      finalWidth,
      finalHeight,
      undefined,
      "MEDIUM"
    );
  }

  const sanitizedFileName = fileName.trim() || "combined-document";
  const finalFileName = sanitizedFileName.endsWith(".pdf")
    ? sanitizedFileName
    : `${sanitizedFileName}.pdf`;

  pdf.save(finalFileName);
};

const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = src;
  });
};

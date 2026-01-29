import { jsPDF } from "jspdf";
import { ImageFile } from "@/components/ImageGrid";

export const generatePDF = async (
  images: ImageFile[],
  fileName: string
): Promise<void> => {
  if (images.length === 0) {
    throw new Error("Nenhuma imagem para processar");
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  for (let i = 0; i < images.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const image = images[i];
    
    // Get image dimensions
    const imgDimensions = await getImageDimensions(image.preview);
    
    // Calculate aspect ratio and fit to page
    const aspectRatio = imgDimensions.width / imgDimensions.height;
    
    let finalWidth = maxWidth;
    let finalHeight = maxWidth / aspectRatio;
    
    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = maxHeight * aspectRatio;
    }
    
    // Center the image on the page
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

  // Sanitize filename
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

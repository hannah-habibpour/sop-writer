import { jsPDF } from "jspdf";

export const generatePDFBuffer = async (content: string) => {
  const doc = new jsPDF();

  const marginX = 20;
  const marginY = 20;
  const maxWidth = doc.internal.pageSize.getWidth() - marginX * 2;

  // the title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    "Statement of Purpose",
    doc.internal.pageSize.getWidth() / 2,
    marginY,
    { align: "center" }
  );

  // body content
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  // Wrap text to fit within the max width
  const wrappedText = doc.splitTextToSize(content, maxWidth);

  // Add wrapped text to the PDF
  doc.text(wrappedText, marginX, marginY + 20);

  // Return the PDF as a buffer
  const pdfBuffer = doc.output("arraybuffer");
  return Buffer.from(pdfBuffer);
};

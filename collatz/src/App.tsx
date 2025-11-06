import React, { useState, useRef } from "react";
import Collatz from "./components/collatz";
import TablaPitagoras from "./components/tablaPitagoras";
import EspiralNumerica from "./components/EspiralNumerica";
import MultiplosSeparados from "./components/MultiplosSeparados";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [secuencia, setSecuencia] = useState<number[]>([]);
  const [numeroActual, setNumeroActual] = useState<number | null>(null);
  const tablaRef = useRef<HTMLDivElement>(null);

  const generarPDF = async () => {
    if (secuencia.length === 0) {
      alert("Primero genera una secuencia de Collatz.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Conjetura de Collatz y Tabla Pitagórica", 15, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Número inicial: ${secuencia[0]}`, 15, 35);
    doc.text(`Longitud de la secuencia: ${secuencia.length}`, 15, 43);
    doc.text("Secuencia:", 15, 53);

    const textoSecuencia = secuencia.join(" → ");
    const lineas = doc.splitTextToSize(textoSecuencia, 180);
    doc.text(lineas, 15, 63);

    doc.text("Tabla pitagórica (resumen):", 15, 100);
    const multiplos = secuencia
      .filter((n) => n <= 10)
      .map((n) => `${n}×${n}=${n * n}`)
      .join(", ");
    doc.text(multiplos || "No hay coincidencias pequeñas", 15, 110);

    if (tablaRef.current) {
      const canvas = await html2canvas(tablaRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 15, 125, imgWidth, imgHeight);
    }

    doc.save("collatz_pitagoras.pdf");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.titulo}>Conjetura de Collatz + Tabla Pitagórica</h1>

      <div style={styles.grid}>
        {/* Fila 1 */}
        <div style={styles.card}>
          <Collatz
            onSecuenciaChange={setSecuencia}
            onNumeroActualChange={setNumeroActual}
          />
        </div>

        <div style={styles.card}>
          <MultiplosSeparados secuencia={secuencia} />
        </div>

        {/* Fila 2 */}
        <div style={styles.card} ref={tablaRef}>
          <TablaPitagoras secuencia={secuencia} actual={numeroActual} />
        </div>

        <div style={styles.card}>
          <EspiralNumerica secuencia={secuencia} niveles={10} />
        </div>
      </div>

      <button onClick={generarPDF} style={styles.boton}>
        📄 Descargar PDF
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
  },
  titulo: {
    color: "#2b4eff",
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto",
    gap: "20px",
    justifyItems: "stretch",
    alignItems: "stretch",
    marginBottom: "25px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minHeight: "280px",
  },
  boton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#2b4eff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

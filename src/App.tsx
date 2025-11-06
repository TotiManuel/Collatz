import React, { useState, useRef } from "react";
import Collatz from "./components/collatz";
import TablaPitagoras from "./components/tablaPitagoras";
import EspiralNumerica from "./components/EspiralNumerica";
import MultiplosSeparados from "./components/MultiplosSeparados";

export default function App() {
  const [secuencia, setSecuencia] = useState<number[]>([]);
  const [numeroActual, setNumeroActual] = useState<number | null>(null);
  const tablaRef = useRef<HTMLDivElement>(null);

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

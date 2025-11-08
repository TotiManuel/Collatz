import React from "react";

interface TablaProps {
  secuencia: number[];
  actual: number | null;
}

export default function TablaPitagoras({ secuencia, actual }: TablaProps) {
  const tabla: number[][] = [];
  for (let i = 1; i <= 50; i++) {
    const fila: number[] = [];
    for (let j = 1; j <= 50; j++) {
      fila.push(i * j);
    }
    tabla.push(fila);
  }

  const colorPorPaso = (valor: number): string => {
    const index = secuencia.indexOf(valor);
    if (index === -1) return "white";
    const ratio = index / secuencia.length;
    const start = [173, 216, 255];
    const end = [0, 70, 200];
    const r = Math.round(start[0] + (end[0] - start[0]) * ratio);
    const g = Math.round(start[1] + (end[1] - start[1]) * ratio);
    const b = Math.round(start[2] + (end[2] - start[2]) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div style={styles.tablaContainer}>
      <h3>Tabla de Pitágoras (1–20)</h3>
      <table style={styles.tabla}>
        <tbody>
          {tabla.map((fila, i) => (
            <tr key={i}>
              {fila.map((valor, j) => {
                const aparece = secuencia.includes(valor);
                const esActual = valor === actual;
                return (
                  <td
                    key={j}
                    style={{
                      ...styles.celda,
                      backgroundColor: esActual
                        ? "gold"
                        : aparece
                        ? colorPorPaso(valor)
                        : "white",
                      color: esActual
                        ? "black"
                        : aparece
                        ? "white"
                        : "black",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {valor}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tablaContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  tabla: {
    margin: "0 auto",
    borderCollapse: "collapse",
  },
  celda: {
    border: "1px solid #ccc",
    padding: "3px",
    width: "25px",
    height: "25px",
    fontSize: "11px",
    textAlign: "center",
  },
};

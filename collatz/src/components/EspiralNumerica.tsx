import React from "react";

interface EspiralConcentricaProps {
  secuencia: number[];
  niveles?: number; // cantidad de "capas" (por ejemplo 5 → matriz de 9x9)
}

export default function EspiralNumerica({ secuencia, niveles = 5 }: EspiralConcentricaProps) {
  const size = niveles * 2 - 1; // ej: niveles=5 → 9x9
  const matriz = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const centro = Math.floor(size / 2);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dist = Math.max(Math.abs(x - centro), Math.abs(y - centro));
      matriz[y][x] = dist + 1; // la capa más interna es 1
    }
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🔷 Espiral Concéntrica</h3>
      <table style={styles.table}>
        <tbody>
          {matriz.map((fila, i) => (
            <tr key={i}>
              {fila.map((n, j) => (
                <td
                  key={j}
                  style={{
                    ...styles.cell,
                    backgroundColor: secuencia.includes(n)
                      ? "#ff6b6b"
                      : n === 1
                      ? "#2b4eff"
                      : "#f7f7f7",
                    color: secuencia.includes(n) ? "white" : "black",
                    fontWeight: secuencia.includes(n) ? "bold" : "normal",
                  }}
                >
                  {n}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
  title: {
    color: "#2b4eff",
    marginBottom: "10px",
  },
  table: {
    borderCollapse: "collapse",
    margin: "0 auto",
  },
  cell: {
    border: "1px solid #ccc",
    width: "35px",
    height: "35px",
    textAlign: "center",
    verticalAlign: "middle",
  },
};

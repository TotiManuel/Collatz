import React, { useEffect, useState } from "react";

interface Props {
  secuencia: number[];
}

export default function MultiplosSeparados({ secuencia }: Props) {
  const [multiplos, setMultiplos] = useState<Record<number, number[]>>({});
  const [otros, setOtros] = useState<number[]>([]);

  useEffect(() => {
    // Rango de múltiplos a analizar (puedes ampliar)
    const bases = Array.from({ length: 9 }, (_, i) => i + 2); // [2..10]
    const temp: Record<number, number[]> = {};
    bases.forEach((b) => (temp[b] = []));
    const tempOtros: number[] = [];

    secuencia.forEach((n) => {
      let esMultiplo = false;

      bases.forEach((b) => {
        if (n % b === 0) {
          temp[b].push(n);
          esMultiplo = true;
        }
      });

      if (!esMultiplo) tempOtros.push(n);
    });

    setMultiplos(temp);
    setOtros(tempOtros);
  }, [secuencia]);

  const colores = [
    "#ffcccc", "#ffd580", "#fff3b0", "#c3f2b3", "#b3e5fc",
    "#c9c2f8", "#f8c2e0", "#d2c2f8", "#a8e6cf"
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>🔢 Clasificación por múltiplos</h3>

      {Object.entries(multiplos).map(([base, numeros], i) => (
        <div
          key={base}
          style={{
            ...styles.fila,
            backgroundColor: colores[i % colores.length],
          }}
        >
          <strong>Múltiplos de {base}:</strong>
          <div style={styles.numeros}>
            {numeros.length ? (
              numeros.map((n, j) => (
                <span key={j} style={styles.numero}>
                  {n}
                </span>
              ))
            ) : (
              <em style={styles.vacio}>—</em>
            )}
          </div>
        </div>
      ))}

      <div style={{ ...styles.fila, backgroundColor: "#e0e0e0" }}>
        <strong>Otros:</strong>
        <div style={styles.numeros}>
          {otros.length ? (
            otros.map((n, j) => (
              <span key={j} style={styles.numero}>
                {n}
              </span>
            ))
          ) : (
            <em style={styles.vacio}>—</em>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    fontFamily: "Arial, sans-serif",
  },
  titulo: {
    color: "#2b4eff",
    marginBottom: "10px",
  },
  fila: {
    margin: "4px 0",
    padding: "6px 10px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  numeros: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "flex-end",
    flex: 1,
  },
  numero: {
    background: "black",
    borderRadius: "5px",
    padding: "3px 7px",
    color: "white",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  vacio: {
    color: "#555",
  },
};

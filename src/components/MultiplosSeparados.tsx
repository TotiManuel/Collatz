import React, { useEffect, useState } from "react";

interface Props {
  secuencia: number[];
}

export default function MultiplosSeparados({ secuencia }: Props) {
  const [m3, setM3] = useState<number[]>([]);
  const [m6, setM6] = useState<number[]>([]);
  const [m7, setM7] = useState<number[]>([]);
  const [m9, setM9] = useState<number[]>([]);
  const [otros, setOtros] = useState<number[]>([]);

  useEffect(() => {
    const _m3: number[] = [];
    const _m6: number[] = [];
    const _m7: number[] = [];
    const _m9: number[] = [];
    const _otros: number[] = [];

    secuencia.forEach((n) => {
      let esMultiplo = false;

      if (n % 3 === 0) {
        _m3.push(n);
        esMultiplo = true;
      }
      if (n % 6 === 0) {
        _m6.push(n);
        esMultiplo = true;
      }
      if (n % 7 === 0) {
        _m7.push(n);
        esMultiplo = true;
      }
      if (n % 9 === 0) {
        _m9.push(n);
        esMultiplo = true;
      }

      if (!esMultiplo) _otros.push(n);
    });

    setM3(_m3);
    setM6(_m6);
    setM7(_m7);
    setM9(_m9);
    setOtros(_otros);
  }, [secuencia]);

  const filas = [
    { titulo: "Múltiplos de 3", color: "#ffcccc", numeros: m3 },
    { titulo: "Múltiplos de 6", color: "#ffd580", numeros: m6 },
    { titulo: "Múltiplos de 7", color: "#c3f2b3", numeros: m7 },
    { titulo: "Múltiplos de 9", color: "#c9c2f8", numeros: m9 },
    { titulo: "Otros", color: "#e0e0e0", numeros: otros },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>🔢 Clasificación por múltiplos</h3>

      {filas.map((fila, i) => (
        <div key={i} style={{ ...styles.fila, backgroundColor: fila.color }}>
          <strong>{fila.titulo}:</strong>
          <div style={styles.numeros}>
            {fila.numeros.length ? (
              fila.numeros.map((n, j) => (
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

import React, { useState } from "react";

interface Props {
  onSecuenciaChange: (seq: number[]) => void;
  onNumeroActualChange: (n: number | null) => void;
}

export default function Collatz({ onSecuenciaChange, onNumeroActualChange }: Props) {
  const [numero, setNumero] = useState("");
  const [secuencia, setSecuencia] = useState<number[]>([]);
  const [actual, setActual] = useState<number | null>(null);
  const [calculando, setCalculando] = useState(false);

  const calcular = async () => {
    let n = parseInt(numero);
    if (!n || n <= 0) return alert("Ingrese un número entero positivo.");
    setSecuencia([n]);
    setActual(n);
    onSecuenciaChange([n]);
    onNumeroActualChange(n);
    setCalculando(true);

    while (n !== 1) {
      await new Promise((r) => setTimeout(r, 400));
      n = n % 2 === 0 ? n / 2 : 3 * n + 1;
      setSecuencia((prev) => {
        const nueva = [...prev, n];
        onSecuenciaChange(nueva);
        return nueva;
      });
      setActual(n);
      onNumeroActualChange(n);
    }
    setCalculando(false);
  };

  return (
    <div style={styles.box}>
      <h2>Conjetura de Collatz</h2>
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Ej: 7"
        disabled={calculando}
        style={styles.input}
      />
      <button
        onClick={calcular}
        disabled={calculando}
        style={{
          ...styles.btn,
          backgroundColor: calculando ? "#888" : "#2b4eff",
        }}
      >
        {calculando ? "Calculando..." : "Calcular"}
      </button>

      {!!secuencia.length && (
        <div style={{ marginTop: 10 }}>
          <h3>Secuencia:</h3>
          <p style={styles.seq}>
            {secuencia.map((num, i) => (
              <span
                key={i}
                style={{
                  ...styles.num,
                  background: num === actual ? "gold" : "#2b4eff",
                  color: num === actual ? "black" : "white",
                  transform: num === actual ? "scale(1.3)" : "scale(1)",
                }}
              >
                {num}
                {i < secuencia.length - 1 && " → "}
              </span>
            ))}
          </p>
          <p><strong>Longitud:</strong> {secuencia.length} pasos</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  box: {
    background: "#000000ff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    padding: "6px 8px",
    fontSize: 16,
    width: 120,
    marginRight: 8,
  },
  btn: {
    padding: "6px 12px",
    fontSize: 16,
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  seq: { lineHeight: 1.8, fontSize: 18 },
  num: {
    display: "inline-block",
    margin: "2px",
    padding: "3px 5px",
    borderRadius: 6,
    transition: "all 0.3s ease",
  },
};

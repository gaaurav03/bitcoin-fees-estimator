import { useEffect, useState } from "react";
import FeeCard from "./components/FeeCard";

function App() {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFees = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://blockstream.info/api/fee-estimates"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fee data");
      }

      const data = await response.json();

      // Map block targets to UI-friendly labels
      const formattedFees = {
        fastestFee: data["1"],
        halfHourFee: data["3"],
        hourFee: data["6"],
        economyFee: data["144"],
      };

      if (typeof formattedFees.fastestFee !== "number") {
        throw new Error("Invalid API response");
      }

      setFees(formattedFees);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Bitcoin Fee Estimator</h1>
      <p>Live fee recommendations from the Bitcoin mempool</p>

      {loading && <p>Loading fees…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {fees && (
        <>
          <FeeCard label="Fast (Next block)" fee={fees.fastestFee} />
          <FeeCard label="Medium (≈30 min)" fee={fees.halfHourFee} />
          <FeeCard label="Slow (≈1 hour)" fee={fees.hourFee} />
          <FeeCard label="Economy" fee={fees.economyFee} />
        </>
      )}

      <button onClick={fetchFees} disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>
      <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#555" }}> Bitcoin transaction fees depend on mempool congestion. When more users are competing for block space, higher fees are required for faster confirmation. </p>
    </div>
  );
}

export default App;

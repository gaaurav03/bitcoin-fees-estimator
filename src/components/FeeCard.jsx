function FeeCard({ label, fee }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <h3>{label}</h3>
      <p>
        <strong>{fee} sat/vB</strong>
      </p>
    </div>
  );
}

export default FeeCard;

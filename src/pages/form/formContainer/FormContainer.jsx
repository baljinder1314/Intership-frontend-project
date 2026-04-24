function FormContainer({ children }) {
  return (
    <div
      className="min-vh-100 w-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: " #111827 " }} // ← dark page bg
    >
      <div className="container h-75">
        <div className="row justify-content-center">
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 rounded"
            style={{
              backgroundColor: "#1f2937", // ← white form card
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)", // ← depth effect
              padding: "2rem",
              minHeight: "70vh",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormContainer;

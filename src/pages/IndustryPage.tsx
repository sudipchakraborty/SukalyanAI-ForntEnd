import { useParams } from "react-router-dom";

import { industryConfig }
from "../config/industryConfig";

function IndustryPage() {

  const { slug } = useParams();

  const industry =
    industryConfig[slug || ""];

  if (!industry) {

    return (
      <div
        style={{
          paddingTop: "120px",
          color: "white",
        }}
      >
        Industry Not Found
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: "100px",
        minHeight: "100vh",
        background: "#050816",
        color: "white",
      }}
    >

      <img
        src={industry.image}
        alt={industry.title}
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >

        <h1>{industry.title}</h1>

        <p>{industry.description}</p>

      </div>

    </div>
  );
}

export default IndustryPage;


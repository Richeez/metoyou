import { useNavigate } from "react-router-dom";
import { NavBtn } from "../../../../Components/button";
// import { NavBtn } from "../../features/button";
// import { Section } from "../../features/container";

const NotFound = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const goBack = () => {
    navigate("/");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      color: "var(--text-color)",
      fontFamily: "var(--global-font-family)",
    },
    heading: {
      fontSize: "72px",
      margin: "0",
    },
    subheading: {
      fontSize: "24px",
      margin: "10px 0 20px 0",
    },
    link: {
      fontSize: "14px",
      color: "var(--color-primary)",
      textDecoration: "none",
      marginRight: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Page Not Found</h2>
      <div className="gap-1">
        <NavBtn onClick={goBack}>
          <a style={styles.link}>Go to Homepage</a>
        </NavBtn>
      </div>
    </div>
  );
};

export default NotFound;

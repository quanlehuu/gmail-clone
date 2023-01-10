import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

function PrivatePage({ children }) {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!loading && !user) {
    return null;
  }
  return <>{children}</>;
}

export default PrivatePage;

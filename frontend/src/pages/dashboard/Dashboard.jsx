import React from "react";
import useRedirectLogOut from "../../components/hooks/useRedirectLogOut";

const Dashboard = () => {
  useRedirectLogOut("/login");
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;

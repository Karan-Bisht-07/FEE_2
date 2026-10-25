import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Tasks } from "./pages/Tasks";
import { Events } from "./pages/Events";
import { Attendance } from "./pages/Attendance";
import { Placement } from "./pages/Placement";
import { Hostel } from "./pages/Hostel";
import { LostFound } from "./pages/LostFound";
import { BloodDonation } from "./pages/BloodDonation";
import { Feedback } from "./pages/Feedback";
import { Blog } from "./pages/Blog";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Store } from "./pages/Store";
import { Dashboard } from "./pages/Dashboard";
import { Portfolio } from "./pages/Portfolio";

const MainContent = () => {
  const { activeTab } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "store":
        return <Store />;
      case "portfolio":
        return <Portfolio />;
      case "profile":
        return <Profile />;
      case "tasks":
        return <Tasks />;
      case "events":
        return <Events />;
      case "attendance":
        return <Attendance />;
      case "placement":
        return <Placement />;
      case "hostel":
        return <Hostel />;
      case "lostfound":
        return <LostFound />;
      case "blood":
        return <BloodDonation />;
      case "feedback":
        return <Feedback />;
      case "blog":
        return <Blog />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />
      <main style={{ flex: 1 }} className="page-container">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;

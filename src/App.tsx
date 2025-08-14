import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages";
import NotFoundPage from "@/pages/not-found";

function App() {
  return (
    <Router>
      <Routes>
        {/* Index */}
        <Route path="/" element={<Index />} />

        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

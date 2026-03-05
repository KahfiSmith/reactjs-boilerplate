import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/error-boundary";
import LoadingPage from "@/pages/loading";

const HomePage = lazy(() => import("@/pages"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Index */}
            <Route path="/" element={<HomePage />} />

            {/* Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

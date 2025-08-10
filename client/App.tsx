import "./global.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamProvider } from "./contexts/ExamContext";
import ExamStart from "./pages/ExamStart";
import Exam from "./pages/Exam";
import ExamResults from "./pages/ExamResults";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <ExamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExamStart />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/results" element={<ExamResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  </ErrorBoundary>
);

export default App;

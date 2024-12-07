import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormBuilder } from "@/components/form-builder";
import { PreviewMode } from "@/components/preview-mode";
import FormContextProvider from "./context";

function App() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#FFFFFF]">
      <FormContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FormBuilder />} />
            <Route path="/form/:id" element={<PreviewMode />} />
          </Routes>
        </BrowserRouter>
      </FormContextProvider>
    </main>
  );
}

export default App;

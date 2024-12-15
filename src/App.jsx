import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./Components/Header";
import CharacterTable from "./Components/CharacterTable";

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Container fixed>
        <div className="font-sans text-white">
          <Header />
          <Routes>
            <Route path="/" element={<CharacterTable />} />
            <Route path="/character/:id" element={<CharacterTable />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
}

export default App;

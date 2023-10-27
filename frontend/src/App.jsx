import { Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateText from "./pages/GenerateText";
import Home from "./pages/Home";
import Sentiment from "./pages/Sentiment";
import Summarize from "./pages/Summarize";

function App() {
  return (
    <>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/generate" element={<GenerateText/>}/>
       <Route path="/summarize" element={<Summarize/>}/>
       <Route path="/sentiment" element={<Sentiment/>}/>
     </Routes>
    </>
  );
}

export default App;

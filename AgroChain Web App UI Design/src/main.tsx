
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
// Initialize Firebase (app, analytics, auth, db, storage)
import "@/lib/firebase";

createRoot(document.getElementById("root")!).render(<App />);
  
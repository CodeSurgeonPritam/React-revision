import AnimatedBox from "./components/AnimatedBox";
import DragComponent from "./components/DragComponent";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Framer Motion Demo</h1>
      <AnimatedBox />
      <DragComponent />
    </div>
  );
}

export default App;

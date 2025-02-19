import { motion } from "framer-motion";

function DragComponent() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 100, top: -50, bottom: 100 }}
      style={{
        width: "100px",
        height: "100px",
        borderRadius:'50%',
        backgroundColor: "blue",
        margin: "20px auto",
        cursor: "grab",
      }}
    />
  );
}

export default DragComponent;

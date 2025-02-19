import { motion } from "framer-motion";

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "tomato",
        margin: "20px auto",
      }}
    />
  );
}

export default AnimatedBox;

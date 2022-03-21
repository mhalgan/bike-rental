import styles from "./ColorSample.module.css";

const ColorSample = ({ color }) => {
  if (!color) return <div id="color-sample" />;
  return (
    <div id="color-sample">
      <span className={styles.colorSample} style={{ backgroundColor: color }} />
      {color}
    </div>
  );
};

export default ColorSample;

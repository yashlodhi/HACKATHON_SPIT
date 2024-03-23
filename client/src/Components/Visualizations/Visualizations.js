import one from "./1.png";
import two from "./2.png";
import three from "./3.png";
import four from "./4.png";
import "./Visualizations.css"

function Visualization() {
  return (
    <>
      <div id="visuals">
        <img src={one} alt="" />
        <img src={two} alt="" />
        <img src={three} alt="" />
        <img src={four} alt="" />
      </div>
    </>
  );
}

export default Visualization;

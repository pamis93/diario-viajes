import Carousel from "../Carousel/Carousel";
import "./Portada.css";

function Portada() {

  return (
    <>
      <div className="front-container">
      <div className="box">
        <img src="../../src/assets/image1.png" alt="salto angel " />
      </div>
      <div className="box">
      <img src="../../src/assets/image2.png" alt="salto angel " />
      </div>
      <div className="box">
      <img src="../../src/assets/image3.png" alt="salto angel " />
      </div>
      <Carousel/>
    </div>

    </>
  );
}

export default Portada;
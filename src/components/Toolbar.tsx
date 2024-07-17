import { useContext, useEffect } from "react";
import { PototoContext } from "../Pototo";
import * as fabric from "fabric";

const Toolbar = () => {
  const { fabricCanvas } = useContext(PototoContext);

  const handleClickAddText = (e: React.MouseEvent) => {
    e.preventDefault();
    fabricCanvas?.current?.add(new fabric.IText("Hello, world!"));
    console.log("add text");
  };

  useEffect(() => {
    console.log(fabricCanvas);
  }, [fabricCanvas]);

  return (
    <div>
      <button onClick={handleClickAddText}>add text</button>
    </div>
  );
};

export default Toolbar;

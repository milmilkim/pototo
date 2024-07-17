import { useContext } from "react";
import { PototoContext } from "../Pototo";
import * as fabric from "fabric";

export const useCanvas = () => {
  const { fabricCanvas } = useContext(PototoContext);

  const addText = (text: string) => {
    fabricCanvas?.current?.add(new fabric.IText(text));
  };
};

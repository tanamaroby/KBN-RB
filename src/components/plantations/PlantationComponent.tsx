import * as React from "react";
import { Plantation } from "../../../generated/prisma";

interface PlantationComponentProps {
  plantations: Array<Plantation>;
}

const PlantationComponent: React.FC<PlantationComponentProps> = (props) => {
  const { plantations } = props;
  return null;
};

export default PlantationComponent;

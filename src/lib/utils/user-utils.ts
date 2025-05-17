import { first, upperCase } from "lodash";

export const getInitialFromUserNames = (
  firstName: string,
  lastName: string
) => {
  return `${upperCase(first(firstName))}${upperCase(first(lastName))}`;
};

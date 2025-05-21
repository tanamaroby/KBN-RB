import { concat, first, map, upperFirst } from "lodash";

export type BreadcrumbType = {
  title: string;
  href: string;
};

export const isDynamicRoute = (pathname: string) => {
  return /\[[^/]+?]/.test(pathname);
};

export const getBreadcrumbsFromPathname = (
  pathname: string
): Array<BreadcrumbType> => {
  const pathnames = pathname.split("/").filter(Boolean);
  const firstElement: BreadcrumbType = {
    title: "Home",
    href: "/",
  };
  return concat(
    firstElement,
    map(pathnames, (pathname, i) => ({
      title: upperFirst(pathname),
      href: "/" + concat(pathnames.slice(0, i + 1)).join("/"),
    }))
  );
};

export const getNameFromPathname = (pathname: string) => {
  return "/" + (first(pathname.split("/").filter(Boolean)) ?? "");
};

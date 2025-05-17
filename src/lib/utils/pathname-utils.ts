import { concat, map, upperFirst } from "lodash";

export type BreadcrumbType = {
  title: string;
  href: string;
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
    map(pathnames, (pathname) => ({
      title: upperFirst(pathname),
      href: pathname,
    }))
  );
};

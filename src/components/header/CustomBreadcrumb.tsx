import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavbarContext } from "@/context/NavbarContext";
import React from "react";
import { Link } from "react-router-dom";

const CustomBreadcrumb = () => {
  const { breadcrumb } = useNavbarContext();

  if (!breadcrumb) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.links &&
          Array.isArray(breadcrumb.links) &&
          breadcrumb.links.map((link, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link to={link.href}>{link.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumb.page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

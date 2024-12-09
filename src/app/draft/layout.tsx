import { FormFooter } from "@/components/form-footer";
import { FormHeader } from "@/components/form-header";
import React from "react";

const Layout: React.FC = ({ children }: any) => {
  return (
    <div className="relative mx-auto max-w-2xl rounded-lg shadow-sm overflow-hidden border">
      <FormHeader />
      {children}
      <FormFooter/>
    </div>
  );
};

export default Layout;

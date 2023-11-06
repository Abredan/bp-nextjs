"use client";
import React from "react";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  return (
    <Toaster
      expand={false}
      richColors={false}
      invert={true}
      visibleToasts={5}
      position="top-center"
      closeButton={true}
    />
  );
};

export default ToasterProvider;

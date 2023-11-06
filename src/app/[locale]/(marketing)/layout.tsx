"use client";
import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen h-full'>
      <Navbar />
      <main className='h-full overflow-x-hidden w-full pt-60 min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;

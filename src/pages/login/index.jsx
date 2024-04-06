import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import SignInCard from "src/components/Login";

const index = () => {
 

  return (
    <>
      <SignInCard />
    </>
  );
};

index.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default index;

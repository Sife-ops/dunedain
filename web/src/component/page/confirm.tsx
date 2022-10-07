import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const Confirm = () => {
  const { email } = useParams();
  return (
    <div>
      <div>confirm</div>
      <div>{email}</div>
    </div>
  );
};

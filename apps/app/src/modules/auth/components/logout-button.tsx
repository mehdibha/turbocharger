"use client";

import React from "react";
import { Button, ButtonProps, LogOutIcon } from "@turbocharger/ui";
import { cn } from "@turbocharger/utils";
import { signOut } from "next-auth/react";

export const LogoutButton = (props: ButtonProps) => {
  const { className, ...restProps } = props;

  return (
    <Button
      size="icon"
      onClick={() => {
        signOut();
      }}
      className={cn("", className)}
      {...restProps}
    >
      <LogOutIcon />
    </Button>
  );
};

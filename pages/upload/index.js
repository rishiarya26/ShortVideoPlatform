import router from "next/router";
import React, { useEffect } from "react";
import DeskUplaod from "../../src/components/desk-upload";
import useAuth from "../../src/hooks/use-auth";
import { localStorage } from "../../src/utils/storage";

export default function Upload() {
  const tokens = localStorage?.get("tokens") || null;
  let isLoggedIn = useAuth("false", "true");

  useEffect(() => {
    if (tokens) {
      isLoggedIn = "true";
    }
  }, [tokens]);

  useEffect(() => {
    if (isLoggedIn === "false") {
      router.push("/feed/for-you");
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn === "true" ? <DeskUplaod /> : ""}
    </div>
  );
}

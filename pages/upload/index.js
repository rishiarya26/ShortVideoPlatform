import router from "next/router";
import React, { useEffect } from "react";
import DeskUplaod from "../../src/components/desk-upload";
import useAuth from "../../src/hooks/use-auth";
import { getItem } from "../../src/utils/cookie";
import { localStorage } from "../../src/utils/storage";

export default function Upload() {
  const tokens = localStorage?.get("tokens") || null;
  let isLoggedIn = useAuth("false", "true");
  const device = getItem('device-type');

  useEffect(() => {
    if (tokens) {
      isLoggedIn = "true";
    }
  }, [tokens]);

  useEffect(() => {
    if (isLoggedIn === "false" || device !== 'desktop') {
      router.push("/feed/for-you");
    }
  }, [isLoggedIn]);

  return (
    <div>
      {device === 'desktop' && isLoggedIn === "true" ? <DeskUplaod /> : ""}
    </div>
  );
}

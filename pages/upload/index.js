import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DeskUplaod from "../../src/components/desk-upload";
import useAuth from "../../src/hooks/use-auth";
import { getItem } from "../../src/utils/cookie";
import { localStorage } from "../../src/utils/storage";

export default function Upload() {
  let router = useRouter();
  const tokens = localStorage?.get("tokens") || null;
  const userInfo = localStorage.get('user-details') ?? {};
  const trimmedUserHandle = userInfo?.userHandle?.replace('@','');
  const device = getItem('device-type');

  let isLoggedIn = useAuth("false", "true");

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
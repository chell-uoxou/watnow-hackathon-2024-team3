import React from "react";
import useCurrentAccount from "~/hooks/useCurrentAccount";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { LoadingSpinner } from "~/components/ui/spinner";

function MyAvatar() {
  const { currentDBAccount } = useCurrentAccount();

  if (currentDBAccount === "loading") {
    return null;
  }

  const avatar = currentDBAccount?.avatar_url;

  return (
    <Avatar className="rounded-xl size-8">
      <AvatarImage src={avatar} />
      <AvatarFallback>
        <LoadingSpinner />
      </AvatarFallback>
    </Avatar>
  );
}

export default MyAvatar;

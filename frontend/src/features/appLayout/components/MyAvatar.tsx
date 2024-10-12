import React from "react";
import useCurrentAccount from "~/hooks/useCurrentAccount";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { LoadingSpinner } from "~/components/ui/spinner";

interface Account {
  avatar?: string;
}

function MyAvatar() {
  const { currentDBAccount } = useCurrentAccount();
  console.log(currentDBAccount);

  if (currentDBAccount === "loading") {
    return null;
  }

  const avatar = currentDBAccount?.avatar_url;

  return (
    <div>
      <Avatar className="rounded-xl">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          <LoadingSpinner />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default MyAvatar;

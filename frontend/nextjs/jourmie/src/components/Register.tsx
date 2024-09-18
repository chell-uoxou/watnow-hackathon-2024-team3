import Link from "next/link";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Register = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アカウント登録をしてください</CardTitle>
        <CardDescription>
          <Link href="/account/login">アカウントをお持ちの場合はこちら</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mailAddress">ニックネーム</Label>
              <Input id="displayName" />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">電話番号</Label>
              <Input id="phonNumber" />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mailAddress">メールアドレス</Label>
              <Input id="mailAddress" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">パスワード</Label>
              <Input id="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Link href="/">Cancel</Link>
        </Button>
        <Button>
          <Link href="/">登録</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

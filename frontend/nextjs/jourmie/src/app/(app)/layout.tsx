import { json, Outlet, useLoaderData } from "@remix-run/react";
import { AppTopBar } from "~/components/common/AppTopBar";
// import initFirebase from "~/lib/initFirebase";
import { FirebaseOptions } from "firebase/app";
export async function loader() {
  const config: FirebaseOptions = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  return json({ firebaseOptions: config });
}

const app = () => {
  const config = useLoaderData<typeof loader>();
  // const firebaseApp = initFirebase(config.firebaseOptions);
  return (
    <div className="bg-slate-50 h-svh">
      <AppTopBar />
      <Outlet />
    </div>
  );
};

export default app;

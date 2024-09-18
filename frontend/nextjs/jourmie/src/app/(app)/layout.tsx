import { PropsWithChildren } from "react";
import { AppTopBar } from "~/components/common/AppTopBar";
// import initFirebase from "~/lib/initFirebase";

// export async function loader() {
//   const config: FirebaseOptions = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID,
//   };

//   return json({ firebaseOptions: config });
// }

const app = ({ children }: PropsWithChildren) => {
  // const config = useLoaderData<typeof loader>();
  // const firebaseApp = initFirebase(config.firebaseOptions);
  return (
    <div className="bg-slate-50 h-svh">
      <AppTopBar />
      {children}
    </div>
  );
};

export default app;

import { PropsWithChildren } from "react";
import { AppTopBar } from "~/components/common/AppTopBar";
import { LeftSideBar } from "~/components/common/LeftSideBar";
// import MapDrawer from "~/features/googleMap/MapDrawer";
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

export const App = ({ children }: PropsWithChildren) => {
  // const config = useLoaderData<typeof loader>();
  // const firebaseApp = initFirebase(config.firebaseOptions);
  return (
    // <div className="bg-slate-50 h-svh">
    //   <AppTopBar />
    //   <LeftSideBar />
    //   <MapDrawer />
    //   {children}
    // </div>
    <main className="flex flex-row min-h-screen">
      <div className="flex bg-brand-color-3 h-screen border-brand-border-color border">
        <LeftSideBar />
      </div>

      {/* <MapDrawer /> */}

      <div className="w-screen h-10 bg-slate-950 text-white ">
        <AppTopBar />
        {children}
      </div>
    </main>
  );
};

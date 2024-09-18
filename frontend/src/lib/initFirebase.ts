import { initializeApp, FirebaseApp, getApp, FirebaseOptions } from 'firebase/app'

export default function initFirebase(config: FirebaseOptions): FirebaseApp {
  let app
  try {
    app = getApp()
  } catch (e) {
    app = initializeApp(config)
  }
  return app
}
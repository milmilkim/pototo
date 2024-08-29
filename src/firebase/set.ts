import * as firebase from "firebase/app";
import firebaseConfig from "../firebase/firebase.config";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app);

export default app;
export { storage };

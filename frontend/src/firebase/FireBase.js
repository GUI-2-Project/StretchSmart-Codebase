import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDws2T2-d1vlMHNZpuxh5CwurN4Rc3NtAI ",
    projectId: "stretchsmart-92074",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
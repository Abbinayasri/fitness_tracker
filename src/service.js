import { doc, setDoc} from "firebase/firestore";
import db from './firebase';
export async function addData(){
  await setDoc(doc(db,"friends","shyamala"),{
    age:20,
    college:"bannari",
    location:'ooty'
  });
}
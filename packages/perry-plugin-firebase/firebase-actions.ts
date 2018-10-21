import firebase from "firebase";

export const writeToDB = (ref: firebase.database.Reference, report: any) => {
  ref.set(report);
};

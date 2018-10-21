import { IFirebasePluginConfig } from "./interfaces/firebase-plugin-config";
import { writeToDB } from "./firebase-actions";

const defaultConfig = {
  basePath: 'perry_reports',
  transform: (report: PerryReport) => report,
}

export const FirebasePlugin = (userConfig: IFirebasePluginConfig) => (report: PerryReport) => {
  const config: IFirebasePluginConfig = {
    ...defaultConfig,
    ...userConfig
  }

  const basePath = config.basePath;
  const ref = config.firebaseApp.database().ref(`${basePath}/${report.id}`);

  writeToDB(ref, config.transform(report));
};

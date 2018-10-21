export interface IFirebasePluginConfig {
  firebaseApp: firebase.app.App;
  transform?: (report: any) => any;
  basePath?: string;
}

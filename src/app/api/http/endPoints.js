export default class EndPoints {
  static API_VERSION = "v1";
  static ROOT_DOMAIN = import.meta.env.APP_SERVER_URI;
  static USER = "/user";
  // static ROOT_DOMAIN = "https://metoyou-api.vercel.app";
  static IMAGE_EDITOR_BASE = `https://image-editor.${this.ROOT_DOMAIN}`;
}

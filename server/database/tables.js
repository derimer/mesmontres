// server/database/tables.js
import contactRepository from "./models/contactRepository";
import imageRepository from "./models/imagesRepository";
import montreRepository from "./models/montreRepository";

export default {
  contact: contactRepository,
  image: imageRepository,
  montre: montreRepository,
};

// server/app/controllers/imagesController.js
const imageRepo = require("../../database/models/imagesRepository");

const imagesController = {
  async readAll(req, res, next) {
    try {
      const images = await imageRepo.readAll();
      res.json(images);
    } catch (err) {
      next(err);
    }
  },

  async readOne(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const [image] = await imageRepo.read(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      return res.json(image);
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { montreId } = req.body;
      const { files } = req;

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "Aucune image envoyée" });
      }

      const savedImages = await Promise.all(
        files.map(async (file) => {
          const imageId = await imageRepo.create({
            montreId,
            filename: file.filename,
          });
          return { id: imageId, filename: file.filename };
        })
      );

      return res.status(201).json(savedImages);
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      await imageRepo.delete(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = imagesController;

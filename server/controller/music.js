// import User from "./../model/user";
const Song = require("./../model/song");
const { getSignCloud } = require("./../middleware/index");

exports.checkUpload = async (req, res) => {
  if (!req.body.name)
  return res.status(400).json({ error: "name is not valid" });
  
  Song.findOne({
    songName: req.body.name,
  }).exec(async (err, data) => {
    if (data) return res.status(400).json({ error: "Tên bài hát bị trùng" });
    await getSignCloud(req, res);
  });
};

exports.createSongs = async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ error: "name is not valid" });

  Song.findOne({
    songName: req.body.name,
  }).exec(async (err, data) => {
    if (data) return res.status(400).json({ error: "Tên bài hát bị trùng" });

    let _song = new Song({
      songName: req.body.name,
      url: req.body.url,
    });
    _song.save((err, data) => {
      if (err) return res.status(400).json({ error: err });
      if (data) return res.status(200).json({ data });
    });
  });
};

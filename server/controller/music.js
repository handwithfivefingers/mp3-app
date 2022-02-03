// import User from "./../model/user";
const Song = require("./../model/song");
const { getSignCloud, convertString } = require("./../middleware/index");

exports.checkUpload = async (req, res) => {
  console.log("come heeeee");
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
      tag: req.body.tag,
      duration: req.body.duration || "",
      songNameEn: convertString(req.body.name),
    });
    _song.save((err, data) => {
      if (err) return res.status(400).json({ error: err });
      if (data) return res.status(200).json({ data });
    });
  });
};

exports.getSongs = async (req, res) => {
  Song.find({}).exec((err, data) => {
    if (err) return res.status(400).json({ error: err });
    if (data) return res.status(200).json({ data });
  });
};

exports.searchSongs = async (req, res) => {
  const regex = new RegExp(req.body.search, "i");
  // const projectregex = new RegExp(req.body.project, 'i');
  Song.find({
    $and: [
      {
        $or: [
          { songName: regex },
          {
            songNameEn: new RegExp(
              convertString(req.body.search)?.toLowerCase(),
              "i"
            ),
          },
        ],
      },
    ],
  }).exec((err, data) => {
    // console.log(err, data);
    if (err)
      return res.status(200).json({
        error: err,
        message: "Không tìm thấy",
      });
    if (data)
      return res.status(200).json({
        data,
      });
  });
};

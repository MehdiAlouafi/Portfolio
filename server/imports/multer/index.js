const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const { originalname: name, mimetype }  = file;
        const [ i, ext ] = mimetype.split('/');

		const filename = `${req.params.title}-${Date.now()}.${ext || 'png'}`;
        req._filename = filename;
		cb(null, filename);

    }
});
// 1mb === 1e6 bytes === 1000000
const upload = multer({ storage, limits: { fileSize: 1000000 } }).single('image');

module.exports = upload;

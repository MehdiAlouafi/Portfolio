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
const upload = multer({ storage }).single('image');

module.exports = upload;

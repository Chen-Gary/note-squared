const formidable = require('formidable');
const path = require('path');


module.exports = async (req, res) => {

    // 创建表单解析对象
    const form = formidable({
        keepExtensions: true,                                                 // 保留上传文件的后缀
        uploadDir: path.join(__dirname, '../', '../', 'public', 'note-pic')   // 配置上传文件的存放位置
    });

    // 解析表单
    form.parse(req, async (err, fields, files)=>{

        if (err) { return res.status(500).send(err); }
        if (files.picture === undefined) { return res.status(400).send({message: "no picture received"}); }

        const filename = files.picture.filepath.split('note-pic')[1].slice(1);

        res.status(200).send({
            user_id: req.body.user_id,
            url: `/static/note-pic/${filename}`
        });

    });
}

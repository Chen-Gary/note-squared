const formidable = require('formidable');
const path = require('path');

const User = require("../../model/User");


module.exports = async (req, res) => {

    // 创建表单解析对象
    const form = formidable({
        keepExtensions: true,                                               // 保留上传文件的后缀
        uploadDir: path.join(__dirname, '../', '../', 'public', 'avatar')   // 配置上传文件的存放位置
    });

    // 解析表单
    form.parse(req, async (err, fields, files)=>{
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据

        // `files.avatar.filepath` = "E:\...\note-squared\server\app\public\avatar\20b5432fb0939b49e4ccb7300.jpg"
        const filename = files.avatar.filepath.split('avatar')[1].slice(1);     // filename = "20b5432fb0939b49e4ccb7300.jpg"

        await User.updateOne({_id: req.body._id}, {avatar: filename});

        res.status(200).send({
            _id: req.body._id,
            avatarUrl: `/static/avatar/${filename}`
        });
    });
}

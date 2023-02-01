const { db } = require("../configs/db");

const getData = async (req, res) => {
    let SQL = 'SELECT * FROM task ORDER BY id desc'
    let reponse = await db.query(SQL, (err, _data)=> {
        if(err){
            return res.json({
                status: 'error',
                data: {message: 'erreur'}
            })
        }
        return res.json({
            status: 'success',
            data: _data.rows
        })
    })
    return reponse
};

const countTask = async (req, res) => {
    let SQL = `SELECT COUNT(id) as nombre FROM task WHERE status = 'Not completed'`
    let reponse = await db.query(SQL, (err, _data)=> {
        if(err){
            return res.json({
                status: 'error',
                data: {message: 'erreur'}
            })
        }
        return res.json({
            status: 'success',
            data: _data.rows
        })
    })
    return reponse
}
const postData = async (req, res) => {
    const {title, message} = req.body;
    let SQL = `INSERT INTO public.task(
        title, message, status)
        VALUES ('${title}', '${message}', 'Not completed')`;
        let reponse = await db.query(SQL, async (err, _data) => {
            if(err) {
                return res.json({
                    status: 'error',
                    data: {message: 'erreur'}
                })
            }
            return res.json({
                status: 'success',
                data: { message: 'Ajouté avec succès' },
              })
        })
        return reponse
}

const putData = async (req, res) => {
    const {id} = req.params;
    const {title, message} = req.body;
    let SQL = `UPDATE public.task
	SET title='${title}', message='${message}'
	WHERE id=${id}`;
        let reponse = await db.query(SQL, async (err, _data) => {
            if(err) {
                return res.json({
                    status: 'error',
                    data: {message: 'erreur'}
                })
            }
            return res.json({
                status: 'success',
                data: { message: 'Modifié avec succès' },
              })
        })
        return reponse
}

const putDataStatus = async (req, res) => {
    const {id} = req.params;
    let SQL = `UPDATE public.task
	SET status='Completed' WHERE id=${id}`;
        let reponse = await db.query(SQL, async (err, _data) => {
            if(err) {
                return res.json({
                    status: 'error',
                    data: {message: 'erreur'}
                })
            }
            return res.json({
                status: 'success',
                data: { message: 'Status completed with success' },
              })
        })
        return reponse
}
const deleteData = async (req, res) => {
    const {id} = req.params;
    let SQL = `DELETE FROM public.task
	WHERE id=${id}`;
    let reponse = await db.query(SQL, async (err, _data) => {
        if(err) {
            return res.json({
                status: 'error',
                data: {message: 'erreur'}
            })
        }
        return res.json({
            status: 'success',
            data: { message: 'Supprimer avec succès' },
          })
    })
    return reponse
}
module.exports ={
    getData,
    postData,
    putData,
    deleteData,
    putDataStatus,
    countTask
}
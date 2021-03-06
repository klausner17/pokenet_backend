import { User } from './../models/User';
import * as express from 'express';
import auth from '../middlewares/authentication';
import { Trainner } from '../models/Trainner';
const trainnerRouter = express.Router();
trainnerRouter
    .route('/trainner')
    .all(auth.authenticate())
    .get((req, res) => {
    const options = {
        attributes: ['id', 'name', 'level'],
        where: { userId: req.user.id },
        include: [{
                model: User,
                attributes: ['id', 'name']
            }]
    };
    Trainner.findAll(options)
        .then((trainners) => {
        res.status(200).json(trainners);
    })
        .catch((err) => res.status(412).json({ msg: err.message }));
})
    .post((req, res) => {
    delete req.body.id;
    req.body.userId = req.user.id;
    Trainner.create(req.body)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(412).json({ msg: err.message }));
});
trainnerRouter
    .route('/trainner/:id')
    .all(auth.authenticate())
    .get((req, res) => {
    const options = {
        attributes: ['id', 'name'],
        include: [{
                model: Trainner,
                attributes: ['id', 'name', 'level'] }],
    };
    Trainner.findOne({ where: { id: req.params.id, userId: req.user.id } })
        .then((trainner) => {
        res.status(200).json(trainner);
    })
        .catch((err) => res.status(412).json({ msg: err.message }));
})
    .put((req, res) => {
    Trainner.update(req.body, {
        where: { id: req.params.id, userId: req.user.id },
    })
        .then((result) => res.sendStatus(204))
        .catch((err) => res.status(412).json({ msg: err.message }));
})
    .delete((req, res) => {
    Trainner.destroy({ where: { id: req.params.id, userId: req.user.id } })
        .then((result) => res.sendStatus(204))
        .catch((err) => res.status(412).json({ msg: err.message }));
});
export default trainnerRouter;

import express from 'express';
import { getUsers, createUsers, getUser, deleteUser, updateUser } from '../controller/users.js';
const router = express.Router();


router.get('/users', getUsers);
router.post('/user', createUsers);
router.get('/user/:ID', getUser);
router.delete('/user/:ID', deleteUser);
router.put('/user/:ID', updateUser);
export default router;
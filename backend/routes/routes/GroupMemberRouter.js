import { Router } from 'express';
import { GroupMemberController } from '../../controllers/GroupMemberController.js';

const router = Router();

// router.get('/group/:group_id', GroupMemberController.getByGroup);
// router.get('/user/:user_id', GroupMemberController.getByUser);
router.post('/', GroupMemberController.addMember);
// router.put('/:group_id/:user_id', GroupMemberController.updateMember);
// router.delete('/:group_id/:user_id', GroupMemberController.removeMember);

export default router;

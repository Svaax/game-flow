import models from '../db/index.js';

export class GroupMemberController {
    static async addMember(req, res) {
        try {
            const { group_id, user_id, role } = req.body;
            const member = await models.GroupMember.create({
                group_id,
                user_id,
                role,
                joined_at: new Date()
            });
            res.status(201).json(member);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add member to group' });
        }
    }

    static async getMembers(req, res) {
        try {
            const { group_id } = req.params;
            const members = await models.GroupMember.findAll({ where: { group_id } });
            res.json(members);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch group members' });
        }
    }
}

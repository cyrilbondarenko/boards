import * as axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    }
});

export const axiosAPI = {
    updateInstance(){
        instance = axios.create({
            baseURL: "http://localhost:3001/",
            headers: {
                "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
            }
        });
    }
}

export const authAPI = {
    async auth() {
        try {
            const auth = await instance.post(`auth`);
            return auth;
        } catch (e) {
            console.log(e);
        }
    },
    async login(login, password) {
        const data = await instance.post(`auth/login`, {login, password});
        return data;
    },
    async register(formData) {
        const response = await instance.post(`auth/registration`, formData);
        return response.data;
    }
};

export const API = {
    async getBoards() {
        const response = await instance.get(`boards`);
        return response.data;
    },
    async getBoard(boardId) {
        const response = await instance.get(`boards/${boardId}`);
        return response.data;
    },
    async getTask(taskId) {
        const response = await instance.get(`tasks/${taskId}`);
        return response.data;
    },
    async getMembers(boardId) {
        const response = await instance.get(`boards/${boardId}/members`);
        return response.data;
    },
    async getRoles() {
        const response = await instance.get(`roles`);
        return response.data;
    },
    async newBoard(title) {
        const response = await instance.post(`boards`, {title});
        return response.data;
    },
    async newBlock(title, boardId) {
        const response = await instance.post(`blocks`, {title, boardId});
        return response.data;
    },
    async newTask(title, blockId) {
        const response = await instance.post(`tasks`, {title, blockId});
        return response.data;
    },
    async newAttachments(formData) {
        const response = await instance.post(`attachments`, formData);
        return response.data;
    },
    async updateTitle(boardId, title) {
        const response = await instance.put(`boards/${boardId}/title`, {title});
        return response.data;
    },
    async updateDescription(boardId, description) {
        const response = await instance.put(`boards/${boardId}/description`, {description});
        return response.data;
    },
    async updateImage(boardId, formData) {
        const response = await instance.put(`boards/${boardId}/image`, formData);
        return response.data;
    },
    async updateRole(boardId, userId, roleId) {
        const response = await instance.put(`updateRole`, {boardId, userId, roleId});
        return response.data;
    },
    async getInvites() {
        const response = await instance.get(`invites`);
        return response.data;
    },
    async newInvite(boardId, invitedLogin) {
        const response = await instance.post(`sendInvite`, {boardId, invitedLogin});
        return response.data;
    },
    async acceptInvite(id) {
        const response = await instance.post(`acceptInvite`, {id});
        return response.data;
    },
    async declineInvite(id) {
        const response = await instance.post(`declineInvite`, {id});
        return response.data;
    },
    async updateBlockTitle(blockId, title) {
        const response = await instance.put(`blocks/${blockId}/title`, {title});
        return response.data;
    },
};

export const profileAPI = {
    async updateProfile(name, surname, middlename, position, email, password) {
        const response = await instance.put(`profile/update`, {name, surname, middlename, position, email, password});
        return response.data;
    },
    async updateAvatar(formData) {
        const response = await instance.put(`profile/avatar`, formData);
        return response.data;
    },
    async updatePassword(currentPassword, newPassword) {
        const response = await instance.put(`profile/password`, {currentPassword, newPassword});
        return response.data;
    }
};

export const tasksAPI = {
    async updateTitle(taskId, title) {
        const response = await instance.put(`tasks/${taskId}/title`, {title});
        return response.data;
    },
    async updateImage(taskId, formData) {
        const response = await instance.put(`tasks/${taskId}/image`, formData);
        return response.data;
    },
    async updateDescription(taskId, description) {
        const response = await instance.put(`tasks/${taskId}/description`, {description});
        return response.data;
    },
    async moveTask(taskId, blockId) {
        const response = await instance.put(`tasks/${taskId}/move`, {blockId});
        return response.data;
    },
    async deleteTask(taskId) {
        const response = await instance.post(`tasks/${taskId}/delete`);
        return response.data;
    },
    async deleteAttachment(attachmentId) {
        const response = await instance.post(`attachments/delete`, {attachmentId});
        return response.data;
    }
};

export const boardsAPI = {
    async kick(boardId, userId) {
        const response = await instance.post(`kick`, {boardId, userId});
        return response.data;
    },
    async leave(boardId) {
        const response = await instance.post(`boards/${boardId}/leave`);
        return response.data;
    },
    async delete(boardId) {
        const response = await instance.post(`boards/${boardId}/delete`);
        return response.data;
    },
};

export const blocksAPI = {
    async delete(blockId) {
        const response = await instance.post(`blocks/${blockId}/delete`);
        return response.data;
    },
};
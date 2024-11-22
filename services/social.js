import axios from "../backendapi";

export const LikePost = async (payload) => {
    try {
        return await axios.post(`Feeds/LikePost`, payload)
    } catch (error) {
        return error
    }
}

export const CreatePostComment = async (payload) => {
    try {
        return await axios.post(`Feeds/Comment`, payload)
    } catch (error) {
        return error
    }
}

export const UpdateProfileVisibility = ({ userId, tenantId, visibility }) => {
    return axios.get(`Account/socials/UpdateProfileVisibility?userId=${userId}&tenantId=${tenantId}&visibility=${visibility}`)
}

export const GetChurchUsers = (tenantId) => {
    return axios.get(`Account/socials/getcontacts?tenantId=${tenantId}`)
}

export const GetConnectedFriends = (userId, tenantId) => {
    return axios.get(`Socials/GetAllFriends?mobileUserID=${userId}&tenantId=${tenantId}`)
}

export const GetOrgSpecificConnections = (userId, tenantId) => {
    return axios.get(`Socials/GetOrganisationSpecificConnectionGraph?mobileUserID=${userId}&tenantId=${tenantId}`)
}

export const GetGlobalConnections = (userId) => {
    return axios.get(`Socials/GetGlobalConnectionGraph?mobileUserID=${userId}`)
}

export const RequestConnection = (payload) => {
    return axios.post(`Socials/RequestFriendShip`, payload)
}


export const GetPendingConnectionRequest = (userId, tenantId) => {
    return axios.get(`Socials/GetAllPendingFriendRequest?mobileUserID=${userId}&tenantId=${tenantId}`)
}

export const ApproveConnectionRequest = (payload) => {
    return axios.post(`Socials/ApproveFriendShip`, payload)
}

export const DeclineConnectionRequest = (payload) => {
    return axios.post(`Socials/DeclineFriendShipRequest`, payload)
}

export const GetAllMessages = (userId) => {
    console.log(`Socials/GetAllChatMessages?mobileUserID=${userId}`)
    return axios.get(`Socials/GetAllChatMessages?mobileUserID=${userId}`)
}

export const GetSingleConnectionChatMessages = (userId, recieverId) => {
    return axios.get(`Socials/GetAllChatMessagesForAConnection?mobileUserID=${userId}&mobile2UserID=${recieverId}`)
}

export const CreateNewChatMessage = (payload) => {
    return axios.post(`Socials/SaveChatMessage`, payload)
}

export const CreateNewPost = (payload) => {
    return axios.post(`Socials/CreatePost`, payload)
}

export const GetAllSocialPost = (userId) => {
    return axios.get(`Socials/GetFeeds?mobileUserID=${userId}`)
}

export const GetUserSocialProfile = async (userId, loggedUser) => {
    return await axios.get(`Socials/GetUserProfileInformation?mobileUserId=${userId}&loggedInUserId=${loggedUser}`)
}

export const GetUserSocialPost = async (userId) => {
    console.log(`Socials/GetUserProfileInformation?mobileUserId=${userId}`)
    return await axios.get(`Socials/GetUserFeeds?mobileUserID=${userId}`)
}

export const GetSingleUserPost = async (userId, postId) => {
    return await axios.get(`Socials/GetSingleFeed?mobileUserID=${userId}&postId=${postId}`)
}

export const CreateSocialCommentOnPost = async (payload) => {
    return await axios.post(`Socials/CreateComment`, payload)
}

export const LikeSocialPost = async (payload) => {
    return await axios.post(`Socials/LikePost`, payload)
}

export const FlagPost = async (payload) => {
    return await axios.post(`Socials/FlagPost`, payload)
}

export const BlockUser = async (payload) => {
    return await axios.post(`Socials/BlockFriendShipRequest`, payload)
}
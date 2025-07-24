import { axiosInstance } from "./axios";
import getFinger from "../hooks/getFinger";


export const signup = async (signupData) => {
  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  signupData.fingerPrint = fingerPrint;
  const response = await axiosInstance.post("/auth/signUp", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  loginData.fingerPrint = fingerPrint;
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};



export const logout = async () => {
  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/auth/logout",{fingerPrint});
  return response.data;
};

export const resetPassword = async (loginData) => {
  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/auth/resetPassword", loginData);
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const {fingerPrint} = await getFinger();
    console.log(fingerPrint);
    const res = await axiosInstance.post("/auth/me",{fingerPrint});
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const {fingerPrint} = await getFinger();
  userData.fingerPrint = fingerPrint;
  const response = await axiosInstance.post("/auth/verifyEmail", userData);
  return response.data;
};

export async function getUserFriends() {

  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/users/get-friends",{fingerPrint});
  return response.data.friends;
}

export async function getUserRooms() {

  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/users/get-my-rooms",{fingerPrint});
  return response.data.rooms;

 
}

export async function getRoomInvites() {
   const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/users/get-room-invites",{fingerPrint});
  return response.data.invitations;
}

export async function deleteMyRoom(roomId) {
   const {fingerPrint} = await getFinger();
    const response = await axiosInstance.post("/users/deleteRoom",{fingerPrint,roomId});
  return response.data;
}

export async function createRoom({title,language}) {
   const {fingerPrint} = await getFinger();
    const response = await axiosInstance.post("/users/create-room",{fingerPrint,title,language});
  return response.data;
}

export async function getPastRooms() {
   const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/users/pastRooms",{fingerPrint});
  return response.data.rooms;
}

export async function sendRoomInvite({roomId, friendId}) {
      const {fingerPrint} = await getFinger();
      console.log("hit sent invite...")
      const response = await axiosInstance.post("/users/send-room-invite",{roomId,friendId,fingerPrint});
      return response.data;
}

// router.post("/get-my-rooms",getMyRooms);
// router.post("/pastRooms",getPastRooms);
// router.post("/create-room",createRoom);
// router.post("/deleteRoom",deleteRoom);

export async function getRecommendedUsers() {
  const {fingerPrint} = await getFinger();
  console.log(fingerPrint);
  const response = await axiosInstance.post("/users/getsuggestions",{fingerPrint});
  return response.data.suggestions;
}

export async function getOutgoingFriendReqs() {
  const {fingerPrint} = await getFinger();
  const response = await axiosInstance.post("/users/outgoing-friend-requests",{fingerPrint});
  return response.data.requests;
}

export async function sendFriendRequest(userId) {
  const {fingerPrint} = await getFinger();
  const response = await axiosInstance.post(`/users/send-friend-request`,{fingerPrint,receiverId:userId});
  return response.data;
}

export async function getFriendRequests() {
  const {fingerPrint} = await getFinger();
  const response = await axiosInstance.post("/users/get-friend-requests",{fingerPrint});
  return response.data.requests;
}


export async function acceptFriendRequest(requestId) {
  const {fingerPrint} = await getFinger();
  const response = await axiosInstance.post(`/users/accept-friend-request`,{fingerPrint,friendRequestId:requestId});
  return response.data;
}

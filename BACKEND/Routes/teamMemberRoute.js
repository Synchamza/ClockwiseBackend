import express from "express";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  getTeamMember,
  searchTeamMember
} from "../Controllers/teamMemberController.js";
import { verifyTeamMemberAdmin, verifyToken } from "../Utils/verifyToken.js";
const teamMemberRoute = express.Router();

// http://{domain-name}/api/teamMembers/create
teamMemberRoute.post("/create", verifyToken, verifyTeamMemberAdmin, createTeamMember);

// http://{domain-name}/api/teamMembers/:teamMemberId
teamMemberRoute.put("/update/:teamMemberId", verifyToken, verifyTeamMemberAdmin, updateTeamMember);

// http://{domain-name}/api/teamMembers/:teamMemberId
teamMemberRoute.delete("/delete/:teamMemberId", verifyToken, verifyTeamMemberAdmin, deleteTeamMember);

// http://{domain-name}/api/teamMembers/:teamMemberId
teamMemberRoute.get("/getSingleTeamMember/:teamMemberId", verifyToken, getTeamMember);

// http://{domain-name}/api/teamMembers/find
teamMemberRoute.get("/find", verifyToken, getAllTeamMembers);

// http://{domain-name}/api/teamMembers/query
teamMemberRoute.get("/query", verifyToken, searchTeamMember);

export default teamMemberRoute;

import express from "express";
import {
  applyForJob,
  createJob,
  viewApplicants,
  updateApplicationStatus,
  getAllJobs,
  getAppliedJobs,
  GetJobsOfEmployer,
  deleteJob,
} from "../controllers/job-controller.js";
import { AuthUser, verifyRole } from "../middlewares/user-auth-middleware.js";
import { Role } from "@prisma/client";
import upload from "../config/multer.js";
import { cacheMiddleware } from "../middlewares/cache-middleware.js";
const router = express.Router();



router.post(
  "/post-job",
  AuthUser,
  upload.single("companyLogo"),
  verifyRole([Role.EMPLOYER, Role.ADMIN]),
  createJob
);

router.get(
  "/delete-job/:jobId",
  AuthUser,
  verifyRole([Role.EMPLOYER]),
  deleteJob
);
router.get(
  "/view-applicants/:id",
  AuthUser,
  verifyRole([Role.ADMIN, Role.EMPLOYER]),
  viewApplicants
);

router.post(
  "/apply-job/:jobId",
  AuthUser,
  verifyRole([Role.JOB_SEEKER]),
  applyForJob
);

router.put(
  "/update-application-status/:id",
  AuthUser,
  verifyRole([Role.EMPLOYER, Role.ADMIN]),
  updateApplicationStatus
);

router.get(
  "/get-all-jobs",
  AuthUser,
  verifyRole([Role.JOB_SEEKER]),
  // cacheMiddleware("all-jobs"),
  getAllJobs
);

router.get(
  "/applied-jobs",
  AuthUser,
  verifyRole([Role.JOB_SEEKER]),
  getAppliedJobs
);

router.get(
  "/get-jobs-of-employer",
  AuthUser,
  verifyRole([Role.EMPLOYER]),
  GetJobsOfEmployer
);

export default router;

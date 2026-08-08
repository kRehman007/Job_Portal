import prisma from "../db/prisma";
import { sendEmailForAcceptingAndRejecting, sendEmailForApplying, } from "../utils/sendEmail";
export const createJob = async (req, res) => {
    const { title, description, location, salary, skills, companyName, companyEmail, seats, jobType, experience, } = req.body;
    const employerId = req.user.id;
    if (!employerId) {
        res.status(400).json({ error: "EmployerId not found" });
        return;
    }
    if (!title ||
        !description ||
        !location ||
        !salary ||
        !skills ||
        !jobType ||
        !companyEmail ||
        !companyName) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        let companyLogoURL;
        if (req.file) {
            companyLogoURL = req.file.path;
        }
        const createdJob = await prisma.job.create({
            data: {
                title,
                description,
                location,
                jobType,
                companyName,
                companyLogo: companyLogoURL,
                companyEmail,
                experience: experience ? parseInt(experience) : 0,
                salary: Number(salary),
                availabe_seats: parseInt(seats),
                skills,
                employerId: parseInt(employerId),
            },
        });
        // await redis.del("all-jobs");
        res.status(201).json(createdJob);
        return;
    }
    catch (error) {
        console.log("error in creating-job controller", error.message);
        res.status(500).json({ error: `internal server error ${error.message}` });
    }
};
export const deleteJob = async (req, res) => {
    const { jobId } = req.params;
    if (!jobId) {
        res.status(400).json({ error: "JobId is required" });
        return;
    }
    try {
        const job = await prisma.job.findUnique({ where: { id: parseInt(jobId) } });
        if (!job) {
            res.status(400).json({ error: "Job is not found" });
            return;
        }
        await prisma.job.delete({ where: { id: parseInt(jobId) } });
        // await redis.del("all-jobs");
        // await redis.del(`applied-jobs-${req.user.id}`);
        // await redis.del(`employer-jobs-${req.user.id}`);
        // await redis.del(`applicants-${jobId}`);
        res.status(200).json({ message: "Job deleted successfully" });
    }
    catch (error) {
        console.error("Error in  deleting-job controller:", error.message);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
        return;
    }
};
export const viewApplicants = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: "Id is required" });
        return;
    }
    try {
        // const cachedApplicants = await redis.get(`applicants-${id}`);
        // if (cachedApplicants) {
        //   res.status(200).json(JSON.parse(cachedApplicants));
        //   return;
        // }
        const job = await prisma.job.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                applicants: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!job) {
            res.status(404).json({ error: "job not found" });
            return;
        }
        // await redis.set(`applicants-${id}`, JSON.stringify(job.applicants), {
        //   EX: 3600,
        // });
        res.status(200).json(job.applicants);
    }
    catch (error) {
        console.error("error in viewing application-controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
    }
};
export const applyForJob = async (req, res) => {
    const { jobId } = req.params;
    if (!jobId) {
        res.status(400).json({ error: "JobId not found" });
        return;
    }
    try {
        const JobDetail = await prisma.job.findUnique({
            where: { id: parseInt(jobId) },
            include: {
                employer: true,
            },
        });
        const userDetails = await prisma.user.findUnique({
            where: { id: parseInt(req.user?.id) },
            select: {
                fullName: true,
                email: true,
            },
        });
        if (!userDetails) {
            res.status(400).json({ error: "userDetails not found" });
            return;
        }
        if (!JobDetail) {
            res.status(400).json({ error: "job not found" });
            return;
        }
        const existingApplication = await prisma.jobApplication.findFirst({
            where: {
                userId: parseInt(req.user.id),
                jobId: parseInt(jobId),
            },
        });
        if (existingApplication) {
            res.status(400).json({ error: "You have already applied for this job" });
            return;
        }
        await prisma.jobApplication.create({
            data: {
                userId: parseInt(req.user.id),
                jobId: parseInt(jobId),
                status: "pending",
            },
        });
        await sendEmailForApplying(userDetails?.fullName, userDetails?.email, JobDetail?.employer?.email, JobDetail?.title);
        // await redis.del("all-jobs");
        // await redis.del(`applied-jobs-${req.user.id}`);
        // await redis.del(`applicants-${jobId}`);
        res.status(200).json({ message: "you succesfuuly applied for job" });
        return;
    }
    catch (error) {
        console.log("error in applying-job controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
    }
};
export const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    if (!status || !id) {
        res.status(400).json({ error: "Status or Id is required" });
        return;
    }
    if (!["approved", "rejected", "pending"].includes(status)) {
        res.status(404).json({ error: "Invalid status" });
        return;
    }
    try {
        const application = await prisma.jobApplication.update({
            where: {
                id: parseInt(id),
            },
            data: { status },
            include: { user: true, job: true },
        });
        if (!application) {
            res.status(404).json({ error: "Application not found" });
            return;
        }
        if (status !== "pending") {
            const emailMessage = status === "approved"
                ? `Congratulations! Your application for ${application.job.title} has been approved.`
                : `We're sorry! Your application for ${application.job.title} was rejected.`;
            await sendEmailForAcceptingAndRejecting(application.user.email, `Job Application ${status}`, emailMessage);
        }
        // await redis.del(`applied-jobs-${req.user.id}`);
        // await redis.del(`applicants-${id}`);
        res.status(200).json({ message: `Application ${status} successfully` });
    }
    catch (error) {
        console.log("error in updating-job-status controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
    }
};
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            include: {
                employer: true,
            },
        });
        // await redis.set("all-jobs", JSON.stringify(jobs), { EX: 3600 });
        res.status(200).json(jobs || []);
        return;
    }
    catch (error) {
        console.log("error in getting-all-jobs controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
        return;
    }
};
export const getAppliedJobs = async (req, res) => {
    const userId = req.user.id;
    try {
        // const cachedJobs = await redis.get(`applied-jobs-${req.user.id}`);
        // if (cachedJobs) {
        //   res.status(200).json(JSON.parse(cachedJobs));
        //   return;
        // }
        const jobs = await prisma.jobApplication.findMany({
            where: { userId: userId },
            include: {
                job: true,
            },
        });
        // await redis.set(`applied-jobs-${req.user.id}`, JSON.stringify(jobs), {
        //   EX: 3600,
        // });
        res.status(200).json(jobs);
        return;
    }
    catch (error) {
        console.log("error in getting-applied-jobs controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
        return;
    }
};
export const GetJobsOfEmployer = async (req, res) => {
    const employerId = parseInt(req.user.id);
    if (!employerId) {
        res.status(400).json({ error: "EmployerId not found" });
        return;
    }
    try {
        // const cachedJobs = await redis.get(`employer-jobs-${req.user.id}`);
        // if (cachedJobs) {
        //   res.status(200).json(JSON.parse(cachedJobs));
        //   return;
        // }
        const postedJobs = await prisma.job.findMany({
            where: { employerId },
            include: { applicants: true },
        });
        // await redis.set(
        //   `employer-jobs-${req.user.id}`,
        //   JSON.stringify(postedJobs),
        //   { EX: 3600 }
        // );
        res.status(200).json(postedJobs);
        return;
    }
    catch (error) {
        console.log("error in getting-posted-jobs controller", error.message);
        res.status(500).json({ error: `Internal server error ${error.message}` });
        return;
    }
};

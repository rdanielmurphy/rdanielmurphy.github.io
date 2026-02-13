import { Metadata } from "next";
import ResumeClient from "@/components/ResumeClient";

export const metadata: Metadata = { title: "Resume | Daniel Murphy" };

export default function ResumePage() {
  return <ResumeClient />;
}

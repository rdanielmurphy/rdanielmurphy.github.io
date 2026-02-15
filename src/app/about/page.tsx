import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return <AboutClient />;
}

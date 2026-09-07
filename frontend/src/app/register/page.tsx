import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: `Register - ${site.name}`,
  description: "Register to attend Qiskit Fall Fest 2026.",
};

export default function RegisterPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">{site.dates}</p>
          <h1 className="font-display text-4xl text-mist-100 sm:text-5xl">
            Register to attend
          </h1>
          <p className="mt-4 text-base text-mist-500">
            Free for all students. Takes under two minutes. Registering for the hackathon
            separately? Head to the{" "}
            <a href={site.hackathonUrl} className="text-bloom-400 underline underline-offset-4">
              hackathon sign-up
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

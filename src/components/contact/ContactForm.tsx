"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "info@riccisbikkies.com";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line p-12 flex flex-col gap-4">
        <span className="text-mono">Message Sent</span>
        <h2 className="text-md">Thanks for getting in touch.</h2>
        <p className="opacity-80 leading-[1.6]">
          We&apos;ll get back to you within a day. In a hurry? Call us on{" "}
          <a href="tel:+61407380946" className="border-b border-text-main no-underline text-text-main">
            0407 380 946
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-mono">Send a Message</span>
        <p className="opacity-70 text-[0.9rem]">
          Prefer email? Reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="border-b border-text-main no-underline text-text-main hover:opacity-60 transition-opacity"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
        <label className="flex flex-col gap-2">
          <span className="text-mono">Name</span>
          <input
            type="text"
            required
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Full name"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mono">Email</span>
          <input
            type="email"
            required
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Email address"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-mono">Message</span>
        <textarea
          rows={4}
          required
          className="bg-transparent border border-line p-4 font-sans text-text-main outline-none resize-none placeholder:text-line"
          placeholder="How can we help?"
        />
      </label>

      <button
        type="submit"
        className="mt-2 bg-transparent border border-text-main text-text-main py-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] cursor-pointer transition-all duration-300 w-full hover:bg-text-main hover:text-bg"
      >
        Send Message
      </button>
    </form>
  );
}

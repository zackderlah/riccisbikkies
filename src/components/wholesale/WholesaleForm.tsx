"use client";

import { FormEvent, useState } from "react";

export default function WholesaleForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line p-12 flex flex-col gap-4">
        <span className="text-mono">Enquiry Received</span>
        <h2 className="text-md">Thank you for your interest.</h2>
        <p className="opacity-80 leading-[1.6]">
          Our trade team will review your enquiry and respond within two
          business days with pricing, availability and delivery options.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-line pt-8 flex flex-col gap-8"
    >
      <span className="text-mono">Submit an Enquiry</span>

      <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
        <label className="flex flex-col gap-2">
          <span className="text-mono">Business Name</span>
          <input
            type="text"
            required
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Your business"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mono">Contact Name</span>
          <input
            type="text"
            required
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Full name"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
        <label className="flex flex-col gap-2">
          <span className="text-mono">Email</span>
          <input
            type="email"
            required
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Email address"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mono">Phone</span>
          <input
            type="tel"
            className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
            placeholder="Phone number"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-mono">Business Type</span>
        <select
          required
          className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="deli">Specialty Deli / Grocer</option>
          <option value="restaurant">Restaurant / Café</option>
          <option value="cellar">Cellar Door / Winery</option>
          <option value="hotel">Hotel / Catering</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-mono">Products of Interest</span>
        <textarea
          rows={3}
          className="bg-transparent border border-line p-4 font-sans text-text-main outline-none resize-none placeholder:text-line"
          placeholder="Which provisions are you interested in stocking?"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-mono">Estimated Monthly Volume</span>
        <input
          type="text"
          className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
          placeholder="e.g. 50 units per month"
        />
      </label>

      <button
        type="submit"
        className="mt-4 bg-transparent border border-text-main text-text-main py-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] cursor-pointer transition-all duration-300 w-full hover:bg-text-main hover:text-bg"
      >
        Submit Enquiry
      </button>
    </form>
  );
}

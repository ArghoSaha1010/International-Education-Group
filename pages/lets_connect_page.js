import Head from 'next/head';
import { useRef, useState } from 'react';
import AdminFooterAccess from '../components/AdminFooterAccess';

const initialFormData = {
  name: '',
  email: '',
  institution: '',
  interest: '',
  message: '',
};

const interestOptions = [
  'Study opportunities',
  'Institutional partnership',
  'Agent partnership',
  'Brand enquiry',
  'Other',
];

function validateContactForm(values) {
  const errors = {};
  const limits = { name: 120, email: 254, institution: 200, message: 5000 };
  const labels = {
    name: 'Name',
    email: 'Email address',
    institution: 'Institution or organization',
    message: 'Message',
  };

  for (const [field, label] of Object.entries(labels)) {
    if (!values[field]) errors[field] = `${label} is required.`;
    else if (values[field].length > limits[field]) {
      errors[field] = `${label} must be ${limits[field]} characters or fewer.`;
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!interestOptions.includes(values.interest)) {
    errors.interest = 'Choose a valid area of interest.';
  }

  return errors;
}

export default function LetsConnectPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const values = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      institution: formData.institution.trim(),
      interest: formData.interest,
      message: formData.message.trim(),
    };
    const fieldErrors = validateContactForm(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length) {
      setStatus({ type: 'error', message: 'Please correct the highlighted fields.' });
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Sending your enquiry…' });

    try {
      const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001').replace(/\/+$/, '');
      const response = await fetch(`${apiBaseUrl}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (response.status !== 201) {
        if (result.fields && typeof result.fields === 'object') setErrors(result.fields);
        throw new Error(result.error || 'We could not send your enquiry. Please try again.');
      }

      setFormData(initialFormData);
      setErrors({});
      setStatus({ type: 'success', message: 'Your enquiry has been saved successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof TypeError
          ? 'Unable to reach the server. Please try again.'
          : error.message || 'We could not send your enquiry. Please try again.',
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>International Education Group</title>
      </Head>

    <header className="top-header">

            <div className="top-header-container">

                <div className="top-header-brand">

                    <h3 className="top-header-brand-text">
                        GLOBAL EDUCATION. CONNECTED.
                    </h3>

                </div>


                <div className="top-header-navigation">

                    <a className="top-header-navigation-link" href="#">
                        For students

                        <span className="top-header-navigation-arrow">
                            ↗
                        </span>
                    </a>


                    <div className="top-header-divider"></div>


                    <a className="top-header-navigation-link" href="#">
                        For institutions & partners

                        <span className="top-header-navigation-arrow">
                            ↗
                        </span>
                    </a>

                </div>

            </div>

    </header>
    
    <header className="w-full bg-white px-[6%] pt-[23px] pb-[20px] font-[Poppins]">
  <div className="mx-auto flex h-[81px] w-full items-center justify-between rounded-full bg-[#f4f7fd] pl-[20px] pr-[17px]">

    {/* LOGO */}
    <a href="/" className="flex items-center">
      <img
        src="/assets/SVG%20Logo.png"
        alt="International Education Group"
        className="h-auto w-[125px] object-contain"
      />
    </a>

    {/* NAVIGATION LINKS */}
    <nav className="flex items-center gap-[43px] max-md:hidden">
      <a href="/#solutions" className="text-[13px] font-medium text-[#1c2a43] transition hover:text-[#7955f5]">
        Solutions
      </a>
      <a href="/#brands" className="text-[13px] font-medium text-[#1c2a43] transition hover:text-[#7955f5]">
        Our brands
      </a>
      <a href="/#about" className="text-[13px] font-medium text-[#1c2a43] transition hover:text-[#7955f5]">
        About IEG
      </a>
      <a href="/lets_connect_page" className="text-[13px] font-medium text-[#1c2a43] transition hover:text-[#7955f5]">
        Insights
      </a>
    </nav>

    {/* CONTACT BUTTON */}
    <a href="/lets_connect_page#ieg-contact-form" className="inline-flex h-[50px] items-center gap-[10px] rounded-full bg-[#1f4de0] px-[24px] text-[14px] font-medium text-white transition hover:bg-[#1a3fc0]">
      Let's connect
      <svg className="h-[14px] w-[14px] shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L12 4M5 4H12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>

  </div>
</header>
    



{/* ================= HERO SECTION ================= */}
<main className="relative w-full overflow-hidden bg-white">

{/* LEFT BOTTOM CIRCLE */}
{/* DECORATIVE BACKGROUND CIRCLES */}
{/* LEFT DECORATIVE CIRCLE (full circle, half outside the left edge) */}
<div className="pointer-events-none absolute left-0 top-[40px] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#f1f5fc]"></div>

{/* RIGHT DECORATIVE CIRCLE (full circle, half outside the right edge) */}
<div className="pointer-events-none absolute right-0 top-[40px] h-[280px] w-[280px] translate-x-1/2 rounded-full bg-[#f1f5fc]"></div>


    {/* HERO LAYOUT */}
    <section className="relative grid min-h-[410px] w-full grid-cols-2 items-center px-[6.8%] max-md:grid-cols-1 max-md:px-[6%] max-md:pb-[40px]">


        {/* LEFT CONTENT */}
        <div className="relative z-10 -mt-[10px] w-full">

            <h1 className="font-[Poppins] text-[34px] font-medium leading-[1.45] tracking-[-0.8px] text-[#1c2a43] max-lg:text-[30px] max-sm:text-[27px]">
                Your next possibility<br />

                <span className="font-semibold text-[#7955f5]">
                    starts here.
                </span>
            </h1>

            <p className="mt-[15px] max-w-[390px] font-[Poppins] text-[11px] font-normal leading-[1.7] text-[#66817b] max-md:text-[12px]">
                Tell us what you want to explore. We'll help you connect with the
                relevant part of the IEG family.
            </p>

        </div>


        {/* RIGHT IMAGE */}
        <div className="relative z-[1] flex w-full items-center justify-center max-md:mt-[20px]">

            <img
                src="/assets/building.png"
                alt="IEG education building surrounded by trees"
                className="block h-auto w-full max-w-[620px] object-contain" />

        </div>

    </section>



{/* ================= CONTACT SECTION ================= */}

{/* ================= CONTACT SECTION ================= */}

{/* ================= CONTACT SECTION ================= */}
<section className="relative min-h-[760px] w-full overflow-hidden bg-white">


    {/* MAIN CONTENT */}
    <div className="relative z-10 grid w-full grid-cols-2 items-start gap-[9%] px-[6.8%] py-[90px] max-lg:gap-[5%] max-md:grid-cols-1 max-md:gap-[55px] max-md:px-[6%] max-md:py-[60px]">


        {/* ================= LEFT CONTACT INFORMATION ================= */}
        <div className="w-full max-w-[750px]">


            {/* QUOTE ICON */}
            <div className="mb-[12px] flex flex-col items-start">

                <svg
                    className="h-[30px] w-[30px] text-[#7955f5]"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">

                    <path d="M12 5.5C7.3 5.5 4.5 9.1 4.5 14.4V21H12V14.8H8.4C8.4 11.6 9.6 9.9 12 9V5.5Z"/>
                    <path d="M25 5.5C20.3 5.5 17.5 9.1 17.5 14.4V21H25V14.8H21.4C21.4 11.6 22.6 9.9 25 9V5.5Z"/>

                </svg>

                <div className="mt-[2px] h-[3px] w-[26px] rounded-full bg-[#7955f5]"></div>

            </div>


            {/* HEADING */}
            <h2 className="font-[Poppins] text-[36px] font-medium leading-[1.5] tracking-[-0.8px] text-[#1c2a43] max-lg:text-[32px] max-md:text-[29px] max-sm:text-[26px">

                A real conversation.<br />
                A relevant connection.

            </h2>


            {/* PHONE & WHATSAPP */}
            <div className="mt-[38px]">

                <div className="flex items-center gap-[9px] text-[13px] font-medium text-[#1c2a43]">

                    <svg className="h-[16px] w-[16px] text-[#7955f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92Z"/>
                    </svg>

                    <span>Phone &amp; WhatsApp</span>

                </div>


                <p className="ml-[25px] mt-[16px] text-[16px] font-normal text-[#64817b] max-sm:text-[14px">
                    +880 1844 490180
                </p>


                <a href="https://wa.me/8801844490180"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="ml-[25px] mt-[12px] inline-flex items-center gap-[8px] border-b border-[#d6d0fc] pb-[6px] text-[12px] font-medium text-[#7955f5] transition hover:text-[#5637d6">

                    Chat with IEG on WhatsApp

                    {/* ARROW ICON */}
                    <svg className="h-[14px] w-[14px] shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12L12 4M5 4H12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </a>

            </div>


            {/* BANGLADESH CONTACT */}
            <div className="mt-[40px]">

                <div className="flex items-center gap-[9px] text-[13px] font-medium text-[#1c2a43]">

                    {/* LOCATION ICON */}
                    <svg className="h-[16px] w-[16px] text-[#7955f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
                        <circle cx="12" cy="10" r="2.5"/>
                    </svg>

                    <span>Bangladesh contact point</span>

                </div>


                <p className="ml-[25px] mt-[15px] text-[16px] leading-[1.8] text-[#64817b] max-sm:text-[14px">
                    House 20, Road 13, Sector 07<br />
                    Uttara, Dhaka 1230<br />
                    Bangladesh
                </p>


                <p className="ml-[25px] mt-[12px] text-[14px] leading-[1.8] text-[#64817b] max-sm:text-[12px">
                    In-person student support through IAIC.<br />
                    Please contact us before visiting.
                </p>

            </div>


            {/* BRAND INFORMATION */}
            <div className="mt-[40px]">

                <div className="flex items-center gap-[9px] text-[13px] font-medium text-[#1c2a43]">

                    {/* BRAND ICON */}
                    <svg className="h-[16px] w-[16px] text-[#7955f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3v3"/>
                        <path d="M8 6h8"/>
                        <path d="M5 10l7-4 7 4-7 4-7-4Z"/>
                        <path d="M7 12v5c3 2 7 2 10 0v-5"/>
                        <path d="M19 10v5"/>
                    </svg>

                    <span>Looking for a particular brand?</span>

                </div>


                <p className="ml-[25px] mt-[15px] max-w-[340px] text-[16px] leading-[1.8] text-[#64817b] max-sm:text-[14px">

                    Explore each brand's profile to understand its role and find your next step.

                </p>


                <a href="#"
                   className="ml-[25px] mt-[12px] inline-flex items-center gap-[8px] border-b border-[#d6d0fc] pb-[6px] text-[12px] font-medium text-[#7955f5] transition hover:text-[#5637d6">

                    Meet our brands

                    {/* ARROW ICON */}
                    <svg className="h-[14px] w-[14px] shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12L12 4M5 4H12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </a>

            </div>

        </div>



        {/* ================= RIGHT FORM ================= */}
        <div className="w-full max-w-[540px] justify-self-end rounded-[12px] border border-[#e9eef7] bg-white p-[30px] max-lg:p-[24px] max-md:max-w-none max-md:justify-self-stretch max-sm:p-[18px]">


            {/* FORM HEADING */}
            <h3 className="font-[Poppins] text-[25px] font-medium text-[#1c2a43] max-sm:text-[21px">
                What's on your mind?
            </h3>

            <p className="mt-[8px] text-[13px] leading-[1.8] text-[#64817b] max-sm:text-[11px">
                Complete the form below and our team will receive your enquiry.
            </p>


            {/* FORM */}
            <form id="ieg-contact-form" onSubmit={handleSubmit} noValidate className="mt-[28px] space-y-[22px">


                {/* NAME & EMAIL */}
                <div className="grid grid-cols-2 gap-[12px] max-sm:grid-cols-1">


                    {/* NAME */}
                    <div>

                        <label htmlFor="contact-name" className="mb-[8px] block text-[13px] font-medium text-[#1c2a43]">
                            Your Name<span className="text-red-500">*</span>
                        </label>

                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder="Full name"
                            disabled={isSubmitting}
                            autoComplete="name"
                            maxLength={120}
                            value={formData.name}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                            required
                            className="h-[52px] w-full rounded-[3px] border border-[#e3eaf5] px-[14px] text-[13px] text-[#1c2a43] outline-none transition placeholder:text-[#64817b] focus:border-[#7955f5] focus:ring-1 focus:ring-[#7955f5]/20" />
                        {errors.name && <p id="contact-name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}

                    </div>


                    {/* EMAIL */}
                    <div>

                        <label htmlFor="contact-email" className="mb-[8px] block text-[13px] font-medium text-[#1c2a43]">
                            Email address<span className="text-red-500">*</span>
                        </label>

                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="you@organization.com"
                            disabled={isSubmitting}
                            autoComplete="email"
                            maxLength={254}
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                            required
                            className="h-[52px] w-full rounded-[3px] border border-[#e3eaf5] px-[14px] text-[13px] text-[#1c2a43] outline-none transition placeholder:text-[#64817b] focus:border-[#7955f5] focus:ring-1 focus:ring-[#7955f5]/20" />
                        {errors.email && <p id="contact-email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}

                    </div>

                </div>


                {/* INSTITUTION */}
                <div>

                    <label htmlFor="contact-institution" className="mb-[8px] block text-[13px] font-medium text-[#1c2a43]">
                        Institution or organization<span className="text-red-500">*</span>
                    </label>

                    <input
                        id="contact-institution"
                        name="institution"
                        type="text"
                        placeholder="If applicable"
                        disabled={isSubmitting}
                        autoComplete="organization"
                        maxLength={200}
                        value={formData.institution}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.institution)}
                        aria-describedby={errors.institution ? 'contact-institution-error' : undefined}
                        required
                        className="h-[52px] w-full rounded-[3px] border border-[#e3eaf5] px-[14px] text-[13px] text-[#1c2a43] outline-none transition placeholder:text-[#64817b] focus:border-[#7955f5] focus:ring-1 focus:ring-[#7955f5]/20" />
                    {errors.institution && <p id="contact-institution-error" className="mt-1 text-xs text-red-600">{errors.institution}</p>}

                </div>


                {/* INTEREST */}
                <div>

                    <label htmlFor="contact-interest" className="mb-[8px] block text-[13px] font-medium text-[#1c2a43]">
                        I'm interested in<span className="text-red-500">*</span>
                    </label>

                    <select
                        id="contact-interest"
                        name="interest"
                        disabled={isSubmitting}
                        value={formData.interest}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.interest)}
                        aria-describedby={errors.interest ? 'contact-interest-error' : undefined}
                        required
                        className="h-[52px] w-full appearance-none rounded-[3px] border border-[#e3eaf5] bg-white px-[14px] text-[13px] text-[#64817b] outline-none focus:border-[#7955f5] focus:ring-1 focus:ring-[#7955f5]/20"
                    >

                        <option value="" disabled>General enquiry</option>
                        <option value="Study opportunities">Study opportunities</option>
                        <option value="Institutional partnership">Institutional partnership</option>
                        <option value="Agent partnership">Agent partnership</option>
                        <option value="Brand enquiry">Brand enquiry</option>
                        <option value="Other">Other</option>

                    </select>
                    {errors.interest && <p id="contact-interest-error" className="mt-1 text-xs text-red-600">{errors.interest}</p>}

                </div>


                {/* MESSAGE */}
                <div>

                    <label htmlFor="contact-message" className="mb-[8px] block text-[13px] font-medium text-[#1c2a43]">
                        Tell us a little about your goals<span className="text-red-500">*</span>
                    </label>

                    <textarea
                        id="contact-message"
                        name="message"
                        rows="6"
                        disabled={isSubmitting}
                        required
                        maxLength={5000}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        placeholder="What would you like to explore with IEG?"
                        className="min-h-[175px] w-full resize-y rounded-[3px] border border-[#e3eaf5] px-[14px] py-[14px] text-[13px] leading-[1.7] text-[#1c2a43] outline-none transition placeholder:text-[#64817b] focus:border-[#7955f5] focus:ring-1 focus:ring-[#7955f5]/20"
                    ></textarea>
                    {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}

                </div>


                {status && (
                    <p
                        role={status.type === 'error' ? 'alert' : 'status'}
                        aria-live={status.type === 'error' ? 'assertive' : 'polite'}
                        className={`rounded-[3px] px-3 py-2 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-[#f3f6fc] text-[#1c2a43]'}`}
                    >
                        {status.message}
                    </p>
                )}


                {/* FORM SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="flex h-[50px] w-full items-center justify-center gap-[9px] rounded-[3px] bg-[#7955e8] text-[13px] font-medium text-white transition hover:bg-[#6744d7] focus:outline-none focus:ring-2 focus:ring-[#7955e8]/30 disabled:cursor-not-allowed disabled:opacity-70"
                >

                    {/* SEND ICON */}
                    <svg
                        className="h-[17px] w-[17px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round">

                        <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
                        <path d="M22 2 11 13" />

                    </svg>

                    {isSubmitting ? 'Sending…' : 'Send enquiry'}

                </button>


                {/* DISCLAIMER */}
                <p className="pt-[2px] text-[10px] leading-[1.8] text-[#78908b]">

                    Your enquiry is saved for our team. Please avoid sharing sensitive documents here.
                    <a href="#" className="underline underline-offset-2">Privacy information</a>.

                </p>

            </form>

        </div>

    </div>

</section>

<footer className="relative w-full overflow-hidden bg-white pt-8 md:pt-12">

  {/* Footer background */}
  <div className="relative overflow-hidden bg-[#f3f6fc] px-5 py-10 md:px-10 lg:px-[7%]">

    {/* Decorative circles */}
    <div className="pointer-events-none absolute -left-24 bottom-[-100px] h-[280px] w-[280px] rounded-full bg-[#ddf1ec]"></div>

    <div className="pointer-events-none absolute -right-24 -top-20 h-[300px] w-[300px] rounded-full bg-[#eaf0fb]"></div>

    {/* Main footer grid */}
    <div className="relative z-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

      {/* Logo & description */}
      <div className="max-w-sm">

        {/* Logo */}
        <a href="/" className="mb-5 inline-flex items-center">
          <img
            src="/assets/SVG%20Logo.png"
            alt="International Education Group"
            className="h-auto w-[125px] object-contain"
          />
        </a>

        {/* Description */}
        <p className="text-sm leading-6 text-[#698181]">
          A global integrated education service provider.
          Connecting people, institutions, and possibilities
          through a company of specialist brands.
        </p>

      </div>


      {/* Discover */}
      <div>
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[1px] text-[#1c2c49]">
          Discover
        </h3>

        <ul className="space-y-3 text-sm text-[#698181]">
          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">About our group</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">Our solutions</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">Partner with us</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">Guides & perspectives</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">Our presence</a>
          </li>
        </ul>
      </div>


      {/* Our brands */}
      <div>
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[1px] text-[#1c2c49]">
          Our brands
        </h3>

        <ul className="space-y-3 text-sm text-[#698181]">
          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">IAIC</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">UniSeek</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">AdmissionPortal</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">StudyPick</a>
          </li>

          <li>
            <a href="#" className="transition hover:text-[#1c2c49]">University Road</a>
          </li>
        </ul>
      </div>


      {/* Contact */}
      <div>
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[1px] text-[#1c2c49]">
          Start a conversation
        </h3>

        <div className="space-y-4 text-sm text-[#698181]">

          {/* Address */}
          <p className="leading-6">
            Uttara, Dhaka<br />
            Bangladesh
          </p>

          {/* Phone */}
          <a
            href="tel:+8801844490180"
            className="block text-xs font-semibold tracking-wide text-[#1c2c49] transition hover:text-blue-600"
          >
            +880 1844 490180
          </a>

          {/* WhatsApp */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 transition hover:text-[#1c2c49]"
          >
            Connect on Whatsapp
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>

          {/* Contact */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 transition hover:text-[#1c2c49]"
          >
            Contact IEG
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>

        </div>
      </div>

    </div>


    {/* Bottom divider */}
    <div className="relative z-10 mt-10 border-t border-[#dce3ec] pt-6 md:mt-12">

      {/* Bottom footer row */}
      <div className="flex flex-col gap-5 text-sm text-[#698181] lg:flex-row lg:items-center lg:justify-between">

        {/* Copyright */}
        <p>
          © 2026 International Education Group. All rights reserved.
        </p>

        {/* Legal links */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <a href="#" className="transition hover:text-[#1c2c49]">Privacy</a>
          <a href="#" className="transition hover:text-[#1c2c49]">Website terms</a>
          <a href="#" className="transition hover:text-[#1c2c49]">Accessibility</a>
          <AdminFooterAccess />
        </div>

        {/* Footer tagline */}
        <p className="font-medium">
          One group. Shared possibility.
        </p>

      </div>

    </div>

  </div>
</footer>

</main>





    </>
  );
}


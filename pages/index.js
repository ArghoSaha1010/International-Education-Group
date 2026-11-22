import Head from 'next/head';
import AdminFooterAccess from '../components/AdminFooterAccess';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>International Education Group</title>
      </Head>


    <div className="page-wrapper">


        {/* =====================================
             TOP HEADER
        ====================================== */}

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



        {/* =====================================
             MAIN NAVBAR
        ====================================== */}

        <header className="navbar">

            {/* LOGO */}
            <div className="logo">
                <img
                    src="/assets/SVG%20Logo.png"
                    alt="International Education Group"
                    className="h-auto w-[125px] object-contain"
                />
            </div>


            {/* NAVIGATION LINKS */}
            <nav className="nav-links">

                <a href="/#solutions" className="nav-link">
                    Solutions
                </a>

                <a href="/#brands" className="nav-link">
                    Our brands
                </a>

                <a href="/#about" className="nav-link">
                    About IEG
                </a>

                <a href="/lets_connect_page" className="nav-link">
                    Insights
                </a>

            </nav>


            {/* CONTACT BUTTON */}
            <a href="/lets_connect_page#ieg-contact-form" className="connect-btn">

                Let's connect

                <svg className="button-arrow"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">

                    <path d="M4 12L12 4M5 4H12V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"/>

                </svg>

            </a>

        </header>



        {/* =====================================
             HERO SECTION
        ====================================== */}

        <main className="hero-section">

            {/* DECORATIVE BACKGROUND */}
            <div className="left-decoration"></div>

            <div className="right-decoration"></div>


            {/* HERO CONTAINER */}
            <section className="hero-container">


                {/* LEFT CONTENT */}
                <div className="hero-content">

                    <h1 className="hero-title">

                        Connecting people.<br />

                        Expanding

                        <span className="highlight-text">
                            possibilities.
                        </span>

                    </h1>


                    <p className="hero-description">

                        From finding the right program to opening a new academic pathway,
                        our brands bring every part of the education journey closer together.

                    </p>



                    {/* HERO BUTTONS */}
                    <div className="hero-buttons">


                        {/* PRIMARY BUTTON */}
                        <a href="/#brands" className="primary-btn">

                            Explore our brands

                            <svg className="button-arrow"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">

                                <path d="M4 12L12 4M5 4H12V11"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>

                            </svg>

                        </a>



                        {/* SECONDARY BUTTON */}
                        <a href="#" className="secondary-btn">

                            Partner with IEG

                            <svg className="button-arrow"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">

                                <path d="M4 12L12 4M5 4H12V11"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>

                            </svg>

                        </a>

                    </div>

                </div>



                {/* RIGHT IMAGE */}
                <div className="hero-visual">


                    <img
                        src="/assets/laptop_group.png"
                        alt="Students studying together"
                        className="hero-image" />


                    {/* FLOATING CARD */}
                    <div className="floating-card">


                        {/* GRADUATION ICON */}
                        <div className="cap-icon">

                            <svg viewBox="0 0 32 32"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">

                                <path d="M2 11L16 4L30 11L16 18L2 11Z"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinejoin="round"/>

                                <path d="M7 14V22C12 26 20 26 25 22V14"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"/>

                                <path d="M30 11V21"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"/>

                            </svg>

                        </div>



                        {/* CARD TEXT */}
                        <div className="card-content">

                            <p className="card-title">
                                Your next chapter.
                            </p>

                            <p className="card-description">
                                A world of possibility.
                            </p>

                        </div>



                        {/* CARD ARROW */}
                        <div className="card-arrow">
                            ↗
                        </div>

                    </div>

                </div>

            </section>




            {/* =====================================
                 STATISTICS SECTION
            ====================================== */}

            <section className="stats-section">


                <div className="stat-item">

                    <h2 className="stat-number">
                        100M
                    </h2>

                    <p className="stat-description">
                        Student visitors per year
                    </p>

                </div>



                <div className="stat-item">

                    <h2 className="stat-number">
                        70k+
                    </h2>

                    <p className="stat-description">
                        Direct enrollment
                    </p>

                </div>



                <div className="stat-item">

                    <h2 className="stat-number">
                        5000
                    </h2>

                    <p className="stat-description">
                        Partner
                    </p>

                </div>


            </section>

            {/* =====================================
                 BOTTOM TEXT
            ====================================== */}
            <div className="bottom-text">

                SPECIALIST BRANDS. SHARED PURPOSE.

            </div>



            
{/* =====================================
     BRAND LOGO SECTION
====================================== */}

<section className="w-full overflow-hidden bg-white py-8 sm:py-10 lg:py-12">

    <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 items-center justify-items-center gap-x-5 gap-y-8 px-5 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-8 sm:px-8 lg:flex-nowrap lg:gap-5 lg:px-12 xl:px-16">

        {/* UNISEEK */}
        <img
            src="/assets/uniseek.png"
            alt="UniSeek"
            className="h-auto w-full max-w-[145px] object-contain sm:w-[17%] sm:max-w-[165px] lg:max-w-[180px]" />

        {/* IAIC */}
        <img
            src="/assets/IAIC.png"
            alt="IAIC"
            className="h-auto w-full max-w-[125px] object-contain sm:w-[13%] sm:max-w-[140px] lg:max-w-[150px]" />

        {/* STUDYPICK */}
        <img
            src="/assets/studypick.png"
            alt="StudyPick"
            className="h-auto w-full max-w-[145px] object-contain sm:w-[16%] sm:max-w-[170px] lg:max-w-[180px]" />

        {/* ADMISSION PORTAL */}
        <img
            src="/assets/admissionPortal.png"
            alt="Admission Portal"
            className="h-auto w-full max-w-[175px] object-contain sm:w-[21%] sm:max-w-[220px] lg:max-w-[230px]" />

        {/* UNIVERSITY ROAD */}
        <img
            src="/assets/universityRoad.png"
            alt="University Road"
            className="col-span-2 h-auto w-full max-w-[155px] object-contain sm:col-span-1 sm:w-[16%] sm:max-w-[170px] lg:max-w-[180px]" />

    </div>

</section>

<section id="about" className="relative w-full overflow-hidden bg-white py-16 md:py-20">

  {/* Full width container */}
  <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20">

    {/* Main card */}
    <div className="w-full rounded-sm bg-[#f3f6fc] p-5 md:p-8">

      {/* Top content */}
      <div className="grid grid-cols-1 gap-8 border-b border-[#d6e1f8] pb-6 md:grid-cols-2 md:gap-12">

        {/* Left heading */}
        <div className="flex items-center border-b border-[#d6e1f8] pb-5 md:border-b-0 md:border-r md:pb-0">
          <h2 className="text-2xl font-medium leading-[1.4] tracking-tight text-[#1b2d4b] md:text-3xl lg:text-4xl">
            A connected approach<br />
            to a world of <span className="text-[#4169ff]">education.</span>
          </h2>
        </div>

        {/* Right description */}
        <div className="flex flex-col justify-center md:pl-10">
          <p className="max-w-2xl text-sm leading-7 text-[#7b9096] md:text-base">
            We are International Education Group – a family of specialist
            education brands connecting students, institutions, and partners.
            We bring discovery, personal guidance, application technology,
            and academic pathways into one wide ecosystem.
          </p>

          <a
            href="#"
            className="mt-4 flex w-fit items-center gap-2 text-sm font-medium text-[#1b2d4b] transition hover:text-blue-600 md:text-base"
          >
            Get to know IEG <span>↗</span>
          </a>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-3 md:gap-6">

        {/* Stat 1 */}
        <div className="flex items-start gap-3">
          <span className="text-3xl font-medium leading-none text-[#4169ff] md:text-4xl">
            5
          </span>
          <div>
            <h3 className="text-base font-medium text-[#1b2d4b] md:text-lg">
              Specialist brands.
            </h3>
            <p className="text-sm leading-6 text-[#1b2d4b] md:text-base">
              Complementary expertise.
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-start gap-3">
          <span className="text-3xl font-medium leading-none text-[#4169ff] md:text-4xl">
            3
          </span>
          <div>
            <h3 className="text-base font-medium text-[#1b2d4b] md:text-lg">
              Connected audiences.
            </h3>
            <p className="text-sm leading-6 text-[#1b2d4b] md:text-base">
              Students. Institutions. Partners.
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-start gap-3">
          <span className="text-3xl font-medium leading-none text-[#4169ff] md:text-4xl">
            1
          </span>
          <div>
            <h3 className="text-base font-medium text-[#1b2d4b] md:text-lg">
              Shared purpose.
            </h3>
            <p className="text-sm leading-6 text-[#1b2d4b] md:text-base">
              More possibility through education.
            </p>
          </div>
        </div>

      </div>
    </div>

  </div>

</section>



<section className="relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">

  <div
  className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-[#edf2fc] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px]"
></div>
  {/* Background circle */}
<div
  className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#f1f5fc]"
></div>

  <div className="relative z-10 mx-auto w-full px-5 md:px-10 lg:px-[9%]">

    {/* Section heading */}
    <div className="mb-8 md:mb-10">
      <span className="mb-3 block h-[3px] w-8 rounded-full bg-[#4169ff]"></span>

      <h2 className="text-3xl font-medium leading-[1.4] tracking-[-0.8px] text-[#1c2c49] md:text-4xl lg:text-[42px]">
        Different ambitions.<br />
        The right connections.
      </h2>
    </div>

    {/* Main content */}
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">

      {/* Left image */}
      <div className="relative w-full overflow-hidden rounded-md">

        <img
          src="/assets/happyGroup.jpg"
          alt="Students collaborating in a library"
          className="h-[300px] w-full object-cover sm:h-[380px] md:h-[440px] lg:h-[420px] xl:h-[470px]"
        />

        {/* Image floating caption */}
        <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between rounded-full bg-[#f4f7fc] py-3 pl-4 pr-3 sm:bottom-6 sm:left-5 sm:right-5 sm:py-4 sm:pl-5">

          <p className="text-sm text-[#688282] sm:text-base md:text-lg">
            Meaningful partnerships. Shared ambition.
          </p>

          <a
            href="#"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#7654ff] text-2xl text-[#7654ff] transition duration-300 hover:bg-[#7654ff] hover:text-white sm:h-12 sm:w-12 sm:text-3xl"
          >
            ↗
          </a>

        </div>
      </div>

      {/* Right content */}
      <div className="flex flex-col justify-center">

        {/* Tabs */}
        <div className="mb-6 flex w-fit max-w-full flex-wrap items-center gap-1 rounded-full border border-[#dce6f7] bg-[#f5f8fc] p-1">

          <a
            href="#institutions"
            className="rounded-full bg-[#7953ed] px-3 py-2 text-xs font-medium text-white sm:px-4"
          >
            For Institutions
          </a>

          <a
            href="#students"
            className="rounded-full px-3 py-2 text-xs text-[#1c2c49] transition hover:bg-white sm:px-4"
          >
            For students
          </a>

          <a
            href="#partners"
            className="rounded-full px-3 py-2 text-xs text-[#1c2c49] transition hover:bg-white sm:px-4"
          >
            For education partners
          </a>

        </div>

        {/* Content heading */}
        <h3 className="text-2xl font-medium leading-[1.4] tracking-[-0.4px] text-[#1c2c49] md:text-3xl">
          Reach the right students.<br />
          Build meaningful connections.
        </h3>

        {/* Description */}
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#668080] md:text-base md:leading-7">
          Bring your institution closer to prospective learners through program
          discovery, student guidance, application technology, and academic
          pathways.
        </p>

        {/* Benefits list */}
        <div className="mt-5 space-y-4">

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-[#7953ed] md:text-xl">01</span>
            <p className="text-sm text-[#668080] md:text-base">
              Make your programs easier to discover
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-[#7953ed] md:text-xl">02</span>
            <p className="text-sm text-[#668080] md:text-base">
              Connect student interest with personal guidance
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-[#7953ed] md:text-xl">03</span>
            <p className="text-sm text-[#668080] md:text-base">
              Explore a focused or group-wide partnership
            </p>
          </div>

        </div>

        {/* Bottom link */}
        <a
          href="#"
          className="group mt-5 inline-flex w-fit items-center gap-2 border-b border-[#bdcbd1] pb-2 text-sm font-medium text-[#1c2c49] transition hover:border-[#7953ed] hover:text-[#7953ed] md:text-base"
        >
          Explore institution partnership
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>

      </div>
    </div>

  </div>
</section>







<section id="brands" className="relative w-full overflow-hidden bg-white">

  {/* Heading area */}
  <div className="relative overflow-hidden  bg-white px-6 py-10 md:px-12 lg:px-16">



    <div className="relative z-10 mx-auto w-full">
      <span className="mb-3 block h-[3px] w-8 rounded-full bg-[#4169ff]"></span>

      <h2 className="max-w-xl text-3xl font-medium leading-[1.35] tracking-[-0.6px] text-[#1c2c49] md:text-4xl">
        Five brands. A world<br className="hidden sm:block" />
        of opportunity.
      </h2>
    </div>
  </div>

  {/* Brand cards */}
  <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 lg:px-6">

    {/* IAIC */}
    <div className="group flex min-h-[240px] flex-col rounded-md border border-[#e5edf8] bg-white p-4 transition duration-300 hover:border-[#4169ff]/40 hover:shadow-sm">

      <div className="mb-5 flex h-9 items-center">
        <img
          src="/assets/IAIC.png"
          alt="IAIC"
          className="max-h-9 max-w-[130px] object-contain object-left"
        />
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#789092]">
        Student guidance
      </p>

      <h3 className="text-base font-semibold leading-[1.45] text-[#1c2c49] md:text-lg">
        Global opportunity.<br />
        Personal guidance.
      </h3>

      <div className="mt-auto flex items-center justify-between pt-5">
        <a href="#" className="text-xs font-medium text-[#4169ff] transition hover:text-[#1c2c49]">
          Explore IAIC
        </a>

        <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d9ff] text-[#7654ff] transition hover:bg-[#7654ff] hover:text-white">
          ↗
        </a>
      </div>
    </div>

    {/* UniSeek */}
    <div className="group flex min-h-[240px] flex-col rounded-md border border-[#e5edf8] bg-white p-4 transition duration-300 hover:border-[#4169ff]/40 hover:shadow-sm">

      <div className="mb-5 flex h-9 items-center">
        <img
          src="/assets/uniseek.png"
          alt="UniSeek"
          className="max-h-9 max-w-[150px] object-contain object-left"
        />
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#789092]">
        Education discovery
      </p>

      <h3 className="text-base font-semibold leading-[1.45] text-[#1c2c49] md:text-lg">
        Find the possibilities<br />
        that fit your future.
      </h3>

      <div className="mt-auto flex items-center justify-between pt-5">
        <a href="#" className="text-xs font-medium text-[#4169ff] transition hover:text-[#1c2c49]">
          Explore UniSeek
        </a>

        <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d9ff] text-[#7654ff] transition hover:bg-[#7654ff] hover:text-white">
          ↗
        </a>
      </div>
    </div>

    {/* StudyPick */}
    <div className="group flex min-h-[240px] flex-col rounded-md border border-[#e5edf8] bg-white p-4 transition duration-300 hover:border-[#4169ff]/40 hover:shadow-sm">

      <div className="mb-5 flex h-9 items-center">
        <img
          src="/assets/studypick.png"
          alt="StudyPick"
          className="max-h-9 max-w-[150px] object-contain object-left"
        />
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#789092]">
        Education marketplace
      </p>

      <h3 className="text-base font-semibold leading-[1.45] text-[#1c2c49] md:text-lg">
        Better connections.<br />
        Shared opportunity.
      </h3>

      <div className="mt-auto flex items-center justify-between pt-5">
        <a href="#" className="text-xs font-medium text-[#4169ff] transition hover:text-[#1c2c49]">
          Explore StudyPick
        </a>

        <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d9ff] text-[#7654ff] transition hover:bg-[#7654ff] hover:text-white">
          ↗
        </a>
      </div>
    </div>

    {/* Admission Portal */}
    <div className="group flex min-h-[240px] flex-col rounded-md border border-[#e5edf8] bg-white p-4 transition duration-300 hover:border-[#4169ff]/40 hover:shadow-sm">

      <div className="mb-5 flex h-9 items-center">
        <img
          src="/assets/admissionPortal.png"
          alt="Admission Portal"
          className="max-h-9 max-w-[170px] object-contain object-left"
        />
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#789092]">
        Application technology
      </p>

      <h3 className="text-base font-semibold leading-[1.45] text-[#1c2c49] md:text-lg">
        A clearer path from<br />
        interest to application.
      </h3>

      <div className="mt-auto flex items-center justify-between pt-5">
        <a href="#" className="text-xs font-medium text-[#4169ff] transition hover:text-[#1c2c49]">
          Explore AdmissionPortal
        </a>

        <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d9ff] text-[#7654ff] transition hover:bg-[#7654ff] hover:text-white">
          ↗
        </a>
      </div>
    </div>

    {/* University Road */}
    <div className="group flex min-h-[240px] flex-col rounded-md border border-[#e5edf8] bg-white p-4 transition duration-300 hover:border-[#4169ff]/40 hover:shadow-sm">

      <div className="mb-5 flex h-9 items-center">
        <img
          src="/assets/universityRoad.png"
          alt="University Road"
          className="max-h-9 max-w-[150px] object-contain object-left"
        />
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#789092]">
        Academic pathways
      </p>

      <h3 className="text-base font-semibold leading-[1.45] text-[#1c2c49] md:text-lg">
        Open a new route to<br />
        international education.
      </h3>

      <div className="mt-auto flex items-center justify-between pt-5">
        <a href="#" className="text-xs font-medium text-[#4169ff] transition hover:text-[#1c2c49]">
          Explore University Road
        </a>

        <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9d9ff] text-[#7654ff] transition hover:bg-[#7654ff] hover:text-white">
          ↗
        </a>
      </div>
    </div>

  </div>
</section>




<section id="solutions" className="w-full bg-white py-8 md:py-10">

  {/* Main journey section */}
  <div className="w-full bg-[#eaf0fb] px-5 py-8 sm:px-8 md:px-12 lg:px-[5.8%] lg:py-10">

    {/* Top content */}
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

      {/* Left text */}
      <div className="flex flex-col justify-center">

        <h2 className="text-3xl font-medium leading-[1.45] tracking-[-0.5px] text-[#1c2c49] md:text-4xl lg:text-[32px]">
          From a first idea to your<br className="hidden lg:block" />
          next chapter.
        </h2>

        <p className="mt-4 max-w-[500px] text-sm leading-6 text-[#648080]">
          Every journey is different. Our brands offer distinct starting points, so
          students and partners can find the support that matches their goals.
        </p>

        {/* Link */}
        <a
          href="#"
          className="group mt-4 inline-flex w-fit items-center gap-2 border-b border-[#a9bdc5] pb-2 text-sm font-medium text-[#1c2c49] transition hover:text-blue-600"
        >
          Find your starting point
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>

      </div>

      {/* Right image */}
      <div className="w-full overflow-hidden rounded-md">

        <img
          src="/assets/laptopOnTable.jpg"
          alt="A laptop and workspace representing the education journey"
          className="h-[200px] w-full object-cover sm:h-[240px] md:h-[190px] lg:h-[210px] xl:h-[240px]"
        />

      </div>

    </div>

    {/* Timeline section */}
    <div className="relative mt-10 md:mt-12">

      {/* Horizontal timeline line */}
      <div className="absolute left-0 right-0 top-[4px] hidden h-[1.5px] bg-[#ff806b] md:block"></div>

      {/* Timeline grid */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-4 md:gap-6">

        {/* Step 1 */}
        <div className="relative md:pt-7">

          {/* Dot */}
          <span className="absolute left-0 top-0 hidden h-[8px] w-[8px] rounded-full bg-[#ff806b] md:block"></span>

          <p className="text-[11px] font-medium text-[#587777]">
            01 | DISCOVER
          </p>

          <h3 className="mt-2 text-lg font-medium text-[#1c2c49] lg:text-xl">
            Explore what's next.
          </h3>

          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#668080]">
            Find and compare education options through Uniseek
          </p>

        </div>

        {/* Step 2 */}
        <div className="relative md:pt-7">

          <span className="absolute left-0 top-0 hidden h-[8px] w-[8px] rounded-full bg-[#ff806b] md:block"></span>

          <p className="text-[11px] font-medium text-[#587777]">
            02 | CONNECT
          </p>

          <h3 className="mt-2 text-lg font-medium text-[#1c2c49] lg:text-xl">
            Get a clearer view
          </h3>

          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#668080]">
            Discuss your study goals and next steps with IAIC.
          </p>

        </div>

        {/* Step 3 */}
        <div className="relative md:pt-7">

          <span className="absolute left-0 top-0 hidden h-[8px] w-[8px] rounded-full bg-[#ff806b] md:block"></span>

          <p className="text-[11px] font-medium text-[#587777]">
            03 | APPLY
          </p>

          <h3 className="mt-2 text-lg font-medium text-[#1c2c49] lg:text-xl">
            Move with purpose
          </h3>

          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#668080]">
            Explore the application journey with AdmissionPortal
          </p>

        </div>

        {/* Step 4 */}
        <div className="relative md:pt-7">

          <span className="absolute left-0 top-0 hidden h-[8px] w-[8px] rounded-full bg-[#ff806b] md:block"></span>

          <p className="text-[11px] font-medium text-[#587777]">
            04 | PROGRESS
          </p>

          <h3 className="mt-2 text-lg font-medium text-[#1c2c49] lg:text-xl">
            Open a new route
          </h3>

          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#668080]">
            Discover academic pathways through University Road.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>


<section className="relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">
{/* Background circle */}
<div
  className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#f1f5fc]"
></div>
  <div className="relative z-10 mx-auto w-full px-5 md:px-10 lg:px-[6%]">

    {/* Section heading */}
    <div className="mb-8 md:mb-10">
      <span className="mb-3 block h-[3px] w-8 rounded-full bg-[#4169ff]"></span>

      <h2 className="text-3xl font-medium leading-tight tracking-[-0.5px] text-[#1c2c49] md:text-4xl lg:text-[40px]">
        A boarder perspective.
      </h2>
    </div>

    {/* Main cards grid */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">

      {/* LEFT FEATURED CARD */}
      <article className="group flex flex-col overflow-hidden rounded-md border border-[#dbe6f7] bg-white transition duration-300 hover:shadow-sm">

        {/* Featured image */}
        <div className="overflow-hidden">
          <img
            src="/assets/groupTalk.jpg"
            alt="Students collaborating and sharing ideas"
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[300px] lg:h-[280px] xl:h-[330px]"
          />
        </div>

        {/* Featured card content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">

          <p className="text-sm font-medium uppercase tracking-wide text-[#668282]">
            Student guide
          </p>

          <h3 className="mt-4 text-2xl font-medium leading-[1.45] tracking-[-0.4px] text-[#1c2c49] sm:text-3xl lg:text-[28px] xl:text-[30px]">
            Your next chapter starts with<br className="hidden xl:block" />
            the right questions.
          </h3>

          {/* Card bottom */}
          <div className="mt-auto flex items-center justify-between pt-8">

            <span className="text-sm font-medium text-[#668282] sm:text-base">
              4 Min Read
            </span>

            <a
              href="#"
              aria-label="Read student guide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7953ff] text-3xl text-[#7953ff] transition duration-300 hover:bg-[#7953ff] hover:text-white sm:h-12 sm:w-12"
            >
              ↗
            </a>

          </div>
        </div>

      </article>


      {/* RIGHT SIDE CARDS */}
      <div className="grid grid-cols-1 gap-6">

        {/* CARD 1: Institution perspective */}
        <article className="group grid min-h-[220px] grid-cols-1 overflow-hidden rounded-md border border-[#dbe6f7] bg-white transition duration-300 hover:shadow-sm sm:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden">
            <img
              src="/assets/Classroom.jpg"
              alt="Teacher and students in a classroom"
              className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col p-4 sm:p-5">

            <p className="text-xs font-medium uppercase tracking-wide text-[#668282]">
              Institution perspective
            </p>

            <h3 className="mt-3 text-lg font-medium leading-[1.55] text-[#1c2c49] sm:text-xl">
              A stronger student journey starts with connection.
            </h3>

            {/* Bottom */}
            <div className="mt-auto flex items-center justify-between pt-5">

              <span className="text-xs font-medium text-[#668282] sm:text-sm">
                4 Min Read
              </span>

              <a
                href="#"
                aria-label="Read institution perspective"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7953ff] text-2xl text-[#7953ff] transition duration-300 hover:bg-[#7953ff] hover:text-white"
              >
                ↗
              </a>

            </div>
          </div>

        </article>


        {/* CARD 2: IEG approach */}
        <article className="group grid min-h-[220px] grid-cols-1 overflow-hidden rounded-md border border-[#dbe6f7] bg-white transition duration-300 hover:shadow-sm sm:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden">
            <img
              src="/assets/library.jpg"
              alt="Bookshelves representing education and academic pathways"
              className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col p-4 sm:p-5">

            <p className="text-xs font-medium uppercase tracking-wide text-[#668282]">
              The IEG approach
            </p>

            <h3 className="mt-3 text-lg font-medium leading-[1.55] text-[#1c2c49] sm:text-xl">
              Five specialist brands. One shared purpose.
            </h3>

            {/* Bottom */}
            <div className="mt-auto flex items-center justify-between pt-5">

              <span className="text-xs font-medium text-[#668282] sm:text-sm">
                3 Min Read
              </span>

              <a
                href="#"
                aria-label="Read the IEG approach"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7953ff] text-2xl text-[#7953ff] transition duration-300 hover:bg-[#7953ff] hover:text-white"
              >
                ↗
              </a>

            </div>
          </div>

        </article>

      </div>

    </div>

  </div>

</section>



<section className="relative w-full overflow-hidden bg-white py-12 md:py-16">

  {/* Background decorative circle */}
  
  
  {/* Main CTA container */}
  <div className="relative z-10 mx-auto w-full px-5 md:px-10 lg:px-[6%]">

    <div className="relative overflow-hidden rounded-md bg-[#192944] px-6 py-10 sm:px-8 md:px-12 md:py-12 lg:px-16 lg:py-14">

      {/* Decorative rings on right */}
      <div className="pointer-events-none absolute -right-28 -top-40 h-[420px] w-[420px] rounded-full border-[55px] border-[#243550]"></div>

      <div className="pointer-events-none absolute -right-20 -top-32 h-[340px] w-[340px] rounded-full border-[45px] border-[#31415d]"></div>

      <div className="pointer-events-none absolute -right-10 -top-24 h-[260px] w-[260px] rounded-full border-[40px] border-[#bfc9d8]"></div>

      <div className="pointer-events-none absolute -right-2 -top-16 h-[180px] w-[180px] rounded-full bg-[#192944]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">

        {/* Heading */}
        <h2 className="text-3xl font-medium leading-tight tracking-[-0.5px] text-white sm:text-4xl md:text-[40px] lg:text-[44px]">
          Let’s move education forward.
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#d0d9e5] sm:text-base sm:leading-7">
          Whether you're finding your path or helping others find theirs, there's a place
          for you in our education ecosystem.
        </p>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">

          {/* Primary button */}
          <a
            href="/lets_connect_page#ieg-contact-form"
            className="inline-flex items-center gap-2 rounded-full bg-[#f3f6fc] px-5 py-3 text-sm font-medium text-[#1c2c49] transition duration-300 hover:bg-[#b1abcc]"
          >
            Partner with IEG
            <span className="text-base">↗</span>
          </a>

          {/* Secondary link */}
          <a
            href="/lets_connect_page#ieg-contact-form"
            className="group inline-flex items-center gap-2 border-b border-[#7654ff] pb-2 text-sm font-medium text-white transition hover:text-[#b9adff]"
          >
            Speak with our team
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

        </div>

      </div>

    </div>

  </div>

</section>

        </main>

    </div>

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
        <a href="#" className="mb-5 inline-flex items-center">
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


    </>
  );
}


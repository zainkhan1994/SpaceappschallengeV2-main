import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { contactDetails } from '../../data/contactData';

export const ContactSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="Contact hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Contact
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Get in touch
          <br />
          <span className="text-[#2E96F5]">with Houston</span>
        </h1>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(64px,8vw,110px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,4vw,40px)]">
          <ScrollReveal>
            <div className="border border-white/14 rounded-2xl p-[clamp(26px,4vw,40px)] bg-white/[0.03] h-full">
              <h2 className="m-0 mb-6 font-['Overpass',sans-serif] font-black text-[clamp(22px,2.8vw,32px)] uppercase text-white">
                Reach us
              </h2>
              <dl className="m-0 grid gap-[1.375rem]">
                <div>
                  <dt className="text-[12px] font-semibold tracking-widest uppercase text-white/55">
                    Main contact · Local Lead
                  </dt>
                  <dd className="m-0 mt-1.5 text-[18px] leading-snug text-white">
                    {contactDetails.localLead.name}
                    <br />
                    <a href={`mailto:${contactDetails.localLead.email}`} className="text-[#2E96F5] hover:text-[#EAFE07]">
                      {contactDetails.localLead.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-semibold tracking-widest uppercase text-white/55">
                    Registration &amp; website issues
                  </dt>
                  <dd className="m-0 mt-1.5 text-[18px] leading-snug text-white">
                    Handled by the global team
                    <br />
                    <a href={`mailto:${contactDetails.globalEmail}`} className="text-[#2E96F5] hover:text-[#EAFE07]">
                      {contactDetails.globalEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-semibold tracking-widest uppercase text-white/55">
                    Follow along
                  </dt>
                  <dd className="m-0 mt-2.5 flex flex-wrap gap-2.5">
                    <a
                      href={contactDetails.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/24 rounded-full px-5 py-2.5 text-[16px] font-semibold text-white hover:border-[#EAFE07] hover:text-[#EAFE07]"
                    >
                      Instagram
                    </a>
                    <a
                      href={contactDetails.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/24 rounded-full px-5 py-2.5 text-[16px] font-semibold text-white hover:border-[#EAFE07] hover:text-[#EAFE07]"
                    >
                      Facebook
                    </a>
                    <span className="border border-dashed border-white/24 rounded-full px-5 py-2.5 text-[16px] font-semibold text-white/50">
                      Discord — coming soon
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-[rgba(46,150,245,0.4)] rounded-2xl p-[clamp(26px,4vw,40px)] bg-gradient-to-br from-[rgba(46,150,245,0.14)] to-[rgba(7,23,63,0.5)] self-start">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-4">
                One-on-one
              </div>
              <h2 className="m-0 mb-4 font-['Overpass',sans-serif] font-black text-[clamp(22px,2.8vw,32px)] uppercase text-white">
                Book time with the Local Lead
              </h2>
              <p className="m-0 text-[18px] leading-relaxed text-white/85">
                Best for questions about registration, team formation, mentoring, or bringing a group of students.
              </p>
              <a
                href={contactDetails.localLead.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[1.375rem] inline-block px-[1.875rem] py-4 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[18px] hover:bg-[#5FB4FF]"
              >
                Book an appointment
              </a>
              <p className="mt-[1.375rem] m-0 text-[15px] text-white/60">
                Space Apps Houston is organized by volunteers. We are not NASA employees and cannot answer questions about NASA programs generally.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;

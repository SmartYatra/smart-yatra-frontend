import { FOOTER_CONTACTS, FOOTER_INFOS } from '@/constants/footer';

import ContactLink from './ContactLink';
import FooterInput from './FooterInput';
import FooterSection from './FooterSection';

const Footer = ({ contacts = FOOTER_CONTACTS, infos = FOOTER_INFOS }) => (
  <footer className="relative border-t border-border bg-foreground/90 text-background" id="contact">
    {/* <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80%] w-[80vw] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-foreground/70 to-transparent blur-3xl dark:from-foreground/5" /> */}

    <div className="max-container z-10 flex flex-col justify-between">
      <div className="mb-8 flex flex-col-reverse items-start gap-6 pt-12 lg:flex-row 2xl:gap-10">
        <div className="grid w-full grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:gap-2 md:basis-[60%] md:max-lg:grid-cols-3 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {infos.map((section, i) => (
            <FooterSection key={i} links={section.links} title={section.title} />
          ))}
        </div>

        <div className="flex w-full flex-col gap-8 md:basis-[40%]">
          <div className="w-full">
            <h1 className="mb-4 flex flex-col gap-3 text-4xl font-light md:text-5xl">
              <p>Subscribe to</p>
              <p>our newsletter</p>
            </h1>
            <FooterInput />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="mb-2 w-fit border-b border-border/20 pb-2 pr-4 text-lg font-semibold md:text-xl">
              Contacts
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              {contacts.map((contact) => (
                <ContactLink
                  key={contact.title}
                  Icon={contact.icon}
                  link={contact.link}
                  title={contact.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-t-border/10 py-4 text-center text-xs max-sm:flex-col max-sm:gap-2">
        <p>Copyright &copy; 2024 Smart Yatra. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

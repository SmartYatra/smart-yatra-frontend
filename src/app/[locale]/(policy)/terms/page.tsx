interface ITermsSection {
  title: string;
  content: string | string[];
}

interface ITermsOfService {
  title: string;
  intro: string;
  sections: ITermsSection[];
  lastUpdated: string;
}

export default function TermsOfService() {
  const TERMS_OF_SERVICE: ITermsOfService = {
    title: 'Terms of Service',
    intro: `Welcome to SmartYatra. By using our platform, you agree to the following terms and conditions.`,
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: `By accessing and using SmartYatra, you acknowledge that you have read, understood, and agree to these Terms of Service. If you do not agree, please refrain from using our services.`,
      },
      {
        title: '2. Use of Services',
        content: [
          'You must use SmartYatra in compliance with applicable laws and regulations.',
          'You must not misuse the platform for any unauthorized or illegal purposes.',
        ],
      },
      {
        title: '3. Intellectual Property Rights',
        content: `All materials, content, and services provided by SmartYatra are the property of SmartYatra or its affiliates and are protected under applicable copyright, trademark, and intellectual property laws.`,
      },
      {
        title: '4. Account Responsibilities',
        content: [
          'You are responsible for maintaining the confidentiality of your login credentials.',
          'You must ensure that the information provided in your account is accurate and up-to-date.',
          'SmartYatra reserves the right to suspend or terminate accounts that violate these terms.',
        ],
      },
      {
        title: '5. Limitation of Liability',
        content: `SmartYatra shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use our services.`,
      },
      {
        title: '6. Modifications to Terms',
        content: `SmartYatra reserves the right to update these Terms of Service at any time. We will notify you of any significant changes via email or by posting a notice on our platform.`,
      },
      {
        title: '7. Governing Law',
        content: `These terms are governed by the laws of Nepal, and any disputes arising will be resolved under the jurisdiction of Nepalese courts.`,
      },
      {
        title: '8. Contact Information',
        content: `For questions or concerns regarding these Terms of Service, please contact us at support@smartyatra.com.`,
      },
    ],
    lastUpdated: 'January 11, 2025',
  };

  return (
    <>
      <h1 className='mb-8 text-4xl font-bold text-secondary-foreground'>
        {TERMS_OF_SERVICE.title}
      </h1>

      <div className='space-y-8'>
        <p className='text-secondary-foreground'>{TERMS_OF_SERVICE.intro}</p>

        {TERMS_OF_SERVICE.sections.map(
          (section: ITermsSection, index: number) => (
            <section key={index}>
              <h2 className='mb-4 text-xl font-semibold text-secondary-foreground'>
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className='ml-8 list-disc space-y-2 text-muted-foreground'>
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className='text-muted-foreground'>{section.content}</p>
              )}
            </section>
          )
        )}

        <div className='mt-8 rounded-lg bg-muted px-4 py-6'>
          <p className='text-sm text-muted-foreground'>
            Last updated: {TERMS_OF_SERVICE.lastUpdated}
          </p>
        </div>
      </div>
    </>
  );
}

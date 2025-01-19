import { Fragment } from 'react';

interface IPrivacySection {
  title: string;
  content: string | string[] | IPrivacySection[];
}

interface IPrivacyPolicy {
  title: string;
  intro: string;
  sections: IPrivacySection[];
  lastUpdated: string;
}

export default function PrivacyPolicy() {
  const PRIVACY_POLICY: IPrivacyPolicy = {
    title: 'Privacy Policy',
    intro: `At SmartYatra, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information as you use our public transport digitization services.`,
    sections: [
      {
        title: '1. Information We Collect',
        content: [
          {
            title: '1.1 Information you provide to us:',
            content: [
              'Account details, including name, email, and contact number.',
              'Payment information for transactions.',
              'Feedback and support requests you submit through the platform.',
            ],
          },
          {
            title: '1.2 Information automatically collected:',
            content: [
              'Location data from QR code scans.',
              'Device and browser details.',
              'Activity logs, such as bus entry and exit data.',
            ],
          },
        ],
      },
      {
        title: '2. How We Use Your Information',
        content: [
          'Facilitating public transport services, such as tracking trips and payments.',
          'Providing real-time updates and notifications.',
          'Improving user experience through analytics and feedback.',
          'Ensuring secure and reliable service operations.',
        ],
      },
      {
        title: '3. Data Protection',
        content:
          'We implement robust security measures to safeguard your personal data against unauthorized access, loss, or misuse.',
      },
      {
        title: '4. Cookies and Tracking',
        content:
          'We use cookies to enhance your experience on SmartYatra. You can manage your cookie preferences in your browser settings.',
      },
      {
        title: '5. Third-Party Services',
        content:
          'We collaborate with trusted third-party providers for payment processing, analytics, and other services essential to SmartYatra’s functionality.',
      },
      {
        title: '6. Your Rights',
        content: [
          'Access and review your personal data.',
          'Request corrections or deletions.',
          'Opt-out of specific data processing activities.',
          'Contact us for data portability requests.',
        ],
      },
      {
        title: '7. Changes to This Policy',
        content:
          'This Privacy Policy may be updated periodically. Significant changes will be communicated to you via email or through prominent notices on our platform.',
      },
      {
        title: '8. Contact Us',
        content: `For any questions or concerns regarding this Privacy Policy, please reach out to us at privacy@smartyatra.com.`,
      },
    ],
    lastUpdated: 'January 11, 2025',
  };

  const renderContent = (content: string | string[] | IPrivacySection[]) => {
    if (typeof content === 'string') {
      return <p className='text-muted-foreground'>{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className='ml-8 list-disc space-y-2 text-muted-foreground'>
          {content.map((item, idx) => (
            <Fragment key={idx}>
              {typeof item === 'string' ? (
                <li>{item}</li>
              ) : (
                <li>
                  <h3 className='font-semibold text-secondary-foreground'>
                    {item.title}
                  </h3>
                  {renderContent(item.content)}
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <>
      <h1 className='mb-8 text-4xl font-bold text-secondary-foreground'>
        {PRIVACY_POLICY.title}
      </h1>

      <div className='space-y-8'>
        <p className='text-secondary-foreground'>{PRIVACY_POLICY.intro}</p>

        {PRIVACY_POLICY.sections.map((section, index) => (
          <section key={index}>
            <h2 className='mb-4 text-xl font-semibold text-secondary-foreground'>
              {section.title}
            </h2>
            {renderContent(section.content)}
          </section>
        ))}

        <div className='mt-8 rounded-lg bg-muted px-4 py-6'>
          <p className='text-sm text-muted-foreground'>
            Last updated: {PRIVACY_POLICY.lastUpdated}
          </p>
        </div>
      </div>
    </>
  );
}

'use client';

import { Star } from 'lucide-react';

import BackgroundGlow from '@/components/background-glow';
import {
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
} from '@/components/page-wrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Testimonial = {
  name: string;
  title: string;
  image: string;
  testimonial: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    title: 'Frontend Developer',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    testimonial:
      'This product is amazing! It helped me boost my productivity and easily integrate reusable components into my projects.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    title: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    testimonial:
      'Incredible support and fantastic documentation. The tools provided have been a game-changer for our development team.',
    rating: 5,
  },
  {
    name: 'Sarah Lee',
    title: 'UX/UI Designer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    testimonial:
      'The design and functionality of this product are top-notch. It’s intuitive and easy to use, making my workflow much smoother.',
    rating: 4,
  },
  {
    name: 'Chris Brown',
    title: 'Backend Engineer',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    testimonial:
      'I’ve integrated this product into several of our projects. The flexibility and scalability are exactly what we needed.',
    rating: 5,
  },
  {
    name: 'Alex Johnson',
    title: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    testimonial:
      'I recommend this product to anyone looking to speed up their development process and create high-quality applications.',
    rating: 5,
  },
  {
    name: 'Emily Wilson',
    title: 'Tech Lead',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    testimonial:
      'Our team has been using this product for months now, and it has significantly improved our workflow and collaboration.',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    title: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    testimonial:
      'The features and performance of this product are unmatched. It has become an essential part of our development stack.',
    rating: 5,
  },
  {
    name: 'Laura Davis',
    title: 'DevOps Engineer',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    testimonial:
      'I’ve used many similar products in the past, but this one stands out. The quality and ease of use are exceptional.',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <SectionWrapper id='testimonials'>
      <SectionSubtitle>Testimonials</SectionSubtitle>
      <SectionTitle>What Our Users Are Saying</SectionTitle>
      <SectionDescription>See what our users have to say</SectionDescription>

      <BackgroundGlow className='bottom-auto left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-[40%] bg-gradient-to-bl from-tertiary/30 to-transparent' />

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {testimonials.map(testimonial => (
          <Card className='flex flex-col' key={testimonial.name}>
            <CardHeader className='flex-row items-start gap-4'>
              <Avatar className='size-12 border-2 border-primary'>
                <AvatarImage alt={testimonial.name} src={testimonial.image} />
              </Avatar>

              <div className='flex flex-col'>
                <CardTitle className='text-xl font-semibold'>
                  {testimonial.name}
                </CardTitle>
                <CardDescription className='text-xs font-medium text-muted-foreground'>
                  {testimonial.title}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <blockquote className='text-sm italic text-muted-foreground'>
                {testimonial.testimonial}
              </blockquote>
            </CardContent>

            <CardFooter>
              <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn('size-4', {
                      'fill-yellow-500 text-yellow-500':
                        index < testimonial.rating,
                      'fill-muted-foreground/30 text-muted-foreground/20':
                        index >= testimonial.rating,
                    })}
                  />
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

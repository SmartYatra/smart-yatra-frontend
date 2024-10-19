import { Footer, Header } from '@/components/layout';

const Home = () => (
  <div className="flex min-h-screen w-full flex-col">
    <Header />
    <main className="flex-1">
      <div className="max-container mt-5 flex items-center justify-between">
        Home Page
      </div>
    </main>
    <Footer />
  </div>
);

export default Home;

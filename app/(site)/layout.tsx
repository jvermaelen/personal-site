import { Footer } from '@/components/ui/Footer';
import { Nav } from '@/components/ui/Nav';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

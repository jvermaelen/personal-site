import Image from 'next/image';
import Link from 'next/link';

export function Personal() {
  return (
    <section className="about-section" id="personal">
      <div className="container">
        <div className="section-head">
          <h2>§ Off the clock</h2>
          <span className="rule" />
          <span className="meta">the part that doesn&apos;t go on the resume</span>
        </div>

        <div className="personal">
          <div>
            <h3>Brazilian Jiu-Jitsu, 20 years in.</h3>
            {/* BJJ paragraph - verbatim from PRD §15 res 8. Bolded keywords match the design. */}
            <p>
              I started training Brazilian Jiu-Jitsu in 2006 and earned my{' '}
              <strong>black belt in 2020</strong>. I train at <strong>Paragon BJJ</strong> in
              Austin. I love it because it keeps me in great physical shape, keeps me mentally
              sharp, is genuinely fun, and is easy to keep doing for decades. It&apos;s also been an
              amazing social outlet - I&apos;ve met hundreds of people and made friends from all
              walks of life around the world through jiu-jitsu. It&apos;s shaped me into the person
              I am today.
            </p>

            <h3>Music is the other hobby.</h3>
            <p>
              I am a deeply nerdy listener - discovering and cataloguing new music is something
              I&apos;ve done since I was a teenager. There&apos;s a live feed of what I&apos;ve been
              playing on the{' '}
              <Link href="/now" style={{ color: 'var(--accent)' }}>
                /now page
              </Link>{' '}
              if you want to argue with my taste.
            </p>

            <h3>And I keep showing up for the boring parts.</h3>
            <p>
              I&apos;m halfway through an <strong>MS in Data Analytics at WGU</strong>, mostly
              because there were two or three CS-shaped holes in my analyst toolkit I&apos;d rather
              close than route around. It&apos;s not glamorous; it&apos;s how I keep the underlying
              machine sharp.
            </p>
          </div>

          <div className="personal-side" aria-hidden="true">
            <div className="personal-photo">
              <Image src="/headshot.png" alt="Jason Vermaelen" width={600} height={600} />
            </div>
            <div className="caption">
              <span className="k">Austin, TX</span>
              <span>May 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

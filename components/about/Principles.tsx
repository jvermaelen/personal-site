const PRINCIPLES = [
  {
    num: '/ 01',
    title: 'Numbers before adjectives.',
    body: '"Returned ~1,500 hours per year" reads differently from "dramatically improved efficiency." If the metric isn\'t there, the decision wasn\'t real. I write - and ship - with that filter on.',
  },
  {
    num: '/ 02',
    title: 'The right decision > more features.',
    body: "The hardest work I've done in product strategy was saying no, and being able to show the math for why. I'd rather ship one thing whose impact I can defend in a quarterly review than three things I can't.",
  },
  {
    num: '/ 03',
    title: 'Honest about tradeoffs.',
    body: "Every project I write up has a \"what I'd do differently\" section. Not as a performance of humility - as the part hiring managers actually grade. If you find an analyst who can't name the tradeoff they made, they didn't make one.",
  },
] as const;

export function Principles() {
  return (
    <section className="about-section" id="how">
      <div className="container">
        <div className="section-head">
          <h2>§ How I work</h2>
          <span className="rule" />
          <span className="meta">three principles, picked the hard way</span>
        </div>

        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="principle">
              <div className="num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

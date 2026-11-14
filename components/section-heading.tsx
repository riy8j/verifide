export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
}: {
  index: string
  eyebrow: string
  title: string
  description: string
  id: string
}) {
  return (
    <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_1.4fr] md:gap-12">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-signal">{index}</span> / {eyebrow}
        </p>
        <h2 id={id} className="mt-3 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      <p className="text-pretty font-serif text-lg leading-relaxed text-muted-foreground md:pt-7">{description}</p>
    </div>
  )
}

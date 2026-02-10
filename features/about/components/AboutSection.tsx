import "@/features/home/css/style.css"

export default function AboutSection() {
    return (
        <>
            <section className="about">
                <div className="container">
                    <h2>About Me</h2>
                    <p>
                        I&apos;m Kim, a developer and multimedia creator. I build interactive experiences by combining my
                        love for programming, music, and design.
                    </p>
                    <a href="/about" className="link">Read more →</a>
                </div>
            </section>
        </>
    );
}

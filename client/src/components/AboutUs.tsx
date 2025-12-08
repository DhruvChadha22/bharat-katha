
export const AboutUs: React.FC = () => {

    return (
        <section id="about" className="py-20 bg-[#ebe6e0]/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-primary-300 font-semibold text-sm uppercase tracking-widest">Our Mission</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30251d] mt-4 mb-6">
                        About Bharat Katha
                    </h2>
                    <p className="text-[#847062] text-lg">
                        A home for the stories of India.
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <p className="font-serif text-md md:text-lg text-black/70 max-w-2xl mx-auto leading-relaxed">
                        Bharat Katha was built with a simple belief that every voice deserves to be heard. Folk tales, family legends, divine stories, poems, thoughts and regional narratives all carry the soul of our land. They remind us of who we are and where we come from. <br />
                        We want to make storytelling effortless. Write your story, generate audio through AI and share it with the world. From the comfort of your home, you can reach listeners across cities, states and even beyond borders. No recording setup is needed. If you can imagine it and write it, you can bring it to life. <br />
                        Our mission is to preserve the beauty of Indian storytelling in the digital age. We want to celebrate languages, cultures and traditions while giving creators a platform to shine. Whether you are a writer, a listener or simply someone who loves stories, Bharat Katha welcomes you to be a part of this growing community. <br />
                    </p>
                    <img
                        src="india-map.png"
                        className="mr-8 max-lg:hidden"
                    />
                </div>

                <div className="mt-8 max-w-3xl mx-auto text-center">
                    <blockquote className="font-serif text-2xl text-[#30251d] italic leading-relaxed">
                        "In India, stories are not just told. They are lived, breathed, and passed on as sacred gifts from one generation to the next."
                    </blockquote>
                    <p className="mt-6 text-[#847062]">
                        — The Bharat Katha Philosophy
                    </p>
                </div>
            </div>
        </section>
    );
};

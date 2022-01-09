import ContentContainer from "../components/ContentContainer";
import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';
import Header from "../components/text/Header";
import React, { useContext, useEffect } from "react";
import { PostContext } from "../components/context/PostContext";
import Head from "next/head";
import AppHead from "../components/basic/AppHead";

const md = `
<img class="ml-2 mb-2" align="right" src="https://cms.caldwell.info/wp-content/uploads/2020/12/0.jpg">

I am interested in software, design, and great user experience.

Fun Facts:

- My first website was dan.wf (the .wf stands for the island of Wallis and Futuna).
- I made a fingerboard grip tape company when I was 16 called Creamy Goo.
- I used to trade Instagram accounts with large followings (and wrote a research paper on it, email me if you want to read it).
- When I was in high school I’d go to the grocery store and get a six pack of Kool-Aid Bursts for $1, then I’d walk into town and sell the Kool-Aids at $1 each (one of my most profitable business excursions).
- I briefly had a side business of buying broken Macbooks on eBay and would repair and resell them. Most of the time, many people will sell a broken Macbook even if just the hard drive is dead. Simply replace the hard drive and resell for profit!
- My favorite book ever is Behave by Robert Sapolsky.
- LinkedIn: <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/~dan/'>~dan</a>
`;

const html = marked(md);

const About = () => {
    const { setCurrentPost } = useContext(PostContext);

    useEffect(() => {
        setCurrentPost('about');
        return () => setCurrentPost(null);
    }, [setCurrentPost]);


    return (
        <ContentContainer className="w-container">
            <AppHead title="About" />
            <Header title="About" />
            <div className="overflow-y-scroll">
                {ReactHtmlParser(html)}
            </div>
        </ContentContainer>
    )
}

export default About;
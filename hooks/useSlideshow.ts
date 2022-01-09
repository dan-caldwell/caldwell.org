//import { useContext } from "react";
//import { PostContext } from "../components/context/PostContext";

const useSlideshow = () => {
    //const { currentSlide, numSlides } = useContext(PostContext);

    const getNumSlides = () => Array.from(document.querySelectorAll('[data-slide]')).length;

    const nextSlide = () => {
        // const newCurrentSlide = currentSlide.get + 1;
        // currentSlide.set(newCurrentSlide > numSlides.get ? 1 : newCurrentSlide);
    }

    return {
        nextSlide,
        getNumSlides
    }
}

export default useSlideshow;
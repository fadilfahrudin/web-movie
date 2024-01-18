import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
const SearchComponent = ({ onSubmit, search }: { onSubmit: SubmitHandler, search: string }) => {
    const element = useRef(null)
    useGSAP(() => {
        if (search == "") {
            gsap.fromTo(element.current, { y: 300, duration: 2, opacity: 0, ease: "back.in" }, { y: 250, duration: 2, opacity: 1, ease: "bounce" })
        } else {
            gsap.to(element.current, { y: 30, duration: 1.5, ease: "back.out" })
        }
    }, { dependencies: [search], revertOnUpdate: false })
    return (
        <form ref={element} onSubmit={(onSubmit)} className="search-form"  >
            <input type="text" placeholder="Search..." />
            <button type="submit" className="btn-search">Search</button>
        </form >
    )
}

export default SearchComponent
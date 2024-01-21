import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
const SearchComponent = ({ onSubmit, search }: { onSubmit: SubmitHandler, search: string }) => {
    const element = useRef(null)
    useGSAP(() => {
        if (search == "") {
            gsap.to('#search-label', { opacity: 1, y: 10, duration: 1.5, ease: "back.out" })
            gsap.fromTo(element.current, { y: 300, opacity: 0 }, { y: 200, duration: 2, opacity: 1, ease: "bounce" })
        } else {
            gsap.to(element.current, { y: -40, duration: 1.5, ease: "back.out" })
            gsap.to('#search-label', { opacity: 0, y: -40, duration: 1.5, ease: "back.out" })
        }
    }, { dependencies: [search], revertOnUpdate: false })
    return (
        <form ref={element} onSubmit={(onSubmit)} className="search-form"  >
            <label htmlFor="search" id="search-label">Find something here </label>
            <div className="form-input">
                <input id="search" type="text" placeholder="Search..." />
                <button type="submit" className="btn-search">Search</button>
            </div>
        </form >
    )
}

export default SearchComponent
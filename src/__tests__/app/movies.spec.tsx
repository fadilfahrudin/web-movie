import MoviesPage from "@/app/movies/page"
import { render } from "@testing-library/react"
import ReduxProvider from "@/components/ReduxProvider";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname() {
        return {
            prefetch: () => null
        };
    }
}));
describe("Series", () => {
    it("should render", () => {
        const page = render(
            <ReduxProvider>
                <MoviesPage />
            </ReduxProvider>
        );
        expect(page).toMatchSnapshot();
    })
})


